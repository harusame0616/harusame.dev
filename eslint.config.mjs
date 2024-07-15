import { FlatCompat } from "@eslint/eslintrc";
import eslint from "@eslint/js";
import typescriptParser from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier";
import eslintPluginAstro from "eslint-plugin-astro";
import importPlugin from "eslint-plugin-import";
import { default as jsxA11y, default as jsxa11y } from "eslint-plugin-jsx-a11y";
import playwright from "eslint-plugin-playwright";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactJsxRuntime from "eslint-plugin-react/configs/jsx-runtime.js";
import reactRecommended from "eslint-plugin-react/configs/recommended.js";
import tailwind from "eslint-plugin-tailwindcss";
import vitest from "eslint-plugin-vitest";
import neostandard from "neostandard";
import tseslint from "typescript-eslint";

const flat = new FlatCompat();

export default [
  {
    ignores: [
      "node_modules",
      "dist",
      "supabase/functions/**/*",
      "src/components/ui",
      "types/supabase.ts",
      "eslint.config.mjs",
    ],
  },
  {
    files: ["**/*.{ts,tsx,astro}"],
    plugins: {
      import: importPlugin,
    },
    rules: {
      ...importPlugin.configs.recommended.rules,
      ...importPlugin.configs.typescript.rules,
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "parent",
            "sibling",
            "index",
            "object",
            "type",
          ],
        },
      ],
    },
  },
  ...neostandard({ noStyle: true }),
  // typescript
  ...tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.strict,
    ...tseslint.configs.strictTypeChecked,
    {
      rules: {
        "@typescript-eslint/restrict-template-expressions": [
          "error",
          {
            allowNumber: true,
          },
        ],
      },
      settings: { "import/resolver": {
          typescript: {
            project: "./tsconfig.json",
          },
        },
      },
    },
  ),
  // react
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      react,
      "jsx-a11y": jsxA11y,
      "react-hooks": reactHooks,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...reactRecommended.rules,
      ...reactJsxRuntime.rules,
      ...reactHooks.recommended,
      ...jsxa11y.configs.recommended.rules,
    },
    languageOptions: {
      ...reactRecommended.languageOptions,
      ...reactJsxRuntime.languageOptions,
    },
  },
  // astro
  ...eslintPluginAstro.configs["flat/recommended"],
  ...eslintPluginAstro.configs["flat/jsx-a11y-recommended"],
  {
    files: ["**/*.astro"],
    // https://github.com/ota-meshi/eslint-plugin-astro/issues/341#issuecomment-2033375581
    rules: {
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
    },
  },
  // ts perser option
  {
    files: ["**/*.{ts,tsx,astro,mjs}"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  },
  // tailwind
  ...tailwind.configs["flat/recommended"],
  // playwright
  {
    files: ["e2e/**/*.test.{ts,tsx}"],
    ...playwright.configs["flat/recommended"],
  },
  // vitest
  {
    files: ["src/**/*.test.{ts,tsx}"],
    ...vitest.configs.recommended,
  },
  prettier,
];
