import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve pre-compressed files straight from the Workers ASSETS binding.
    // On-the-fly optimization would run per-request inside the Worker and eat
    // the 10ms CPU budget on the free plan -- the same budget that forced
    // Hyperdrive onto studio/apps/beginner. Static assets cost no CPU and no
    // bandwidth, so the compression happens once, at source, instead.
    unoptimized: true,
  },
};

export default nextConfig;

// Lets `next dev` see Workers bindings, so local dev matches the deployed
// runtime instead of only matching Node.
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
