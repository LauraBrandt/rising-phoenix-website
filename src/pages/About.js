import React, { Component } from "react";
import Radium from "radium";
import Header from "../components/Header";
import style from "../styles/aboutStyles";
import { getData } from "../utils/apiCalls";

class Main extends Component {
  constructor() {
    super();
    this.state = { aboutContent: "" };
    this.getAbout = this.getAbout.bind(this);
  }

  getAbout() {
    getData("/api/about").then((about) => {
      this.setState({ aboutContent: about.content });
    });
  }

  componentDidMount() {
    this.getAbout();
  }

  render() {
    return (
      <main style={style.main}>
        <article dangerouslySetInnerHTML={{__html: this.state.aboutContent}} />
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
};
HeaderContent = Radium(HeaderContent);


class About extends Component {
  render() {
    document.title = "Rising Phoenix | What is this all about?";
    return (
      <div>
        <Header 
          bgImage="https://s3.us-east-2.amazonaws.com/risingphoenix/static/astronomy1.png"
          bgAlt="blue, purple, and black lines of light"
          rightDiv={<HeaderContent/>}
        />
        <Main />
      </div>
    );
  }
}

export default About;