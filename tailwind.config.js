/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: "Inter",
      },
      colors: {
        primary: "#25D366",
        textDim: "#333",
        grey: "#4F4F4F",
        orange: "#FF9B00",
        green: "#25D366",
      },
    },
  },
  plugins: [],
};
