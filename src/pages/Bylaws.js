import React, { Component } from "react";
import Radium from "radium";
import Header from "../components/Header";
import style from "../styles/bylawsStyles";
import { getData } from "../utils/apiCalls";
import "../styles/bylaws.css";

class Main extends Component {
  constructor() {
    super();
    this.state = { bylawsContent: "" };
    this.getBylaws = this.getBylaws.bind(this);
  }

  getBylaws() {
    getData("/api/bylaws").then((bylaws) => {
      this.setState({ bylawsContent: bylaws.content });
    });
  }

  componentDidMount() {
    this.getBylaws();
  }

  render() {
    return (
      <main style={style.main}>
        <article dangerouslySetInnerHTML={{__html: this.state.bylawsContent}} />
      </main>
    );
  }
}
Main = Radium(Main);

let HeaderContent = () => {
  return (
    <div style={style.header.outer}>
      <h1 style={style.header.h1}>By-Laws</h1>
    </div>
  );
};
HeaderContent = Radium(HeaderContent);


class ByLaws extends Component {
  render() {
    document.title = "Rising Phoenix | By-Laws";
    return (
      <div>
        <Header 
          bgImage="https://s3.us-east-2.amazonaws.com/risingphoenix/static/astronomy8.min.jpg"
          bgAlt="Earth as seen from space"
          contentDiv={<HeaderContent/>}
        />
        <Main />
      </div>
    );
  }
}

export default ByLaws;