<<<<<<< HEAD
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
=======
Weather Application 🌦️

A React-based weather application that allows users to search for current weather conditions and a 5-day forecast for any city. The app also fetches weather details based on the user's geolocation.

Features

🌍 Geolocation-based Weather: Automatically fetches weather data for the user's current location.

🔍 City Search: Search for weather conditions in any city.

🌡️ Current Weather: Displays temperature, weather conditions, humidity, wind speed, sunrise, and sunset times.

📅 5-Day Forecast: Provides a 5-day weather forecast with day-wise temperatures and conditions.

🌐 Interactive Design: User-friendly and responsive interface.

🔔 Error Handling: Displays appropriate error messages for invalid or unrecognized city names.

🚀 Loading States: Indicates when data is being fetched.

Tech Stack

Frontend: React.js, TypeScript, TailwindCSS

APIs: OpenWeatherMap API

Icons: React-icons
>>>>>>> e9c51b9f9f3f02e2b017bf0d828a4199905232d0
