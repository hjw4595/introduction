import js from '@eslint/js'\r
import globals from 'globals'\r
import reactHooks from 'eslint-plugin-react-hooks'\r
import reactRefresh from 'eslint-plugin-react-refresh'\r
import tseslint from 'typescript-eslint'\r
\r
export default tseslint.config(\r
  { ignores: ['dist'] },\r
  {\r
    extends: [js.configs.recommended, ...tseslint.configs.recommended],\r
    files: ['**/*.{ts,tsx}'],\r
    languageOptions: {\r
      ecmaVersion: 2020,\r
      globals: globals.browser,\r
    },\r
    plugins: {\r
      'react-hooks': reactHooks,\r
      'react-refresh': reactRefresh,\r
    },\r
    rules: {\r
      ...reactHooks.configs.recommended.rules,\r
      'react-refresh/only-export-components': [\r
        'warn',\r
        { allowConstantExport: true },\r
      ],\r
    },\r
  },\r
)\r
