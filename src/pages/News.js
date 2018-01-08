import React, { Component } from 'react';
import Radium from 'radium';
import { Route, Switch, Redirect } from 'react-router-dom';
import style from '../styles/newsStyles';
import DATA from '../data.js';

let Link = require('react-router-dom').Link;
Link = Radium(Link);

function importAll(r) {
  let images = {};
  r.keys().forEach( item => { images[item.replace('./', '')] = r(item); });
  return images;
}
const newsImages = importAll(require.context('../img/news', false, /\.(png|jpe?g|svg)$/));

let NewsList = (props) => {  
  document.title = "Rising Phoenix | News";
  
  const newsItems = DATA.home.news;

  const getFirstWords = (article) => {
    const numWordsInPreview = 30;
    return article.split(' ').slice(0,numWordsInPreview).join(' ');
  }

  return (
    <main style={style.newsList}>
      {newsItems.map(news => 
        <div key={news.title} style={style.newsList.item}>
          {news.image && <img src={newsImages[news.image]} alt={news.alt} style={style.newsList.image}/>}
          <Link to={`/news/${news.slug}`} style={style.newsList.header} >{news.title}</Link>
          <div style={style.newsList.date}>{news.date.toDateString()}</div>
          <div style={style.newsList.preview}>{getFirstWords(news.article)}...</div>
          <Link to={`/news/${news.slug}`} style={style.newsList.readMore}>Read more</Link>
        </div>  
      )}
    </main>
  );
}
NewsList = Radium(NewsList);

let Article = (props) => {
  const newsItem = DATA.home.news.find(item => item.slug === props.match.params.title);  
  
  if (newsItem) {
    document.title = `Rising Phoenix | ${newsItem.title}`;
    return (
      <main style={style.article}>
        {newsItem.image && <img src={newsImages[newsItem.image]} alt={newsItem.alt} style={style.article.image}/>}
        <h1 style={style.article.header}>{newsItem.title}</h1>
        <div style={style.article.date}>{newsItem.date.toDateString()}</div>
        <hr style={style.article.hr} />
        <article style={style.article.article} dangerouslySetInnerHTML={{__html: newsItem.article}}>
        </article>
      </main>
    );
  }
  else {
    return <Redirect to='/notfound'/>;
  }  
}
Article = Radium(Article);

class News extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/news' component={NewsList}/>
        <Route path='/news/:title' component={Article}/>
      </Switch>
    );
  }
}

export default News;