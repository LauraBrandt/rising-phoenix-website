import React from 'react';
import style from '../styles/footerStyles';
import gfmLogo from '../img/GoFundMe-Logo.jpg';
import DATA from '../data';

const Footer = () => {
  return (
    <footer style={style.footer}>
      <div style={style.links}>
        <a href={DATA.links.goFundMe}><img src={gfmLogo} alt="gofundme logo" style={style.gfmLogo}/></a>
        <a href={DATA.links.facebook}><i className="fa fa-facebook-square" style={style.facebookLogo}></i></a>
        <a href={DATA.links.twitter}><i className="fa fa-twitter-square" style={style.twitterLogo}></i></a>
      </div>
      <div style={style.copyright}>&copy; { new Date().getFullYear() } Rising Phoenix</div>
    </footer>
  );
}

export default Footer;