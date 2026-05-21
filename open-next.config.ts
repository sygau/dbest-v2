import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// Pure-SSG site (no ISR). Serve prerendered HTML/JSON from Workers static assets.
// Without this, OpenNext's default "dummy" incremental cache returns null and
// fallback:false dynamic routes (e.g. /economics/2024) 404 in production.
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
