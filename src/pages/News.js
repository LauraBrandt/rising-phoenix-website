import React, { Component } from "react";
import Radium from "radium";
import { Route, Switch, Redirect } from "react-router-dom";
import style from "../styles/newsStyles";
import { getData } from "../utils/apiCalls";

let Link = require("react-router-dom").Link;
Link = Radium(Link);

class NewsList extends Component {
  constructor() {
    super();
    this.state = { news: [] };
    this.getNews = this.getNews.bind(this);
  }

  getNews() {
    getData("/api/news").then((news) => {
      this.setState({ news });
    });
  }

  componentDidMount() {
    this.getNews();
  }

  render() {
    document.title = "Rising Phoenix | News";
  
    const getFirstWords = (article) => {
      var articleWithoutHtml = article.replace(/(<([^>]+)>)/ig,"");
      const numWordsInPreview = 50;
      return articleWithoutHtml.split(/\s+/).slice(0,numWordsInPreview).join(" ");
    };

    return (
      <main style={style.newsList}>
        {this.state.news.length && this.state.news.map(newsItem => 
          <div key={newsItem.title} style={style.newsList.item}>
            {newsItem.image && <img src={`https://s3.us-east-2.amazonaws.com/risingphoenix/${newsItem.image}`} alt={newsItem.alt} style={style.newsList.image}/>}
            <Link to={`/news/${newsItem.slug}`} style={style.newsList.header} >{newsItem.title}</Link>
            {newsItem.updatedAt && <div style={style.newsList.date}>{new Date(newsItem.updatedAt).toDateString()}</div>}
            <div style={style.newsList.preview}>{getFirstWords(newsItem.article)}...</div>
            <Link to={`/news/${newsItem.slug}`} style={style.newsList.readMore}>Read more</Link>
          </div>  
        )}
      </main>
    );
  }
}
NewsList = Radium(NewsList);


class Article extends Component {
  constructor(props) {
    super(props);
    this.state = { article: {}, notFound: false };
    this.getArticle = this.getArticle.bind(this);
  }

  getArticle() {
    getData(`/api/news/${this.props.match.params.title}`).then((article) => {
      if (article.error) {
        this.setState({
          notFound: true
        });
      } else {
        this.setState({ 
          article,
          notFound: false
        });
      }
    });
  }

  componentDidMount() {
    this.getArticle();
  }

  render() {
    document.title = `Rising Phoenix | ${this.state.article.title}`;

    if (this.state.notFound) {
      return <Redirect to="/notfound"/>;
    } else {
      return (
        <main style={style.article}>
          {this.state.article.image && <img src={`https://s3.us-east-2.amazonaws.com/risingphoenix/${this.state.article.image}`} alt={this.state.article.alt} style={style.article.image}/>}
          <h1 style={style.article.header}>{this.state.article.title}</h1>
          {this.state.article.updatedAt && <div style={style.article.date}>{new Date(this.state.article.updatedAt).toDateString()}</div>}
          <hr style={style.article.hr} />
          <article style={style.article.article} dangerouslySetInnerHTML={{__html: this.state.article.article}}>
          </article>
        </main>
      );
    }
  }
}
Article = Radium(Article);

class News extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/news" component={NewsList}/>
        <Route path="/news/:title" component={Article}/>
      </Switch>
    );
  }
}

export default News;