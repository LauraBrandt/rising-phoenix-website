import React from "react";
import Radium from "radium";
import style from "../styles/footerStyles";
import gfmLogo from "../img/GoFundMe-Logo.jpg";

let Footer = (props) => {
  return (
    <footer style={style.footer}>
      <div style={style.links}>
        <a href={props.links.donate} style={style.gfmLink}><img src={gfmLogo} key="goFundMeImg" alt="gofundme logo" style={style.gfmLogo}/></a>
        {props.links.facebook && <a href={props.links.facebook} style={style.facebookLogo} key="facebook"><i className="fa fa-facebook-square"></i></a>}
        {props.links.twitter && <a href={props.links.twitter} style={style.twitterLogo} key="twitter"><i className="fa fa-twitter-square"></i></a>}
      </div>
      <div style={style.copyright}>&copy; { new Date().getFullYear() } Rising Phoenix</div>
    </footer>
  );
};
Footer = Radium(Footer);

export default Footer;