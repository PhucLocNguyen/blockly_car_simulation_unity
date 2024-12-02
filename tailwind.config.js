/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(59 130 246 / 0.5)", // Now you can use bg-primary, text-primary, etc.
        secondary: "var(--secondary-color)",
        primaryText: "#1976d2",
      },
    },
    screens: {
      sm: "360px",
      // => @media (min-width: 360px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
  },
  corePlugins: {
    preflight: false, // Disables Tailwind's base reset
  },
  plugins: [],
};
