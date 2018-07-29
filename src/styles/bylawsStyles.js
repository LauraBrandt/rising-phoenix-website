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
      paddingLeft: "50%",
      fontSize: "1.7em",
      transition: "all 0.3s ease",
      "@media (max-width: 1024px)": {
        fontSize: "1.6em",
        paddingLeft: "40%",
      },
      "@media (max-width: 745px)": {
        fontSize: "1.3em",
        padding: "0 2em 0 2em",
        alignItems: "center"
      },
      "@media (min-width: 2000px)": {
        fontSize: "2.8em",
      }
    }
  }
};

export default bylawsStyles;
