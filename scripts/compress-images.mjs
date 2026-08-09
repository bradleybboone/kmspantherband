#!/usr/bin/env node
// Compress public/images in place.
//
// next.config.ts sets images.unoptimized, so whatever sits in public/ is what
// visitors download byte-for-byte. There is no resize-on-request step to hide
// an oversized source file behind. Run this after adding photos.
//
// Idempotent: files already at or under the target dimensions and quality
// settle after one pass. Originals are recoverable via git.

import { readdir, stat, rename, unlink } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const IMAGES_DIR = path.join(process.cwd(), "public", "images");

// 1600px covers a full-bleed carousel on a 1440p display. Retina phones are
// well under this after the browser's own downscale.
const MAX_WIDTH = 1600;
const JPEG_QUALITY = 82;

const fmt = (bytes) => `${(bytes / 1024).toFixed(0)} KB`;

async function compress(file) {
  const full = path.join(IMAGES_DIR, file);
  const ext = path.extname(file).toLowerCase();
  const before = (await stat(full)).size;

  const image = sharp(full, { failOn: "none" });
  const meta = await image.metadata();

  let pipeline = image.rotate(); // bake in EXIF orientation before stripping it
  if (meta.width && meta.width > MAX_WIDTH) {
    pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }

  if (ext === ".png") {
    pipeline = pipeline.png({ compressionLevel: 9, palette: true });
  } else {
    pipeline = pipeline.jpeg({
      quality: JPEG_QUALITY,
      mozjpeg: true,
      progressive: true,
    });
  }

  // sharp cannot read and write the same path in one pass.
  const tmp = `${full}.tmp`;
  await pipeline.toFile(tmp);
  const after = (await stat(tmp)).size;

  if (after >= before) {
    await unlink(tmp);
    console.log(`  skip  ${file.padEnd(22)} ${fmt(before)} (already optimal)`);
    return { before, after: before };
  }

  await rename(tmp, full);
  const saved = (((before - after) / before) * 100).toFixed(0);
  console.log(
    `  ok    ${file.padEnd(22)} ${fmt(before)} -> ${fmt(after)}  (-${saved}%)`
  );
  return { before, after };
}

const entries = await readdir(IMAGES_DIR);
const targets = entries.filter((f) => /\.(jpe?g|png)$/i.test(f));

if (targets.length === 0) {
  console.log("No images found in public/images.");
  process.exit(0);
}

console.log(`Compressing ${targets.length} images (max ${MAX_WIDTH}px wide)\n`);

let totalBefore = 0;
let totalAfter = 0;
for (const file of targets.sort()) {
  const { before, after } = await compress(file);
  totalBefore += before;
  totalAfter += after;
}

const pct = (((totalBefore - totalAfter) / totalBefore) * 100).toFixed(0);
console.log(
  `\nTotal: ${fmt(totalBefore)} -> ${fmt(totalAfter)}  (-${pct}%)`
);
