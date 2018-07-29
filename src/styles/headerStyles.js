import sv from "./styleVariables";

const headerStyles = {
  header: {
    height: "26vh",
    minHeight: "130px",
    backgroundColor: sv.dark,
    marginTop: "3em",
    fontFamily: sv.fontHeader,
    color: "white",
    position: "relative",
    overflow: "hidden",
    display: "flex",
    "@media (max-width: 745px)": {
      marginTop: "3.8em",
    }
  },
  bgImg: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    minWidth: "100%",
    minHeight: "100%",
    height: "auto",
    opacity: 0.5,
  },
  logoDiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "20%",
    zIndex: 2,
    "@media (max-width: 745px)": {
      display: "none"
    }
  },
  logo: {
    width: "150px",
    background: "radial-gradient(rgba(255,255,255,0.2) 40%, rgba(255,255,255,0) 70%)"
  },
  contentDiv: {
    width: "80%",
    zIndex: 2,
    transition: "all 0.3s ease",
    "@media (max-width: 745px)": {
      width: "100%",
    },
  },
};

export default headerStyles;