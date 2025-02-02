import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";

import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
	prefetch: true,
	integrations: [
		react(),
		sitemap(),
		partytown({
			config: {
				forward: ["dataLayer.push"],
			},
		}),
	],
	site: "https://harusame.dev",
	vite: {
		plugins: [tailwindcss()],
		resolve: {
			conditions: ["browser", "node"], // msw/node のインポートでエラーが出るため
			alias: {
				"@": path.resolve(path.dirname(fileURLToPath(import.meta.url)), "src"),
			},
		},
	},
});
