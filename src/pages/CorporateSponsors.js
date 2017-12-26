import React, { Component } from 'react';
import Radium from 'radium';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import style from '../styles/corporateSponsorStyles';
import DATA from '../data.js';

const sponsors = DATA.sponsors.corporate;

class Main extends Component {
  render() {
    // const sponsors = DATA.sponsors.corporate;
    return (
      <main style={style.main}>
        {sponsors.businesses.length ?
          <article>
            <div style={style.sponsorContainer}>
              {sponsors.businesses.map( company =>
                <div key={company.name} style={style.outerCompanyBlock}>
                  {company.link ?
                  <a href={company.link} style={[style.innerCompanyBlock, style.link]} key={company.link}>
                    {company.logo ? 
                      <img src={`img/sponsorLogos/${company.logo}`} alt={`${company.name} logo`} style={style.img} />
                      :
                      company.name
                    }
                  </a>
                  : 
                  <div href={company.link} style={style.innerCompanyBlock}>
                    {company.logo && <img src={`img/sponsorLogos/${company.logo}`} alt={`${company.name} logo`} style={style.img} />}
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
      <h1 style={style.header.h1}>{sponsors.title}</h1>
      <div style={style.header.cta}>
        Own a business? <Link to="/contact" style={style.header.link}>Talk to us about becoming a sponsor</Link>.
      </div>
    </div>
  );
}
HeaderContent = Radium(HeaderContent);

class CorporateSponsors extends Component {
  render() {
    return (
      <div>
        <Navbar path={this.props.match.path}/>
        <Header 
          bgImage="img/astronomy9.png" 
          bgAlt="surora borealis"
          rightDiv={<HeaderContent/>}
        />
        <Main />
      </div>
    );
  }
}

export default CorporateSponsors;