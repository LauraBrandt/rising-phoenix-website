import React, { Component } from 'react';
import Radium from 'radium';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import style from '../styles/aboutStyles';
import headerBackground from '../img/astronomy1.png';
import DATA from '../data.js';

class Main extends Component {
  render() {
    const aboutText = DATA.about.text;
    return (
      <main style={style.main}>
        <article dangerouslySetInnerHTML={{__html: aboutText}}>
        </article>
      </main>
    );
  }
}
Main = Radium(Main);

let HeaderContent = () => {
  return (
    <div style={style.header.outer}>
      <h1 style={style.header.h1}>What is this all about?</h1>
    </div>
  );
}
HeaderContent = Radium(HeaderContent);


class About extends Component {
  render() {
    return (
      <div>
        <Navbar path={this.props.match.path}/>
        <Header 
          bgImage={headerBackground}
          bgAlt="blue, purple, and black lines of light"
          rightDiv={<HeaderContent/>}
        />
        <Main />
      </div>
    );
  }
}

export default About;