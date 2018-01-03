import React, { Component } from 'react';
import Radium from 'radium';
import Navbar from '../components/Navbar';
import style from '../styles/notFoundStyles';

let Link = require('react-router-dom').Link;
Link = Radium(Link);

class Main extends Component {
  render() {
    return (
      <main style={style.main}>
        <h1 style={style.h1}>404</h1>
        <p style={style.p1}>Sorry, looks like that page doesn't exist.</p>
        <p style={style.p2}>Check the URL and try again.</p>
        <Link to="/" style={style.button}>Go Home</Link>
      </main>
    );
  }
}
Main = Radium(Main);

class About extends Component {  
  render() {
    document.title = "Rising Phoenix | 404";
    return (
      <div>
        <Navbar path={this.props.match.path}/>
        <Main />
      </div>
    );
  }
}

export default About;