import React, { Component } from 'react';
import Radium from 'radium';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import style from '../styles/individualSponsorStyles';
import headerBackground from '../img/astronomy3.png';
import DATA from '../data.js';

let Link = require('react-router-dom').Link;
Link = Radium(Link);

const sponsors = DATA.sponsors.individual;

class Main extends Component {
  render() {
    // const sponsors = DATA.sponsors.individual;
    return (
      <main style={style.main}>
        {sponsors.names.length ?
          <article>
            <div style={style.nameContainer}>
            {sponsors.names.map( individual => <div key={individual.name} style={style.name}>{individual.name}</div> )}
            </div>
          </article>
          :
          <div>
            There are no supporters yet. Why don't you <Link to="/donate">become one</Link>?
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
      <h1 style={style.header.h1}>{sponsors.title}</h1>
      <div style={style.header.cta}>
        Want to see your name on this list? Join these awesome people and <Link to="/donate" style={style.header.link}>support us</Link>.
      </div>
    </div>
  );
}
HeaderContent = Radium(HeaderContent);

class IndividualSponsors extends Component {
  render() {
    document.title = "Rising Phoenix | Individual Sponsors";
    return (
      <div>
        <Navbar path={this.props.match.path}/>
        <Header 
          bgImage={headerBackground}
          bgAlt="colorful nebula"
          rightDiv={<HeaderContent/>}
        />
        <Main />
      </div>
    );
  }
}

export default IndividualSponsors;