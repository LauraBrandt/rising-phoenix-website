import sv from "./styleVariables";
import color from "color";

const navElemStyles = {
  fontSize: "0.95em",
  fontFamily: sv.fontDefault,
  color: sv.light,
  transition: "all 0.4s ease",
  ":hover": {
    color: "white",
  },
  ":active": {
    color: "white",
  },
  ":focus": {
    color: "white",
    outline: "none"
  }, 
};

const navElemWideStyles = {
  padding: "0.5em 1em 0.9em 1em",
};

const navElemNarrowStyles = {
  padding: "0.5em 1.3em",
  margin: "0.5em 0.2em",
  width: "100%",
  textAlign: "left",
};

const LinkStyles = {
  display: "block",
  textDecoration: "none",
  ...navElemStyles,
};

const ulStyles = {
  listStyleType: "none",
  display: "flex",
};

const dropdownToggleStyles = {
  background: "none",
  borderTop: "none",
  borderBottom: "none",
  borderLeft: "none",
  borderRight: "none",
  margin: 0,
  cursor: "pointer",
  ...navElemStyles,  
};

const dropdownMenuStyles = {
  flexDirection: "column",  
  backgroundColor: color(sv.dark).lighten(0.8),
};

const navbarStyles = {

  navbar: {
    position: "fixed",
    left: 0,
    top: 0,
    right: 0,
    zIndex: 10,
  },

  wide: {
    navbar: {      
      backgroundColor: sv.dark,
      boxShadow: "0 3px 10px rgba(0, 0, 0, 0.5)",
      "@media (max-width: 745px)": {
        display: "none"
      }
    },
    ul: {
      ...ulStyles,
      margin: "0 auto",
      padding: ".1em 0 0 0",
      justifyContent: "space-around",
      alignItems: "flex-end",
      width: "80%",
      transition: "all 0.4s ease",
      "@media (max-width: 1025px)": {
        width: "90%",
      }
    },
    li: {
      borderRadius: "5px",
      position: "relative",
    },
    Link: {
      ...LinkStyles,
      ...navElemWideStyles,
    },
    dropdownToggle: {
      ...dropdownToggleStyles,
      ...navElemWideStyles,
    },
    dropdownMenu: {
      ...ulStyles,
      ...dropdownMenuStyles,
      position: "absolute",
      minWidth: "250px",
      margin: "-0.3em 0 0 0",
      padding: ".5em 0 .5em 0",
      boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
      zIndex: 20,
    },
    dropdownLi: {
      width: "100%",   
      transition: "all 0.4s ease", 
      ":hover": {
        backgroundColor: color(sv.dark).lighten(1.2),
      },
      ":active": {
        backgroundColor: color(sv.dark).lighten(1.2),
      },
      ":focus": {
        backgroundColor: color(sv.dark).lighten(1.2),
        outline: "none"
      }
    },
    dropdownLink: {
    },
    donateLink: {
      color: "white",
      padding: "0.4em 1em 0.5em 1em",
      margin: "0.5em 0 0.4em 0",
      backgroundColor: sv.red,
      borderBottom: `1px solid ${sv.red}`,
      borderTop: `1px solid ${sv.red}`,
      borderLeft: `1px solid ${sv.red}`,
      borderRight: `1px solid ${sv.red}`,
      borderRadius: 5,
      transition: "all 0.4s ease",
      ":hover": {
        backgroundColor: color(sv.red).lighten(0.2),
        borderBottom: `1px solid ${color(sv.red).lighten(0.2)}`,
        borderTop: `1px solid ${color(sv.red).lighten(0.2)}`,
        borderLeft: `1px solid ${color(sv.red).lighten(0.2)}`,
        borderRight: `1px solid ${color(sv.red).lighten(0.2)}`,
      },
      ":active": {
        backgroundColor: color(sv.red).lighten(0.2),
        borderBottom: `1px solid ${color(sv.red).lighten(0.2)}`,
        borderTop: `1px solid ${color(sv.red).lighten(0.2)}`,
        borderLeft: `1px solid ${color(sv.red).lighten(0.2)}`,
        borderRight: `1px solid ${color(sv.red).lighten(0.2)}`,
      },
      ":focus": {
        backgroundColor: color(sv.red).lighten(0.2),
        borderBottom: `1px solid ${color(sv.red).lighten(0.2)}`,
        borderTop: `1px solid ${color(sv.red).lighten(0.2)}`,
        borderLeft: `1px solid ${color(sv.red).lighten(0.2)}`,
        borderRight: `1px solid ${color(sv.red).lighten(0.2)}`,
        outline: "none"
      }
    },
    current: {
      padding: "0.5em 1em 0.65em 1em",
      borderBottom: `4px solid ${sv.light}`,
      color: "#eee"
    },
    donateLinkCurrent: {
      padding: "0.4em 1em 0.5em 1em",
      borderBottom: `1px inset ${sv.red}`,
      borderTop: `1px inset ${sv.red}`,
      borderLeft: `1px inset ${sv.red}`,
      borderRight: `1px inset ${sv.red}`,
      color: "white",
      backgroundColor: color(sv.red).lighten(0.2),
    },
    socialButtons: {
      fontSize: "1.5em",
      paddingBottom: "0.35em",
      display: "flex"
    },
    facebookButton: {
      color: sv.facebookBlue,
      marginRight: ".8em",
      transition: "all 0.4s ease",
      ":hover": {
        color: color(sv.facebookBlue).lighten(0.2),
      },
      ":active": {
        color: color(sv.facebookBlue).lighten(0.2),
      },
      ":focus": {
        color: color(sv.facebookBlue).lighten(0.2),
        outline: "none"
      },
      "@media (max-width: 1025px)": {
        marginRight: ".6em",
      },
      "@media (max-width: 770px)": {
        marginRight: ".4em",
      }
    },
    twitterButton: {
      color: sv.twitterBlue,
      marginRight: ".8em",
      transition: "all 0.4s ease",
      ":hover": {
        color: color(sv.twitterBlue).lighten(0.2),
      },
      ":active": {
        color: color(sv.twitterBlue).lighten(0.2),
      },
      ":focus": {
        color: color(sv.twitterBlue).lighten(0.2),
        outline: "none"
      },
      "@media (max-width: 1025px)": {
        marginRight: ".6em",
      },
      "@media (max-width: 770px)": {
        marginRight: ".4em",
      }
    },
    instagramButton: {
      marginRight: ".8em",
      transition: "all 0.4s ease",

      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(#4c68d7, #8a3ab9, #bc2a8d, #cd486b, #e95950, #fbad50, #fccc63)",
      color: sv.dark,
      height: "1.3rem",
      width: "1.3rem",
      fontSize: "1.2rem",
      marginTop: "0.22rem",
      marginBottom: "0.2rem",
      borderRadius: "5px",
      textDecoration: "none",
      ":hover": {
        background: `linear-gradient(${color("#4c68d7").lighten(0.15)}, ${color("#8a3ab9").lighten(0.15)}, ${color("#bc2a8d").lighten(0.15)}, ${color("#cd486b").lighten(0.15)}, ${color("#e95950").lighten(0.15)}, ${color("#fbad50").lighten(0.15)}, ${color("#fccc63").lighten(0.15)})`,
      },
      ":active": {
        background: `linear-gradient(${color("#4c68d7").lighten(0.15)}, ${color("#8a3ab9").lighten(0.15)}, ${color("#bc2a8d").lighten(0.15)}, ${color("#cd486b").lighten(0.15)}, ${color("#e95950").lighten(0.15)}, ${color("#fbad50").lighten(0.15)}, ${color("#fccc63").lighten(0.15)})`,
      },
      ":focus": {
        background: `linear-gradient(${color("#4c68d7").lighten(0.15)}, ${color("#8a3ab9").lighten(0.15)}, ${color("#bc2a8d").lighten(0.15)}, ${color("#cd486b").lighten(0.15)}, ${color("#e95950").lighten(0.15)}, ${color("#fbad50").lighten(0.15)}, ${color("#fccc63").lighten(0.15)})`,
        outline: "none"
      },
      "@media (max-width: 1025px)": {
        marginRight: ".6em",
      },
      "@media (max-width: 770px)": {
        marginRight: ".4em",
      }
    },
  }, 


  narrow: {
    navbar: {
      "@media (min-width: 746px)": {
        display: "none"
      }
    },
    topBar: {      
      backgroundColor: sv.dark,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0 1%",
      boxShadow: "0 3px 10px rgba(0, 0, 0, 0.5)",
    },
    logo: {
      height: 50,
      width: 50,
      display: "block",
      margin: "2% 0 2% 3%",
    },
    title: {
      fontFamily: sv.fontTitle,
      color: color(sv.light).lighten(0.3),
      margin: "5.5% 0 5% 5%", // with logo: 0,
      fontSize: "1.3em"
    },
    barsButton: {
      color: color(sv.light).lighten(0.1),
      backgroundColor: sv.dark,
      border: "none",
      fontSize: "1.5em",
      padding: "0.3em 0.5em",
      float: "right",
      cursor: "pointer",
      ":hover": {
        color: "white"
      },
      ":active": {
        color: "white"
      },
      ":focus": {
        color: "white",
        outline: "1px solid #777"
      }
    },
    ul: {
      ...ulStyles,
      backgroundColor: sv.dark,
      flexDirection: "column",
      margin: "3.5em 0",
      padding: "0.5em 0",
      height: "100%",
      width: 0,
      position: "fixed",
      zIndex: 20,
      overflowX: "hidden",
      transition: "0.3s",
      top: 0,
      right: 0,
    },
    Link: {
      ...LinkStyles,
      ...navElemNarrowStyles,
      transition: "0.3s",
    },
    dropdownToggle: {
      ...dropdownToggleStyles,
      ...navElemNarrowStyles,
      display: "block",
    },
    dropdownMenu: {
      ...ulStyles,
      ...dropdownMenuStyles,
      margin: 0,      
      padding: "0 1em",
    },
    dropdownLink: {
      margin: 0,
      padding: "0.5em 0",
      fontSize: "0.95em",
      width: "auto",
    },    
    donateLink: {
      color: "white",
      backgroundColor: sv.red,
      transition: "all 0.4s ease",
      ":hover": {
        backgroundColor: color(sv.red).lighten(0.2),
      },
      ":active": {
        backgroundColor: color(sv.red).lighten(0.2),
      },
      ":focus": {
        backgroundColor: color(sv.red).lighten(0.2),
        outline: "none"
      }
    },
    current: {
      padding: "0.5em 1.5em 0.5em 1.05em",
      borderLeft: `4px solid ${sv.light}`,
      color: "#eee"
    },
    donateLinkCurrent: {
      color: "white",
      backgroundColor: color(sv.red).lighten(0.2),
    },
  },
  
  carat: {
    paddingLeft: ".5em",
  },
};

export default navbarStyles;
