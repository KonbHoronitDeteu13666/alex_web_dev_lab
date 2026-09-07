import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Внутренние ссылки берутся только из ROUTES: строковый путь в href
      // молча переживёт переименование раздела и приведёт на 404.
      "no-restricted-syntax": [
        "error",
        {
          selector: String.raw`JSXAttribute[name.name='href'] > Literal[value=/^\//]`,
          message:
            "Внутренние ссылки берите из ROUTES (src/lib/routes.ts), а не строкой.",
        },
        {
          selector: String.raw`JSXAttribute[name.name='href'] > JSXExpressionContainer > Literal[value=/^\//]`,
          message:
            "Внутренние ссылки берите из ROUTES (src/lib/routes.ts), а не строкой.",
        },
      ],
    },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", "prototype/**"]),
]);

export default eslintConfig;
