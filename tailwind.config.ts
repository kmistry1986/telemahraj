import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#C2410C",
          dark: "#9A3412",
          darker: "#7C2D12",
        },
        dark: {
          DEFAULT: "#1A1530",
          lighter: "#2A2440",
        },
        warm: {
          bg: "#FFF3E6",
          surface: "#F7F4EF",
          border: "#E7DED3",
          muted: "#CBBFB1",
          text: "#9A8C7C",
        },
        amber: {
          rating: "#B45309",
        },
        green: {
          success: "#14532D",
          "success-bg": "#E6F2EC",
        },
      },
      fontFamily: {
        heading: ["'Bricolage Grotesque'", "system-ui", "sans-serif"],
        body: ["'DM Sans'", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
