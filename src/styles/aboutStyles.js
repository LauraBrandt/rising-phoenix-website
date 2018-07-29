import sv from "./styleVariables";

const aboutStyles = {  
  main: {
    ...sv.mainStyle,
  },
  header: {
    outer: {
      width: "100%",
      height: "100%",
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-evenly",
      paddingLeft: "7em",
      fontSize: "1.7em",
      transition: "all 0.3s ease",
      "@media (max-width: 1024px)": {
        fontSize: "1.5em",
        paddingLeft: "6em",
      },
      "@media (max-width: 820px)": {
        paddingLeft: "4em",
      },
      "@media (max-width: 745px)": {
        fontSize: "1.2em",
        padding: "0 2em 0 2em",
      },
      "@media (min-width: 2000px)": {
        fontSize: "2.5em",
      }
    }
  }
};

export default aboutStyles;
