/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        loginBg: "#fafafa",
        loginContainer: "#ffffff",
        loginBlue: "#0095f6",
        popupBG: "#252525",
      },
    },
  },
  plugins: [],
};
