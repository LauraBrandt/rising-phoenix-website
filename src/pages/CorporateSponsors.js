import React, { Component } from 'react';
import Radium from 'radium';
import Header from '../components/Header';
import style from '../styles/corporateSponsorStyles';
import headerBackground from '../img/astronomy5.png';
import { getData } from '../utils/apiCalls';

let Link = require('react-router-dom').Link;
Link = Radium(Link);

class Main extends Component {
  constructor() {
    super()
    this.state = { sponsors: [] };
    this.getCorporateSponsors = this.getCorporateSponsors.bind(this)
  }

  getCorporateSponsors() {
    getData('/api/corporate-sponsors').then((sponsors) => {
      this.setState({ sponsors });
    });
  }

  componentDidMount() {
    this.getCorporateSponsors();
  }

  render() {
    return (
      <main style={style.main}>
        {this.state.sponsors.length ?
          <article>
            <div style={style.sponsorContainer}>
              {this.state.sponsors.map( company =>
                <div key={company.name} style={style.outerCompanyBlock}>
                  {company.link ?
                  <a href={company.link} style={[style.innerCompanyBlock, style.link]} key={company.link}>
                    {company.logo ? 
                      <img src={`https://s3.us-east-2.amazonaws.com/risingphoenix/${company.logo}`} alt={`${company.name} logo`} style={style.img} />
                      :
                      company.name
                    }
                  </a>
                  : 
                  <div href={company.link} style={style.innerCompanyBlock}>
                    {company.logo && <img src={`https://s3.us-east-2.amazonaws.com/risingphoenix/${company.logo}`} alt={`${company.name} logo`} style={style.img} />}
                    {!company.logo && company.name}
                  </div>}
                </div>
              )}
            </div>
          </article>
          :
          <div>
            There are no corporate sponsors yet. Own a business? <Link to="/contact">Talk to us about becoming a sponsor</Link>.
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
      <h1 style={style.header.h1}>Thanks to all the businesses who have supported us!</h1>
      <div style={style.header.cta}>
        Own a business? <Link to="/contact" style={style.header.link}>Talk to us about becoming a sponsor</Link>.
      </div>
    </div>
  );
}
HeaderContent = Radium(HeaderContent);

class CorporateSponsors extends Component {
  render() {
    document.title = "Rising Phoenix | Corporate Sponsors";
    return (
      <div>
        <Header 
          bgImage={headerBackground} 
          bgAlt="Aurora borealis"
          rightDiv={<HeaderContent/>}
        />
        <Main />
      </div>
    );
  }
}

export default CorporateSponsors;