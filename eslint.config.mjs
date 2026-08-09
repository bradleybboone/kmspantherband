// Next 16 ships flat ESLint configs directly. The old FlatCompat +
// compat.extends("next/core-web-vitals") shim from Next 15 throws a circular
// reference error against these, so import the flat arrays instead.
import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

const eslintConfig = [
  {
    ignores: [
      ".next/**",
      ".open-next/**",
      ".wrangler/**",
      "node_modules/**",
      "next-env.d.ts",
    ],
  },
  ...coreWebVitals,
  ...typescript,
];

export default eslintConfig;
