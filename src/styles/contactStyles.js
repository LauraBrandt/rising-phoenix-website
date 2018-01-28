import sv from "./styleVariables";
// import color from "color";

const contactStyles = {
  main: {
    ...sv.mainStyle,
    backgroundColor: sv.bgLight,
    transition: "all 0.3s ease",
    "@media (max-width: 1024px)": {
      padding: "2% 10%",
    },
  },
  statusMessage: {
    textAlign: "center",
    margin: '1em 0',
    color: sv.orange,
    fontSize: '1.2em'
  },
  form: {
    backgroundColor: "white",
    boxShadow: "0 1px 8px rgba(0,0,0,0.25)",
    borderRadius: "5px",
    width: "600px",
    padding: "3em 4em",
    margin: "1em auto",
    display: "grid",
    alignItems: "center",
    gridTemplateColumns: "1fr 2fr",
    gridTemplateRows: "repeat(4, 1fr) 6fr 2fr",
    gridRowGap: "1em",
    gridTemplateAreas: 
      `"nameLabel     name"
       "emailLabel    email"
       "subjectLabel  subject"
       "messageLabel  messageLabel"
       "message       message"
       "submit        ."`,
    transition: "all 0.3s ease",
    "@media (max-width: 1024px)": {
      width: "80%",
    },
    "@media (max-width: 740px)": {
      backgroundColor: sv.bgLight,
      boxShadow: "none",
      borderRadius: "none",
      padding: "0",
    },
    "@media (max-width: 450px)": {
      margin: "1em auto",
      width: "90%",
      gridTemplateColumns: "1fr",
      gridTemplateRows: "repeat(7, 1fr) 4fr 2fr",
      gridRowGap: 0,
      gridTemplateAreas: 
        `"nameLabel"
         "name"
         "emailLabel"
         "email"
         "subjectLabel"
         "subject"
         "messageLabel"
         "message"
         "submit"`,
    },
  },
  text: {
    padding: "0.5em 0.3em",
    fontSize: "0.95em",
    fontFamily: "Helvetica, Arial, sans-serif",
    transition: "all 0.3s ease",
    "@media (max-width: 450px)": {
      margin: "0 0 1em 0"
    },
  },
  nameLabel: {
    gridArea: "nameLabel",
  },
  emailLabel: {
    gridArea: "emailLabel",
  },
  subjectLabel: {
    gridArea: "subjectLabel",
  },
  messageLabel: {
    gridArea: "messageLabel",
  },
  name: {
    gridArea: "name",
  },
  email: {
    gridArea: "email",
  },
  subject: {
    gridArea: "subject",
  },
  message: {
    gridArea: "message",
    alignSelf: "stretch",
    fontFamily: "Helvetica, Arial, sans-serif",
    fontSize: "0.95em",
  },
  submit: {
    gridArea: "submit",
    backgroundColor: sv.orange,
    border: "3px solid white",
    borderRadius: "5px",
    justifySelf: "flex-start",
    padding: "0.7em 1.5em",
    fontSize: "0.95em",
    fontFamily: sv.fontDefault,
    color: "#fafafa",
    cursor: "pointer",
    transition: "all 0.4s ease",
    ":hover": {
      backgroundColor: sv.paleOrange,
      color: "#fff"
    },
    ":active": {
      backgroundColor: sv.paleOrange,
      color: "#fff"
    },
    ":focus": {
      backgroundColor: sv.paleOrange,
      color: "#fff",
      outline: "none"
    },
    "@media (max-width: 450px)": {
      justifySelf: "center"
    },
  },
  required: {
    color: "#999",
    fontSize: "0.9em",
    fontStyle: "italic"
  },
  header: {
    outer: {
      width: "100%",
      height: "100%",
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-evenly",
      fontSize: "1.8em",
      padding: "0 3em 0 0",
      transition: "all 0.3s ease",
      textAlign: "center", // remove with logo
      "@media (max-width: 1024px)": {
        fontSize: "1.5em",
      },
      "@media (max-width: 745px)": {
        fontSize: "1.2em",
        textAlign: "center",
        padding: "0 10%"
      },
      "@media (min-width: 2000px)": {
        fontSize: "2.5em",
      }
    },
    h1: {
      margin: 0, // with logo: "0 0 0 27%",
      transition: "all 0.3s ease",
      // "@media (min-width: 2000px)": {
      //   margin: "0 0 0 22%",
      // },
      // "@media (max-width: 745px)": {
      //   margin: "0"
      // },
    },    
  }
};

export default contactStyles;
