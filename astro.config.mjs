import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import path from "path";
import { fileURLToPath } from "url";
import react from "@astrojs/react";
import prefetch from "@astrojs/prefetch";

// eslint-disable-next-line import/no-extraneous-dependencies
import sitemap from "@astrojs/sitemap";

import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    react(),
    prefetch(),
    sitemap(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
  site: "https://tecparty.harusame.dev",
  vite: {
    resolve: {
      alias: {
        "@": path.resolve(path.dirname(fileURLToPath(import.meta.url)), "src"),
      },
    },
  },
});
