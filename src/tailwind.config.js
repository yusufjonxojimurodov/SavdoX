/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        diagonalBounce: {
          "0%, 100%": { transform: "translate(0,0)" },
          "25%": { transform: "translate(5px,-5px)" },
          "50%": { transform: "translate(10px,5px)" },
          "75%": { transform: "translate(5px,0)" },
        },
      },
      animation: {
        diagonalBounce: "diagonalBounce 1s ease-in-out infinite",
      },
    },
  },
};
