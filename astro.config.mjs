import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import path from "path";
import { fileURLToPath } from "url";
import react from "@astrojs/react";

import prefetch from "@astrojs/prefetch";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react(), prefetch()],
  vite: {
    resolve: {
      alias: {
        "@": path.resolve(path.dirname(fileURLToPath(import.meta.url)), "src")
      }
    }
  }
});