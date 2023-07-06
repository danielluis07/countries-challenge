/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        mobile: "375px",
        desktop: "1440px",
      },
      colors: {
        darkblue: "hsl(209, 23%, 22%)",
        verydarkblue: "hsl(207, 26%, 17%)",
        verydarkbluelight: "hsl(200, 15%, 8%)",
        darkgraylight: "hsl(0, 0%, 52%)",
        verylightgray: "hsl(0, 0%, 98%)",
      },
    },
  },
  plugins: [],
};
