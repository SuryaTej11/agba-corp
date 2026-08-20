import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

/**
 * Flat config, using eslint-config-next's native flat exports.
 * The older FlatCompat shim crashes against ESLint 9 with a circular-structure
 * error, so it is deliberately not used here.
 */
const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "data/**",
      "next-env.d.ts",
      "scripts/**",
    ],
  },
];

export default eslintConfig;
