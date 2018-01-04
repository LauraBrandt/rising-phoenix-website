import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Radium from 'radium';
import style from '../styles/committeeStyles';
import headerBackground from '../img/astronomy2.png';
import DATA from '../data.js';

class Main extends Component {
  render() {
    const members = DATA.committee.members;
    return (
      <main style={style.main}>
        <ul style={style.ul}>
          {members.map((person) => 
            (<li key={person.name} style={style.li}>
              <span style={style.name}>{person.name}</span>
              &nbsp;&nbsp;&nbsp;&mdash;&nbsp;&nbsp;&nbsp;
              {person.link ? 
                <a href={person.link} style={style.organizationLink} key={person.organization}>{person.organization}</a> :
                <span>{person.organization}</span>
              }          
            </li>)
          )}
        </ul>
      </main>
    );
  }
}
Main = Radium(Main);

let HeaderContent = () => {
  return (
    <div style={style.header.outer}>
      <h1 style={style.header.h1}>Committee Members</h1>
    </div>
  );
}
HeaderContent = Radium(HeaderContent);

class CommitteeMembers extends Component {
  render() {
    document.title = "Rising Phoenix | Committee Members";
    return (
      <div>
        <Navbar path={this.props.match.path}/>
        <Header 
          bgImage={headerBackground}  
          bgAlt="swirling pink surface"
          rightDiv={<HeaderContent/>}
        />
        <Main />
        <Footer />
      </div>
    );
  }
}

export default CommitteeMembers;