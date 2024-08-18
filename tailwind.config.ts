import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ["sans-serif"],
      },
      colors: {
        customGray: "#dedede",
        linkColor: "#1a0dab",
        linkMobileColor: "#1558d6",
        greenBgColor: "#f0f8ff",
        xColor: "#000000",
        youtubeColor: "#FF0000",
        instagramGradientStart: "#f09433",
        instagramGradientMiddle1: "#e6683c",
        instagramGradientMiddle2: "#dc2743",
        instagramGradientMiddle3: "#cc2366",
        instagramGradientEnd: "#bc1888",
      },
    },
  },
  plugins: [],
};
export default config;
