import React from 'react';
import Radium from 'radium';
import style from '../styles/footerStyles';
import gfmLogo from '../img/GoFundMe-Logo.jpg';
import DATA from '../data';

let Footer = () => {
  return (
    <footer style={style.footer}>
      <div style={style.links}>
        <a href={DATA.links.goFundMe} style={style.gfmLink}><img src={gfmLogo} key="goFundMeImg" alt="gofundme logo" style={style.gfmLogo}/></a>
        <a href={DATA.links.facebook} style={style.facebookLogo} key="facebook"><i className="fa fa-facebook-square"></i></a>
        <a href={DATA.links.twitter} style={style.twitterLogo} key="twitter"><i className="fa fa-twitter-square"></i></a>
      </div>
      <div style={style.copyright}>&copy; { new Date().getFullYear() } Rising Phoenix</div>
    </footer>
  );
}
Footer = Radium(Footer)

export default Footer;