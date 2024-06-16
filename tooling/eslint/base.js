/// <reference types="./types.d.ts" />

import eslint from "@eslint/js"
import drizzlePlugin from "eslint-plugin-drizzle"
import importPlugin from "eslint-plugin-import"
import sortPlugin from "eslint-plugin-simple-import-sort"
import tseslint from "typescript-eslint"

/**
 * All packages that leverage t3-env should use this rule
 */
export const restrictEnvAccess = tseslint.config({
   files: ["**/*.js", "**/*.ts", "**/*.tsx"],
   rules: {
      "no-restricted-properties": [
         "error",
         {
            object: "process",
            property: "env",
            message:
               "Use `import { env } from '@/env'` instead to ensure validated types.",
         },
      ],
      "no-restricted-imports": [
         "error",
         {
            name: "process",
            importNames: ["env"],
            message:
               "Use `import { env } from '@/env'` instead to ensure validated types.",
         },
      ],
   },
})

export default tseslint.config(
   {
      // Globally ignored files
      ignores: ["**/*.config.*", "dist/"],
   },
   {
      files: ["**/*.js", "**/*.ts", "**/*.tsx"],
      plugins: {
         import: importPlugin,
         "simple-import-sort": sortPlugin,
         drizzle: drizzlePlugin,
      },
      extends: [
         eslint.configs.recommended,
         ...tseslint.configs.recommended,
         ...tseslint.configs.recommendedTypeChecked,
         ...tseslint.configs.stylisticTypeChecked,
      ],
      rules: {
         "simple-import-sort/imports": [
            "error",
            {
               groups: [
                  [
                     // React first.
                     "^react",
                     // Type imports.
                     "^node:.*\\u0000$",
                     "^@?\\w.*\\u0000$",
                     "^[^.].*\\u0000$",
                     "^\\..*\\u0000$",
                     // Side effect imports.
                     "^\\u0000",
                     // Node.js builtins prefixed with `node:`.
                     "^node:",
                     // Packages.
                     "^@?\\w",
                     // Absolute imports and other imports such as Vue-style `@/foo`.
                     "^",
                     // Relative imports.
                     "^\\.",
                  ],
               ],
            },
         ],
         "simple-import-sort/exports": "error",
         "import/first": "error",
         // "import/newline-after-import": "error",
         "import/no-duplicates": "error",
         "@typescript-eslint/array-type": "off",
         "@typescript-eslint/consistent-type-definitions": "off",
         "@typescript-eslint/no-unused-vars": [
            "error",
            { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
         ],
         "@typescript-eslint/consistent-type-imports": [
            "warn",
            { prefer: "type-imports", fixStyle: "separate-type-imports" },
         ],
         "@typescript-eslint/no-misused-promises": [
            2,
            { checksVoidReturn: { attributes: false } },
         ],
         "@typescript-eslint/require-await": "off",
         "@typescript-eslint/no-unnecessary-condition": [
            "error",
            {
               allowConstantLoopConditions: true,
            },
         ],
         "@typescript-eslint/no-non-null-assertion": "error",
         "react/no-unescaped-entities": "off",
         "@typescript-eslint/no-unsafe-assignment": "off",
         "@typescript-eslint/no-unsafe-member-access": "off",
         "@typescript-eslint/no-unsafe-call": "off",
         "@typescript-eslint/no-unsafe-argument": "off",
         // "@typescript-eslint/no-unsafe-return": "off",
         "drizzle/enforce-delete-with-where": [
            "error",
            {
               drizzleObjectName: ["db"],
            },
         ],
         "drizzle/enforce-update-with-where": [
            "error",
            {
               drizzleObjectName: ["db"],
            },
         ],
      },
   },
   {
      linterOptions: { reportUnusedDisableDirectives: true },
      languageOptions: { parserOptions: { project: true } },
   },
)
