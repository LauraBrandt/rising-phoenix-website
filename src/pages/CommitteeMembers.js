import React, { Component } from "react";
import Header from "../components/Header";
import Radium from "radium";
import style from "../styles/committeeStyles";
import { getData } from "../utils/apiCalls";

class Main extends Component {
  constructor() {
    super();
    this.state = { members: [] };
    this.getCommitteeMembers = this.getCommitteeMembers.bind(this);
  }

  getCommitteeMembers() {
    getData("/api/committee-members").then((members) => {
      this.setState({ members });
    });
  }

  componentDidMount() {
    this.getCommitteeMembers();
  }

  render() {
    return (
      <main style={style.main}>
        <ul style={style.ul}>
          {this.state.members.length ?
            this.state.members.map((person) => 
              (<li key={person.name} style={style.li}>
                <span style={style.name}>{person.name}</span>
                &nbsp;&nbsp;&nbsp;&mdash;&nbsp;&nbsp;&nbsp;
                {person.link ? 
                  <a href={person.link} style={style.organizationLink} key={person.affiliation}>{person.affiliation}</a> :
                  <span>{person.affiliation}</span>
                }          
              </li>)
            )          
            :
            <div></div>
          }
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
};
HeaderContent = Radium(HeaderContent);

class CommitteeMembers extends Component {
  render() {
    document.title = "Rising Phoenix | Committee Members";
    return (
      <div>
        <Header 
          bgImage="https://s3.us-east-2.amazonaws.com/risingphoenix/static/astronomy2.png" 
          bgAlt="swirling pink surface"
          rightDiv={<HeaderContent/>}
        />
        <Main />
      </div>
    );
  }
}

export default CommitteeMembers;