/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      background: {
        primary: "#3498db",
        secondary: "#e74c3c",
        accent: "#ffce56",
        background: "#f9f9f9",
        text: "#333",
        white: "#fff",
        black: "#000",
      },
      colors: {
        primary: "#3498db",
        secondary: "#e74c3c",
        accent: "#ffce56",
        background: "#f9f9f9",
        text: "#333",
        white: "#fff",
        black: "#000",
      },
    },
  },

  plugins: [require("@tailwindcss/forms")],
};
