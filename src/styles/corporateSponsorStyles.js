import sv from "./styleVariables";
// import color from "color";

const corporateSponsorStyles = {
  main: {
    ...sv.mainStyle,
    backgroundColor: sv.bgLight,
  },
  sponsorContainer: {
    display: "grid",
    gridGap: "5%",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    textAlign: "center",
    fontSize: "2em",
    lineHeight: "120%",
    transition: "all 0.3s ease",
  },
  outerCompanyBlock: {
    backgroundColor: "white",
    margin: "5% 0",
    padding: "10% 10%",
    border: "1px solid rgba(0,0,0,0.1)",
    // boxShadow: "inset 0 2px 2px rgba(255,255,255,0.3), inset 0 -2px 2px rgba(0,0,0,0.3)",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    borderRadius: "5px",
    transition: "all 0.3s ease",
    ":hover": {
      backgroundColor: "#fdfdfd",
      boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
      // boxShadow: "inset 0 0px 2px rgba(255,255,255,0.3), 0 2px 12px rgba(0,0,0,0.2)",
    },
    ":active": {
      backgroundColor: "#fdfdfd",
      boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
    },
    ":focus": {
      backgroundColor: "#fdfdfd",
      boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
      outline: "none"
    },
  },
  innerCompanyBlock: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  img: {
    maxWidth: "90%",
    maxHeight: "90%",
  },
  link: {
    ...sv.linkStyle
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
      padding: "0 8% 0 12%",
      transition: "all 0.3s ease",
      "@media (max-width: 745px)": {
        textAlign: "center",
        padding: "5%",
        justifyContent: "space-around",
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
        fontSize: "1.8em",
      },
      "@media (min-width: 2000px)": {
        fontSize: "3.5em",
      },
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
    link: {
      ...sv.linkStyle
      // color: sv.paleOrange,
    }
  }
};

export default corporateSponsorStyles;
