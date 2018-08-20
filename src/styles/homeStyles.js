import sv from "./styleVariables";
import color from "color";

const homeStyles = {
  header: {
    margin: "3em 0 0 0",
    height: "58vh",
    background: "#222 url('https://s3.us-east-2.amazonaws.com/risingphoenix/static/fire.min.jpg') center top/cover no-repeat fixed",
    textAlign: "center",
    textShadow: "0 3px 3px rgba(0,0,0,0.9)", 
    paddingTop: "15vh",
    transition: "all 0.3s ease",
    "@media (max-width: 450px)": {
      paddingTop: "10vh",
      height: "61vh",
    },
    "@media (min-width: 2000px)": {
      paddingTop: "18vh",
      height: "55vh",
    },
    h1: {
      fontFamily: sv.fontTitle,
      margin: 0,
      fontSize: "5em",
      color: "#eee",
      padding: "0 10%",
      transition: "all 0.3s ease",
      "@media (max-width: 1000px)": {
        fontSize: "4.5em",
      },
      "@media (max-width: 750px)": {
        fontSize: "3.5em",
      },
      "@media (min-width: 2000px)": {
        fontSize: "6em",
      },
    },
    h2: {
      fontWeight: "normal",
      fontSize: "1.5em",
      width: "40%",
      margin: "2.5em auto 0 auto",
      lineHeight: "150%",
      color: "#fff",
      transition: "all 0.3s ease",
      "@media (max-width: 1100px)": {
        width: "50%",
        margin: "2em auto 0 auto",
      },
      "@media (max-width: 1000px)": {
        fontSize: "1.3em",
        width: "60%",
        margin: "4em auto 0 auto",
      },
      "@media (max-width: 750px)": {
        fontSize: "1.2em",
        margin: "1em auto 0 auto",
      },
      "@media (max-width: 450px)": {
        fontSize: "1.1em",
        width: "80%",
        margin: "3.5em auto 0 auto",
      },
      "@media (min-width: 2000px)": {
        fontSize: "2em",
        width: "50%",
        margin: "5em auto 0 auto",
      },
    },
  },

  info: {
    textAlign: "center",
    zIndex: 1,
    giveContainer: {
      backgroundColor: "white",
      borderRadius: "18px",
      display: "inline-block",
      transform: "translateY(-3.8em)",
      "@media (max-width: 1000px)": {
        transform: "translateY(-4.2em)",
      },
      "@media (max-width: 750px)": {
        transform: "translateY(-4.9em)",
        marginTop: "2.5em",
      },
      "@media (min-width: 2000px)": {
        transform: "translateY(-4.5em)",
      },
    },
    giveLink: {
      backgroundColor: sv.red,
      color: "white",
      fontFamily: sv.fontTitle,
      fontSize: "2em",
      margin: "0.5em",
      padding: "0.4em 3em",
      borderRadius: "12px",
      textDecoration: "none",
      height: "100%",
      display: "inline-block",
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
      },
      "@media (max-width: 1000px)": {
        fontSize: "1.6em",
      },
      "@media (max-width: 750px)": {
        fontSize: "1.3em",
      },
      "@media (min-width: 2000px)": {
        fontSize: "3em",
      },
    },
    main: {
      display: "flex",
      marginTop: "-7em",
      padding: "4em 4em 3em 4em",
      backgroundColor: sv.bgLight,
      transition: "all 0.3s ease",
      "@media (max-width: 1000px)": {
        padding: "4em 2em 3em 2em",
      },
      "@media (max-width: 745px)": {
        flexDirection: "column-reverse",
        padding: "3em 3em",
      },
      "@media (max-width: 450px)": {
        padding: "3em 1em 1em 1em",
      },
      "@media (min-width: 2000px)": {
        marginTop: "-10em",
        padding: "6em 5em 3em 5em",
      },
    },
    blurb: {
      textAlign: "left",
      flexBasis: "70%",
      lineHeight: "150%",
      whiteSpace: "pre-wrap",
      padding: "0 5% 0 5%",
      transition: "all 0.3s ease",
      "@media (max-width: 850px)": {
        fontSize: "0.95em"
      },
      "@media (max-width: 745px)": {
        textAlign: "center",
        padding: "0 1em 1em 1em",
      },
      "@media (min-width: 2000px)": {
        fontSize: "1.1em",
        padding: "0 2em",
        marginLeft: "5%"
      },
    },
    logoContainer: {
      flexBasis: "30%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginLeft: "5%",
      "@media (max-width: 1000px)": {
        marginLeft: 0,
        marginTop: "3em",
        alignItems: "flex-start",
    },
      "@media (max-width: 745px)": {
        marginTop: "1em",
      },
    },
    logo: {
      maxWidth: "90%",
      "@media (min-width: 2000px)": {
        maxWidth: "500px",
      },
      "@media (max-width: 1000px)": {
        maxWidth: "100%",
      },
      "@media (max-width: 745px)": {
        maxWidth: "300px",
      },
    },
    learnMoreLink: {
      ...sv.linkStyle
    },
  },

  },

  ctas: {
    backgroundColor: sv.orange,
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: "2em 0",
    fontSize: "1.3em",
    textAlign: "center",
    color: "white",
    transition: "all 0.3s ease",
    "@media (max-width: 1024px)": {
      fontSize: "1.3em",
      padding: "2em 0",
    },
    "@media (max-width: 768px)": {
      fontSize: "1.1em",
      padding: "2em 1em",
      justifyContent: "space-around",
    },
    "@media (max-width: 750px)": {
      flexDirection: "column",
    },
    contact: {
      transition: "all 0.3s ease",
      "@media (max-width: 750px)": {
        marginBottom: "3em",
      },
    },
    getInTouch: {
      display: "inline-block",
      border: "2px solid white",
      color: "white",
      textDecoration: "none",
      fontSize: "0.8em",
      padding: "0.5em 1em",
      margin: "1em 0 0 0",
      borderRadius: 7,
      transition: "background-color 0.4s ease",
      ":hover": {
        color: sv.orange,
        backgroundColor: "white",
        fontWeight: 600,
      },
      ":active": {
        color: sv.orange,
        backgroundColor: "white",
        fontWeight: 600,
      },
      ":focus": {
        color: sv.orange,
        backgroundColor: "white",
        fontWeight: 600,
        outline: "none"
      }
    },
    subscribeText: {
      margin: "0 0 1em 0"
    },
    emailInput: {
      height: "2rem",
      width: "60%",
      padding: "0.5em",
      boxSizing: "border-box",
      transition: "all 0.3s ease",
      borderRadius: 0,
      fontSize: "0.9rem",
      border: "none",
      outline: "none",
      "@media (max-width: 745px)": {
        fontSize: "0.rem",
      },
    },
    emailSubmit: {
      height: "2rem",
      border: "none",
      padding: "0 1em",
      cursor: "pointer",
      backgroundColor: "#eee",
      transition: "background-color 0.4s ease",
      borderRadius: 0,
      fontFamily: sv.fontDefault,
      fontSize: "0.9rem",
      outline: "none",
      boxSizing: "border-box",
      ":hover": {
        color: "black",
        backgroundColor: "#ddd",
        outline: "1px solid rgba(0,0,0,0.1)"
      },
      ":active": {
        color: "black",
        backgroundColor: "#ddd",
        outline: "1px solid rgba(0,0,0,0.1)"
      },
      ":focus": {
        color: "black",
        backgroundColor: "#d7d7d7",
        outline: "1px solid rgba(0,0,0,0.1)"
      },
      "@media (max-width: 745px)": {
        fontSize: "0.rem",
      },
    }
  },

  stats: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: "4em",
    boxSizing: "border-box",
    position: "relative",
    // color: "white",
    backgroundImage: "url('https://s3.us-east-2.amazonaws.com/risingphoenix/static/joanna-kosinska-453787-unsplash.jpg')",
    // backgroundImage: "url('https://s3.us-east-2.amazonaws.com/risingphoenix/static/jason-leung-479251-unsplash.jpg')",
    backgroundSize: "cover",
    "@media (max-width: 745px)": {
      padding: "1em",
      flexDirection: "column"
    },
    overlay: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "rgba(255,255,255,0.3)",
    },
    section: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "2em 0",
      amount: {
        fontSize: "4rem",
        marginBottom: "1rem",
        zIndex: 2,
        // textShadow: "0 0 8px rgba(0,0,0,0.9)"
      },
      text: {
        fontSize: "1.5rem",
        zIndex: 2,
        // textShadow: "0 0 5px rgba(0,0,0,0.9)"
      }
    },
    borderDiv: {
      border: "1px solid black",
      alignSelf: "stretch"
    },
  },

  news: {
    display: "flex",
    flexWrap: "wrap",
    padding: "2em",
    justifyContent: "space-evenly",
    backgroundColor: sv.bgLight,
    transition: "all 0.3s ease",
    "@media (max-width: 450px)": {
      padding: "1em",
    },
    newsItem: {
      flexBasis: "550px",
      boxSizing: "border-box",
      border: "1px solid rgba(0,0,0,0.1)",
      boxShadow: "0 10px 30px -7px rgba(0,0,0,0.25)",
      borderRadius: 5,
      margin: "1em",
      padding: "2em",
      backgroundColor: "white",
      transition: "all 0.3s ease",
      "@media (max-width: 1230px)": {
        flexBasis: "440px",
      },
      "@media (max-width: 450px)": {
        margin: "1em 0.5em",
        padding: "1em",
      },
    },
    newsImage: {
      display: "block",
      maxWidth: "100%",
      height: "auto",
      margin: "0 auto 1.3em auto"
    },
    header: {
      margin: "0 0 0.2em 0",
      fontSize: "1.7em",
      fontWeight: 600,
      ...sv.linkStyle
    },
    date: {
      fontStyle: "italic",
      fontSize: "0.95em",
    },
    preview: {
      margin: "1rem 0 0 0",
    },
    readMore: {
      ...sv.linkStyle,
      display: "block",
      margin: "1em 0 0 0"
    }
  }, 

  sponsors: {
    backgroundColor: sv.lightBrown,
    padding: "2em",
    textAlign: "center",
    fontSize: "1.3em",
    color: "white",
    link: {
      ...sv.linkStyle
    }
  }
};

export default homeStyles;
