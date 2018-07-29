import React, { Component } from "react";
import Radium from "radium";
import Header from "../components/Header";
import style from "../styles/individualSponsorStyles";
import { getData } from "../utils/apiCalls";

let Link = require("react-router-dom").Link;
Link = Radium(Link);

class Main extends Component {
  constructor() {
    super();
    this.state = { sponsors: [] };
    this.getSponsors = this.getSponsors.bind(this);
  }

  getSponsors() {
    getData("/api/individual-sponsors").then((sponsors) => {
      this.setState({ sponsors });
    });
  }

  componentDidMount() {
    this.getSponsors();
  }

  render() {
    return (
      <main style={style.main}>
        {this.state.sponsors.length ?
          <article>
            <div style={style.nameContainer}>
              {this.state.sponsors.map( individual => <div key={individual.name} style={style.name}>{individual.name}</div> )}
            </div>
          </article>
          :
          <div>
            There are no supporters yet. Why don't you <Link to="/donate" style={style.link}>become one</Link>?
          </div>
        }
      </main>
    );
  }
}
Main = Radium(Main);

let HeaderContent = () => {
  return (
    <div style={style.header.outer}>
      <h1 style={style.header.h1}>Thanks to all the people who have supported us!</h1>
      <div style={style.header.cta}>
        Want to see your name on this list? Join these awesome people and <Link to="/donate" style={style.link}>support us</Link>.
      </div>
    </div>
  );
};
HeaderContent = Radium(HeaderContent);

class IndividualSponsors extends Component {
  render() {
    document.title = "Rising Phoenix | Individual Sponsors";
    return (
      <div>
        <Header 
          bgImage="https://s3.us-east-2.amazonaws.com/risingphoenix/static/astronomy3.min.jpg"
          bgAlt="colorful nebula"
          contentDiv={<HeaderContent/>}
        />
        <Main />
      </div>
    );
  }
}

export default IndividualSponsors;