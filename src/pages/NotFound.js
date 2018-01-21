import React from "react";
import Radium from "radium";
import style from "../styles/notFoundStyles";

let Link = require("react-router-dom").Link;
Link = Radium(Link);

let NotFound = () => {
  document.title = "Rising Phoenix | 404";
  return (
    <main style={style.main}>
      <h1 style={style.h1}>404</h1>
      <p style={style.p1}>Sorry, looks like that page doesn"t exist.</p>
      <p style={style.p2}>Check the URL and try again.</p>
      <Link to="/" style={style.button}>Go Home</Link>
    </main>
  );
};
NotFound = Radium(NotFound);

export default NotFound;