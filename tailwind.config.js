/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  // DaisyUI configuration
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#D32F2F",      // Blood Red
          secondary: "#1976D2",    // Request Blue
          accent: "#F9EBEB",       // Soft Background
          neutral: "#2C3E50",      // Text Color
          "base-100": "#FFFFFF",   // Main Background
        },
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          primary: "#FF5252",      // Brighter Red for dark mode
          "base-100": "#121212",   // Dark Background
          "base-200": "#1E1E1E",   // Card/Surface Background
          neutral: "#F5F5F5",
        },
      },
    ],
  },
};