import path from "node:path";
import { fileURLToPath } from "node:url";
import prefetch from "@astrojs/prefetch";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

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
	site: "https://harusame.dev",
	vite: {
		resolve: {
			conditions: ["browser", "node"], // msw/node のインポートでエラーが出るため
			alias: {
				"@": path.resolve(path.dirname(fileURLToPath(import.meta.url)), "src"),
			},
		},
	},
});
