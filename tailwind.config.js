/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(59 130 246 / 0.5)", // Now you can use bg-primary, text-primary, etc.
        secondary: "var(--secondary-color)",
      },
    },
  },
  corePlugins: {
    preflight: false, // Disables Tailwind's base reset
  },
  plugins: [],
};
