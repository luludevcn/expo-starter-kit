/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#007AFF',
          light: '#3395FF',
          dark: '#0066CC',
        },
        secondary: {
          DEFAULT: '#5856D6',
          light: '#7C7AFF',
          dark: '#4846B0',
        },
        success: {
          DEFAULT: '#34C759',
          light: '#52DE7A',
          dark: '#29A64A',
        },
        warning: {
          DEFAULT: '#FF9500',
          light: '#FFAD33',
          dark: '#CC7700',
        },
        danger: {
          DEFAULT: '#FF3B30',
          light: '#FF6B60',
          dark: '#CC2F26',
        },
      },
    },
  },
  plugins: [],
};
