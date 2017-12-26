import React from 'react';
import Radium from 'radium';
import style from '../styles/headerStyles';

let Header =  (props) => {
  return (
    <header style={style.header}>
      <img src={props.bgImage} alt={props.bgAlt} style={style.bgImg} />
      <div style={style.leftDiv}>
        <img src="img/logo_ajeno.png" alt="a phoenix with wings held out" style={style.logo} />
      </div>
      <div style={style.rightDiv}>
        {props.rightDiv}
      </div>
    </header>
  );
}

Header = Radium(Header);

export default Header;