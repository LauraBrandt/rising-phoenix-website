import React, { Component } from "react";
import Radium from "radium";
import he from "he";
import style from "../styles/homeStyles";
import { getData } from "../utils/apiCalls";

// import data from "../data";

let Link = require("react-router-dom").Link;
Link = Radium(Link);

let HomeHeader = (props) => {
  return (
    <header style={style.header}>
      <h1 style={style.header.h1}>Rising Phoenix</h1>
      <h2 style={style.header.h2}>{props.tagline}</h2>
    </header>
  );
};
HomeHeader = Radium(HomeHeader);

let Info = (props) => {
  return (
    <section style={style.info}>
      <div style={style.info.giveContainer}><Link to="/donate" style={style.info.giveLink}>Give</Link></div>
      <div style={style.info.main}>
        <div style={style.info.logoContainer}>
          <img src="https://s3.us-east-2.amazonaws.com/risingphoenix/static/rising_phoenix_logo_sm.min.png" alt="Rising Phoenix logo" style={style.info.logo} />
        </div>
        <div style={style.info.blurb}>
          <h2>{props.homeInfo.blurbTitle}</h2>
          <div style={{whiteSpace: "pre-wrap"}}>{props.homeInfo.blurb} <Link to="/about" style={style.info.learnMoreLink}>Learn more...</Link></div>
        </div>
      </div>
    </section>
  );
};
Info = Radium(Info);

const formatNumberCommas = num => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

let Stats = ({ donatedAmount, numDonors }) => {
  return (
    <div style={style.stats}>
      <div style={style.stats.section}>
        <div style={style.stats.section.amount}>${formatNumberCommas(donatedAmount)}</div>
        <div style={style.stats.section.text}>raised so far</div>
      </div>
      <div style={style.stats.borderDiv}></div>
      <div style={style.stats.section}>
        <div style={style.stats.section.amount}>{formatNumberCommas(numDonors)}</div>
        <div style={style.stats.section.text}>donors</div>
      </div>
      <div style={style.stats.overlay}></div>
    </div>
  );
};
Stats = Radium(Stats);

let News = (props) => {
  const getFirstWords = (article, short = true) => {
    var articleWithoutHtml = he.decode(article.replace(/(<([^>]+)>)/ig,""));
    const numWordsInPreview = short ? 20 : 50;
    const words = articleWithoutHtml.split(/\s+/);
    
    return `${words.slice(0,numWordsInPreview).join(" ")}${words.length > numWordsInPreview ? " ..." : ""}`;
  };

  return (
    <section style={style.news}>
      <h2 style={style.news.headerTop}>Check out what's going on</h2>
      <div style={style.news.articles}>
        {/* { data.home.news.length && data.home.news.map(story => */}
        { props.newsStories.length && props.newsStories.map( story => 
          <article key={story.title} style={style.news.newsItem}>
            {story.image && <div style={style.news.newsImageContainer}><img src={`https://s3.us-east-2.amazonaws.com/risingphoenix/${story.image}`} alt={story.alt} style={style.news.newsImage}/></div>}
            <div style={[style.news.text, !story.image && {padding: "2rem"}]}>
              <Link to={`/news/${story.slug}`} style={style.news.header}>{story.title}</Link>
              {story.updatedAt && <div style={style.news.date}>{new Date(story.updatedAt).toDateString()}</div>}
              <div style={style.news.preview}>{getFirstWords(story.article, !!story.image)}</div>
              <Link to={`/news/${story.slug}`} style={style.news.readMore}>Read more &raquo;</Link>
            </div>
          </article>
        ) }
      </div>
    </section>
  );
};
News = Radium(News);

class CTAs extends Component {
  constructor() {
    super();
    this.state = {
      email: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({
      email: e.target.value
    });
  }
  render() {
    return (
      <section style={style.ctas}>
        <div style={style.ctas.contact}>
          <div>Want to get involved or learn more?</div>
          <Link to="/contact" style={style.ctas.getInTouch}>Get in touch</Link>
        </div>
        <div style={style.ctas.subscribe}>
          <div style={style.ctas.subscribeText}>Stay up-to-date with the campaign.</div>
          <input 
            type="email" 
            value={this.state.email} 
            placeholder="Email"
            onChange={this.handleChange} 
            style={style.ctas.emailInput}
          />
          <button type="button" style={style.ctas.emailSubmit}>Subscribe</button>
        </div>
      </section>
    );
  }
}
CTAs = Radium(CTAs);

let Scores = () => {
  return (
    <div style={style.scores}>
      <div style={style.scores.text}>Before Hurricane Matthew, Robeson County scored better in science relative to ELA (English language arts) and math than average in North Carolina. We think having access to the Robeson Planetarium and Science Center might have had something to do with it!</div>
      <img style={style.scores.graph} src="https://s3.us-east-2.amazonaws.com/risingphoenix/static/scores-blue.png" alt="Graph of percent difference between science and ELA+math in Robeson County vs NC"/>
    </div>
  );
};
Scores = Radium(Scores);

// const Sponsors = () => {
//   return (
//     <section style={style.sponsors}>
//       A special thanks to our <Link to="/corporate-sponsors" style={style.sponsors.link}>business</Link> and <Link to="/individual-sponsors" style={style.sponsors.link}>individual</Link> sponsors!
//     </section>
//   );
// }

class Home extends Component {
  constructor() {
    super();
    this.state = { 
      news: [],
      homeInfo: {
        tagline: "",
        blurbTitle: "",
        blurb: "",
        // goalAmount: "",
        donatedAmount: 268194
      },
      donors: 0
    };
    this.getHomeInfo = this.getHomeInfo.bind(this);
    this.getNews = this.getNews.bind(this);
    this.getDonors = this.getDonors.bind(this);
  }

  getHomeInfo() {
    getData("/api/home")
      .then((homeInfo) => {
        if (!homeInfo.error) {
          this.setState({ homeInfo });
        }
      })
      .catch(err => console.log(err));
  }

  getNews() {
    getData("/api/news")
      .then(news => this.setState({ news }))
      .catch(err => console.log(err));
  }

  getDonors() {
    let donors = 0;
    getData("/api/individual-sponsors")
      .then(iSponsors => {
        if (iSponsors.length) {
          donors += iSponsors.length;
        }
        getData("/api/corporate-sponsors")
          .then(cSponsors => {
            if (cSponsors.length) {
              donors += cSponsors.length;
            }
            this.setState({ donors });
          });
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.getHomeInfo();
    this.getNews();
    this.getDonors();
  }

  render() {   
    document.title = "Rising Phoenix";
    return (
      <div>
        <HomeHeader tagline={this.state.homeInfo.tagline} />
        <Info homeInfo={this.state.homeInfo} />
        <Stats donatedAmount={this.state.homeInfo.donatedAmount} numDonors={this.state.donors} />
        {this.state.news.length > 0 && <News newsStories={this.state.news}/>}
        <CTAs />
        <Scores />
        {/* <Sponsors /> */}
      </div>
    );
  }
}

export default Home;