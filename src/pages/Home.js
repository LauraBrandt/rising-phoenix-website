import React, { Component } from 'react';
import Radium from 'radium';
import Navbar from '../components/Navbar';
import style from '../styles/homeStyles';
import phoenixUnfilled from '../img/phoenix_stencil_unfilled.png';
import phoenixFilled from '../img/phoenix_stencil_filled.png';
import DATA from '../data.js';

function importAll(r) {
  let images = {};
  r.keys().forEach( item => { images[item.replace('./', '')] = r(item); });
  return images;
}
const newsImages = importAll(require.context('../img/news', false, /\.(png|jpe?g|svg)$/));

let Link = require('react-router-dom').Link;
Link = Radium(Link);

let HomeHeader = (props) => {
  return (
    <header style={style.header}>
      <h1 style={style.header.h1}>Rising Phoenix</h1>
      <h2 style={style.header.h2}>{props.tagline}</h2>
    </header>
  );
}
HomeHeader = Radium(HomeHeader);

let Main = (props) => {
  return (
    <section style={style.main}>
      <div style={style.main.giveContainer}><Link to="/donate" style={style.main.giveLink}>Give</Link></div>
      <div style={style.main.main}>
        <div style={style.main.blurb}>
          <h2>{props.data.blurbTitle}</h2>
          <div>{props.data.blurb} <Link to="/about" style={style.main.learnMoreLink}>Learn more...</Link></div>
        </div>
        <div style={style.main.progress}>
          <img src={phoenixUnfilled} alt="outline of a phoenix" style={style.main.phoenix}/>
          <img src={phoenixFilled} alt="outline of a phoenix filled with red" style={style.main.phoenixFilled}/>
          <div style={style.main.progressBox}>
            <div style={style.main.progressBox.label}>Amount Raised:</div>
            <div style={style.main.progressBox.amount}>{`$${props.data.donatedAmount}`}</div>
            <hr style={{opacity: '0.7'}}/>
            <div style={style.main.progressBox.label}>Our Goal:</div>
            <div style={style.main.progressBox.amount}>{`$${props.data.goalAmount}`}</div>
          </div>
        </div>        
      </div>
    </section>
  );
}
Main = Radium(Main);

class CTAs extends Component {
  constructor() {
    super();
    this.state = {
      email: ""
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({
      email: e.target.value
    })
  }
  render() {
    return (
      <section style={style.ctas}>
        <div style={style.ctas.contact}>
          <div>Want to get involved or learn more?</div>
          <Link to="/contact" style={style.ctas.getInTouch}>Get in touch</Link>
        </div>
        <div style={style.ctas.subscribe}>
          <div>Stay up-to-date with the campaign.</div>
          <div style={style.ctas.subscribeText}>Subscribe to our newsletter:</div>
          <input 
            type="email" 
            value={this.state.email} 
            placeholder="Email"
            onChange={this.handleChange} 
            style={style.ctas.emailInput}
          />
          <button type="button" style={style.ctas.emailSubmit}>Join</button>
        </div>
      </section>
    );
  }
}
CTAs = Radium(CTAs);

let News = (props) => {
  const getFirstWords = (article) => {
    const numWordsInPreview = 30;
    return article.split(' ').slice(0,numWordsInPreview).join(' ');
  }

  return (
    <section style={style.news}>
      {props.newsItems.map( news => 
        <div key={news.title} style={style.news.newsItem}>
          {news.image && <img src={newsImages[news.image]} alt={news.alt} style={style.news.newsImage}/>}
          <Link to={`/news/${news.slug}`} style={style.news.header} >{news.title}</Link>
          <div style={style.news.date}>{news.date.toDateString()}</div>
          <div style={style.news.preview}>{getFirstWords(news.article)}...</div>
          <Link to={`/news/${news.slug}`} style={style.news.readMore}>Read more</Link>
        </div>
      )}
    </section>
  );
}
News = Radium(News);

// const Sponsors = () => {
//   return (
//     <section style={style.sponsors}>
//       A special thanks to our <Link to="/corporate-sponsors" style={style.sponsors.link}>business</Link> and <Link to="/individual-sponsors" style={style.sponsors.link}>individual</Link> sponsors!
//     </section>
//   );
// }

class Home extends Component {
  render() {
    const homeData = DATA.home;
    return (
      <div>
        <Navbar path={this.props.match.path} />
        <HomeHeader tagline={homeData.tagline} />
        <Main data={homeData} />
        <CTAs />
        <News newsItems={homeData.news}/>
        {/* <Sponsors /> */}
      </div>
    );
  }
}

export default Home;