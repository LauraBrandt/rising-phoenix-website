import sv from "./styleVariables";
// import color from "color";

const individualSponsorStyles = {
  main: {
    ...sv.mainStyle,
  },
  link: {
    ...sv.linkStyle
    // color: sv.paleOrange,
  },
  nameContainer: {
    display: "grid",
    gridRowGap: "1em",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    fontSize: "1.2em",
  },
  becomeSponsor: {
    marginTop: "10%",
    fontSize: "0.9em"
  },
  header: {
    outer: {
      width: "100%",
      height: "100%",
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-evenly",
      padding: "0 5% 0 0",
      transition: "all 0.3s ease",
      "@media (max-width: 745px)": {
        textAlign: "center",
        padding: "5%",
      },
    },
    h1: {
      fontSize: "2.7em",
      margin: 0,
      transition: "all 0.3s ease",
      "@media (max-width: 1024px)": {
        fontSize: "2.4em",
      },
      "@media (max-width: 745px)": {
        fontSize: "2em",
      },
      "@media (min-width: 2000px)": {
        fontSize: "3.5em",
      }
    },
    cta: {
      fontSize: "1.1em",
      transition: "all 0.3s ease",
      "@media (max-width: 1024px)": {
        fontSize: "0.95em",
      },
      "@media (min-width: 2000px)": {
        fontSize: "1.3em",
      }
    },
  }
};

export default individualSponsorStyles;
