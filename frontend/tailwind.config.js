export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0F1117",
        surface: "#161B22",
        "surface-light": "#21262D",
        primary: {
          DEFAULT: "#9333EA", // electric purple
          glow: "rgba(147, 51, 234, 0.5)",
        },
        secondary: {
          DEFAULT: "#06B6D4", // neon cyan
          glow: "rgba(6, 182, 212, 0.5)",
        },
        accent: {
          DEFAULT: "#2DD4BF", // soft teal
          glow: "rgba(45, 212, 191, 0.5)",
        },
      },
      fontFamily: {
        sans: ["Inter", "Manrope", "sans-serif"],
        heading: ["Sora", "Space Grotesk", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        xl: "12px",
        "2xl": "16px",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
