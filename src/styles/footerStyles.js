import sv from "./styleVariables";
import color from "color";

const footerStyles = {
  footer: {
    backgroundColor: sv.dark,
    textAlign: "center",
    padding: "1em",
  },
  links: {
    fontSize: "1.7em",
    margin: "auto",
    width: "200px",
    display: "flex",
    justifyContent: "space-evenly",
    paddingBottom: "0.3em"
  },
  copyright: {
    color: sv.light,
  },
  gfmLink: {
    borderRadius: "5px",    
    padding: "0 0.15em",
    ":focus": {
      backgroundColor: color(sv.dark).lighten(2.5),
      outline: "none",
    },
  },
  gfmLogo: {
    borderRadius: "5px",
    height: "0.87em",
    width: "auto",
    marginTop: "0.15em",
  },
  facebookLogo: {
    color: sv.facebookBlue,    
    ":focus": {
      color: color(sv.facebookBlue).lighten(0.2),
      outline: "none"
    },
  },
  twitterLogo: {
    color: sv.twitterBlue,
    ":focus": {
      color: color(sv.twitterBlue).lighten(0.2),
      outline: "none"
    },
  },
};

export default footerStyles;
