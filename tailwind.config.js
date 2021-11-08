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
        orange: "#FF6600",
        testBg: "#caccce",
        whiteSmoke: "#E8E8E8",
      },
      fontFamily: {
        mainFontHelv: "helvetica",
      },
      spacing: {
        test: "76px",
      },
      screens: {
        mdLgTest: "890px",
        smallerTest: "600px",
      },
      borderRadius: {
        widgetsBorder: "20px",
      },
      backgroundImage: {
        loginPic:
          "url(https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=953&q=80)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
