module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        grayish: "#e6ecf0",
        blueish: "#50b7f5",
        hoverBluish: "#3799d4",
      },
      fontFamily: {
        mainFontHelv: "helvetica",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
