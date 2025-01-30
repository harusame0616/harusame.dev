import { defineConfig as defineViteConfig, mergeConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig as defineVitestConfig } from "vitest/config";

export default mergeConfig(
	defineViteConfig({
		plugins: [tsconfigPaths()],
	}),
	defineVitestConfig({
		test: {
			environment: "jsdom",
			env: {
				PUBLIC_SUPABASE_URL: "http://127.0.0.1:24321/",
				PUBLIC_SUPABASE_ANON_KEY:
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
			},
		},
	}),
);
