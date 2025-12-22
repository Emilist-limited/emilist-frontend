import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        exo: ["Exo", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "become-expert-banner": "url('/images/privateExpertBanner.png')",
        "congrats-banner": "url('/images/congrats.png')",
        "footer-texture": "url('/img/footer-texture.png')",
        "primary-gradient": "linear-gradient(90deg, #3ad87e 0%, #9ef769 100%)",
      },
      backgroundColor: {
        "full-transparent": "rgba(0, 0, 0, 0.1)",
        "half-transparent": "rgba(0, 0, 0, 0.5)",
        "part-transparent": "rgba(0, 0, 0, 0.9)",
      },
      colors: {
        "primary-green": "#3ad87e",
        "dark-green": "#054753",
        "light-green": "#9ef769",
        "primary-orange": "#FF9933",
        "primary-yellow": "#fee300",
        "neutral-black": "#030a05",
        "nuetral-light": "#f6ffec",
        "light-brown": "#8A8D8B",
      },
      borderWidth: {
        1: "1px",
      },
      minWidth: {
        12: "3rem",
      },
      animation: {
        "pulse-border": "pulse-border 1.5s ease-in-out infinite",
      },
      keyframes: {
        "pulse-border": {
          "0%": {
            opacity: "1",
          },
          "50%": {
            boxShadow: "0 0 0 8px rgba(255, 0, 0, 0.3)",
            opacity: "0.5",
          },
          "100%": {
            boxShadow: "0 0 0 12px rgba(255, 0, 0, 0)",
            opacity: "0",
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("daisyui")],
};
export default config;
