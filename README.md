# React + TypeScript + Vite\r

\r
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.\r
\r
Currently, two official plugins are available:\r
\r

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh\r
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh\r
  \r

## Expanding the ESLint configuration\r

\r
If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:\r
\r

````js\r
export default tseslint.config({\r
  extends: [\r
    // Remove ...tseslint.configs.recommended and replace with this\r
    ...tseslint.configs.recommendedTypeChecked,\r
    // Alternatively, use this for stricter rules\r
    ...tseslint.configs.strictTypeChecked,\r
    // Optionally, add this for stylistic rules\r
    ...tseslint.configs.stylisticTypeChecked,\r
  ],\r
  languageOptions: {\r
    // other options...\r
    parserOptions: {\r
      project: ['./tsconfig.node.json', './tsconfig.app.json'],\r
      tsconfigRootDir: import.meta.dirname,\r
    },\r
  },\r
})\r
```\r
\r
You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:\r
\r
```js\r
// eslint.config.js\r
import reactX from 'eslint-plugin-react-x'\r
import reactDom from 'eslint-plugin-react-dom'\r
\r
export default tseslint.config({\r
  plugins: {\r
    // Add the react-x and react-dom plugins\r
    'react-x': reactX,\r
    'react-dom': reactDom,\r
  },\r
  rules: {\r
    // other rules...\r
    // Enable its recommended typescript rules\r
    ...reactX.configs['recommended-typescript'].rules,\r
    ...reactDom.configs.recommended.rules,\r
  },\r
})\r
```\r
````
