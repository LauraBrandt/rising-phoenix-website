import React from "react";
import Radium from "radium";
import style from "../styles/headerStyles";

let Header =  (props) => {
  return (
    <header style={style.header}>
      <img src={props.bgImage} alt={props.bgAlt} style={style.bgImg} />
      <div style={style.contentDiv}>
        {props.contentDiv}
      </div>
      <div style={style.logoDiv}>
        <img src="https://s3.us-east-2.amazonaws.com/risingphoenix/static/rising_phoenix_logo_sm.min.png" alt="Rising Phoenix logo" style={style.logo} />
      </div>
    </header>
  );
};

Header = Radium(Header);

export default Header;