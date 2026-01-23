import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a192f",
        accent: "#64ffda",
        secondary: "#112240",
        textPrimary: "#ccd6f6",
        textSecondary: "#8892b0",
      },
    },
  },
  plugins: [],
};
export default config;
