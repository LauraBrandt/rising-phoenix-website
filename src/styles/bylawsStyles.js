import sv from "./styleVariables";

const bylawsStyles = {  
  main: {
    ...sv.mainStyle
  },
  header: {
    outer: {
      width: "100%",
      height: "100%",
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-evenly",
      paddingLeft: "30%",
      fontSize: "1.9em",
      transition: "all 0.3s ease",
      "@media (max-width: 1024px)": {
        fontSize: "1.6em",
      },
      "@media (max-width: 745px)": {
        fontSize: "1.3em",
      },
      "@media (min-width: 2000px)": {
        fontSize: "2.8em",
      }
    }
  }
};

export default bylawsStyles;
