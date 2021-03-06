const orange = "#DE5E37";
const paleOrange = "#F58C5F";

const styleVariables = {
  dark: "#111",
  light: "#ccc",
  red: "#BE352D",
  orange: "#DE5E37",
  paleOrange: "#F58C5F",
  lightBrown: "#9C5F4D",
  darkGreen: "#283927",

  turquoise: "#40ADA1",
  blue: "#78E8F9",

  facebookBlue: "#3B5998",
  twitterBlue: "#55ACEE",
  bgLight: "#f7f7f7",
  fontDefault: "Montserrat, Helvetica, sans-serif",
  fontHeader: "Poiret One, Helvetica, sans-serif",
  fontTitle: "Cinzel Decorative, Helvetica, sans-serif",
  mainStyle: {
    padding: "3% 15% 5% 15%",
    minHeight: "70vh",
    lineHeight: "150%",
    transition: "all 0.3s ease",
    "@media (max-width: 850px)": {
      padding: "2% 10%",
    },
    "@media (max-width: 550px)": {
      padding: "5% 10%",
    }
  },
  h1Style: {
    transition: "all 0.3s ease",
    "@media (max-width: 550px)": {
      fontSize: "1.5em",
    }
  },
  hrStyle: {
    margin: "2% 0 4% 0", 
    opacity: "0.3",
  },
  linkStyle: {
    color: paleOrange,
    textDecoration: "none",
    transition: "all 0.3s ease",
    ":hover": {
      color: orange,
    },
    ":active": {
      color: orange,
    },
    ":focus": {
      color: orange,
      outline: "none",
    }
  }
};
  
export default styleVariables;