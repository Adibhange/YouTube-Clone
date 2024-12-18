/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        background: "rgb(26, 26, 26)",
        foreground: "rgb(38, 38, 38)",
        border: "rgb(64, 64, 64)",

        copy: "rgb(251, 251, 251)",
        "copy-light": "rgb(217, 217, 217)",
        "copy-lighter": "rgb(166, 166, 166)",

        success: "rgb(0, 255, 0)",
        warning: "rgb(255, 255, 0)",
        error: "rgb(255, 0, 0)",

        "success-content": "rgb(0, 0, 0)",
        "warning-content": "rgb(0, 0, 0)",
        "error-content": "rgb(255, 255, 255)",
      },
    },
  },
  plugins: [],
};
