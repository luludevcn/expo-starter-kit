const tailwindConfig = require('./tailwind.config.js');

module.exports = {
  ...tailwindConfig,
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
};
