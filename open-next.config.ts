import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Default config. This site is fully static (18 prerendered routes, no API
// routes, no DB), so the R2 incremental cache / D1 tag cache / DO queue that
// a dynamic app needs are not load-bearing here.
export default defineCloudflareConfig({});
