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
  instagramLogo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(#4c68d7, #8a3ab9, #bc2a8d, #cd486b, #e95950, #fbad50, #fccc63)",
    color: sv.dark,
    height: "1.5rem",
    width: "1.5rem",
    fontSize: "1.35rem",
    marginTop: "0.25rem",
    borderRadius: "5px",
    textDecoration: "none",
    ":focus": {
      background: `linear-gradient(${color("#4c68d7").lighten(0.15)}, ${color("#8a3ab9").lighten(0.15)}, ${color("#bc2a8d").lighten(0.15)}, ${color("#cd486b").lighten(0.15)}, ${color("#e95950").lighten(0.15)}, ${color("#fbad50").lighten(0.15)}, ${color("#fccc63").lighten(0.15)})`,
      outline: "none"
    },
  },
};

export default footerStyles;
