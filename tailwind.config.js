module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'

  /* solution to fix dnd issue 👉 */
  /* from documentation: The important option lets you control whether or not Tailwind’s utilities should be marked with !important. This can be really useful when using Tailwind with existing CSS that has high specificity selectors.(https://tailwindcss.com/docs/configuration) */
  /* important: true, */
  /* (Can remove/out-comment ⬆ and in List do !top-auto !left-auto instead of top-auto left-auto -> cleaner) */

  theme: {
    extend: {
      colors: {
        grayish: "#e6ecf0",
        navMobile: "#d8e0e8",
        blueish: "#50b7f5",
        hoverBluish: "#3799d4",
        orange: "#FF6600",
        orangeHover: "#ff9e5e",
        testBg: "#caccce",
        whiteSmoke: "#E8E8E8",
        whiteExp: "#FAF9F6",
        purpleish: "#482980",
        hoverPurpleish: "#341d5c",
        lightBlueish: "#e8f5fe",
      },
      fontFamily: {
        mainFontHelv: "helvetica",
      },
      spacing: {
        /* postPrimaryDivSpacing: "70px", */
        postPrimaryDivSpacing: "78px",
        largeTest: "512px",
        xxxxxl: "1024px",
        widgetsPaddingWidthTemp: "88px",
        notificationWidth: "350px",

        3.25: "13px",
      },
      screens: {
        widthForShowDate: "998px",
        mdLgTest: "890px",
        smallerTest: "640px",
        xs: "500px",
      },
      borderRadius: {
        widgetsBorder: "20px",
      },
      backgroundImage: {
        loginPic:
          "url(https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=953&q=80)",
      },
      minWidth: {
        "min-width": "fit-content",
        widgetsMinWidth: "270px",
      },
      maxWidth: {
        detailsAboutLogin: "285px",
        notificationHeader: "190px",
        notificationHeaderReward: "210px",
        notificationText: "175px",
        notificationTextReward: "130px",

        profileAvatar: "170px",
        /* postImageTest: "222px", */
        postImageTest: "70%",
        avatarField: "80px",
      },
      width: {
        0.5: "2px",
      },
      fontSize: {
        verySmall: "11px",
      },
      height: {
        4.5: "18px",
        18: "76px",
      },
      transitionDuration: {
        125: "125ms",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
