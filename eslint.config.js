import { FlatCompat } from "@eslint/eslintrc";
import { default as tsPlugin } from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier";
import jsxA11y from "eslint-plugin-jsx-a11y";
import playwright from "eslint-plugin-playwright";
import eslintPluginImport from "eslint-plugin-import";

const compat = new FlatCompat();

// TODO: ASTRO

export default [
  ...compat.config({
    extends: ["airbnb", "airbnb-typescript"],
  }),
  ...compat.extends(
    "plugin:eslint-plugin-tailwindcss/recommended",
    "plugin:eslint-plugin-vitest/recommended"
  ),
  playwright.configs["flat/recommended"],
  {
    files: ["**/*.js", "**/*.ts", "**/*.tsx"],
    plugins: {
      "@typescript-eslint": tsPlugin,
      "jsx-a11y": jsxA11y,
      import: eslintPluginImport,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json", // airbnb-typescript で指定が必要
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      "import/resolver": {
        typescript: {},
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "import/extensions": [
        "error",
        "ignorePackages",
        {
          js: "never",
          jsx: "never",
          ts: "never",
          tsx: "never",
        },
      ],
      "import/prefer-default-export": "off",
      "react/require-default-props": "off",
      "react/jsx-props-no-spreading": "off",
    },
  },
  prettier,
];
