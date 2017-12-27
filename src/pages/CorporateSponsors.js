import React, { Component } from 'react';
import Radium from 'radium';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import style from '../styles/corporateSponsorStyles';
import headerBackground from '../img/astronomy5.png';
import DATA from '../data.js';

// function importAll(r) {
//   let images = {};
//   r.keys().forEach( item => { images[item.replace('./', '')] = r(item); });
//   return images;
// }
// const sponsorLogos = importAll(require.context('../img/sponsorLogos', false, /\.(png|jpe?g|svg)$/));

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
                      <img src={`${process.env.PUBLIC_URL}/img/sponsorLogos/${company.logo}`} alt={`${company.name} logo`} style={style.img} />
                      :
                      company.name
                    }
                  </a>
                  : 
                  <div href={company.link} style={style.innerCompanyBlock}>
                    {company.logo && <img src={`${process.env.PUBLIC_URL}/img/sponsorLogos/${company.logo}`} alt={`${company.name} logo`} style={style.img} />}
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
          bgImage={headerBackground} 
          bgAlt="surora borealis"
          rightDiv={<HeaderContent/>}
        />
        <Main />
      </div>
    );
  }
}

export default CorporateSponsors;