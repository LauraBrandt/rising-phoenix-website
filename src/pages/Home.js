import React, { Component } from "react";
import Radium from "radium";
import style from "../styles/homeStyles";
import phoenixUnfilled from "../img/phoenix_stencil_unfilled.png";
import phoenixFilled from "../img/phoenix_stencil_filled.png";
// import phoenixGrey from "../img/phoenix_stencil_grey.png";
import { getData } from "../utils/apiCalls";

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

let Main = (props) => {
  const imageHeight = 400;
  const fakePercentConstant = 0.08;

  const percentGoal = props.homeInfo.donatedAmount / props.homeInfo.goalAmount;
  const fakePercent = percentGoal / (percentGoal + fakePercentConstant);
  const clipAmount = imageHeight - (imageHeight * fakePercent);

  const imageHeightStyle = {
    height: imageHeight,
    "@media (max-width: 750px)": {
      height: imageHeight*0.8,
    },
    "@media (max-width: 650px)": {
      height: imageHeight*0.65,
    },
  };

  const imageClipStyle = {
    clip: `rect(${clipAmount}px,400px,400px,0px)`,
    "@media (max-width: 750px)": {
      clip: `rect(${clipAmount*0.8}px,400px,400px,0px)`,
    },
    "@media (max-width: 650px)": {
      clip: `rect(${clipAmount*0.65}px,400px,400px,0px)`,
    },
  };

  const progressBoxMarginSmallStyle = {
    "@media (max-width: 650px)": {
      margin: `2em auto ${(imageHeight*0.65) + 50}px auto`
    },
  }

  return (
    <section style={style.main}>
      <div style={style.main.giveContainer}><Link to="/donate" style={style.main.giveLink}>Give</Link></div>
      <div style={style.main.main}>
        <div style={style.main.blurb}>
          <h2>{props.homeInfo.blurbTitle}</h2>
          <div style={{whiteSpace: "pre-wrap"}}>{props.homeInfo.blurb} <Link to="/about" style={style.main.learnMoreLink}>Learn more...</Link></div>
        </div>
        <div style={style.main.progress}>
          <img src={phoenixUnfilled} alt="outline of a phoenix" style={[style.main.phoenix, imageHeightStyle]}/>
          <img src={phoenixFilled} alt="outline of a phoenix filled with red" style={[style.main.phoenixFilled, imageHeightStyle, imageClipStyle]}/>
          <div style={[style.main.progressBox, progressBoxMarginSmallStyle]}>
            <div style={style.main.progressBox.label}>Amount Raised:</div>
            <div style={style.main.progressBox.amount}>{`$${props.homeInfo.donatedAmount}`}</div>
            <hr style={{opacity: "0.7"}}/>
            <div style={style.main.progressBox.label}>Our Goal:</div>
            <div style={style.main.progressBox.amount}>{`$${props.homeInfo.goalAmount}`}</div>
          </div>
        </div>        
      </div>
    </section>
  );
};
Main = Radium(Main);

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
    var articleWithoutHtml = article.replace(/(<([^>]+)>)/ig,"");
    const numWordsInPreview = 50;
    return articleWithoutHtml.split(/\s+/).slice(0,numWordsInPreview).join(" ");
  };

  return (
    <section style={style.news}>
      {props.newsStories.length && props.newsStories.map( story => 
        <div key={story.title} style={style.news.newsItem}>
          {story.image && <img src={`https://s3.us-east-2.amazonaws.com/risingphoenix/${story.image}`} alt={story.alt} style={style.news.newsImage}/>}
          <Link to={`/news/${story.slug}`} style={style.news.header}>{story.title}</Link>
          {story.updatedAt && <div style={style.news.date}>{new Date(story.updatedAt).toDateString()}</div>}
          <div style={style.news.preview}>{getFirstWords(story.article)}...</div>
          <Link to={`/news/${story.slug}`} style={style.news.readMore}>Read more</Link>
        </div>
      )}
    </section>
  );
};
News = Radium(News);

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
        goalAmount: "",
        donatedAmount: ""
      }
    };
    this.getHomeInfo = this.getHomeInfo.bind(this);
    this.getNews = this.getNews.bind(this);
  }

  getHomeInfo() {
    getData("/api/home").then((homeInfo) => {
      if (!homeInfo.error) {
        this.setState({ homeInfo });
      }
    });
  }

  getNews() {
    getData("/api/news").then((news) => {
      this.setState({ news });
    });
  }

  componentDidMount() {
    this.getHomeInfo();
    this.getNews();
  }

  render() {   
    document.title = "Rising Phoenix";
    return (
      <div>
        <HomeHeader tagline={this.state.homeInfo.tagline} />
        <Main homeInfo={this.state.homeInfo} />
        <CTAs />
        <News newsStories={this.state.news}/>
        {/* <Sponsors /> */}
      </div>
    );
  }
}

export default Home;