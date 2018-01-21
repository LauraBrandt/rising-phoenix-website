import React, { Component } from "react";
import Radium from "radium";
import Header from "../components/Header";
import style from "../styles/donateStyles";
import headerBackground from "../img/astronomy7.png";
import gfmLogo from "../img/GoFundMe-Logo.jpg";
import { getData } from "../utils/apiCalls";

class Main extends Component {
  constructor() {
    super();
    this.state = { 
      rewardLevels: [],
      donateInfo: {
        donateText: "",
        rewardsText: "",
        check: {
          to: "",
          name: "",
          address1: "",
          address2: "",
          city: "",
          state: "",
          zip: "",
        }
      }
    };
    this.getDonateInfo = this.getDonateInfo.bind(this);
    this.getRewardLevels = this.getRewardLevels.bind(this);
  }

  getDonateInfo() {
    getData("/api/donate-info").then((donateInfo) => {
      if (!donateInfo.error) {
        this.setState({ donateInfo });
      }
    });
  }

  getRewardLevels() {
    getData("/api/donate-levels").then((rewardLevels) => {
      this.setState({ rewardLevels });
    });
  }

  componentDidMount() {
    this.getDonateInfo();
    this.getRewardLevels();
  }

  render() {
    return (
      <main style={style.main}>
        <h2 style={style.main.h2}>Make a Donation</h2>
        {this.state.donateInfo.donateText && <div style={style.main.donateText}>{this.state.donateInfo.donateText}</div>}
        <div style={style.main.donateHeader}>You can donate in one of the following ways:</div>
        <div style={style.main.donateContainer}>
          <div style={style.main.gfmContainer}>
            Through our GoFundMe page<br/><br/>
            <a href={this.props.donateLink} style={style.main.gfmLink}><img src={gfmLogo} alt="gofundme logo" style={style.main.gfmLogo}/></a>
          </div>
          <div style={style.main.checkContainer}>
            By mailing a check made payable to <span style={{fontWeight: 600}}>{this.state.donateInfo.check.to}</span> to
            <div style={style.main.checkAddress}>
              {this.state.donateInfo.check.name && <div>{this.state.donateInfo.check.name}</div>}
              {this.state.donateInfo.check.address1 && <div>{this.state.donateInfo.check.address1}</div>}
              {this.state.donateInfo.check.address2 && <div>{this.state.donateInfo.check.address2}</div>}
              {this.state.donateInfo.check.city}, {this.state.donateInfo.check.state} {this.state.donateInfo.check.zip}<br />
            </div>
          </div>
        </div>
        <h2 style={style.main.h2}>Get a Reward</h2>
        {this.state.donateInfo.rewardText && <div style={style.main.rewardText}>{this.state.donateInfo.rewardText}</div>}
        <div style={style.main.rewardsTable}>
          {this.state.rewardLevels.length && this.state.rewardLevels.map( level => 
            <div key={level.name} style={style.main.rewardsTable.row} tabIndex="0">
              {level.amountEnd ?
                <div style={style.main.rewardsTable.amtCol}>$ {level.amountStart.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} - {level.amountEnd.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                :
                <div style={style.main.rewardsTable.amtCol}>$ {level.amountStart.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} +</div>}
              <div style={style.main.rewardsTable.nameCol}>{level.name}</div>
              <div style={style.main.rewardsTable.rewardCol}>{level.reward}</div>
            </div>
          )}
        </div>
        <div style={style.main.footnote}>*pending approval of the school board</div>
      </main>
    );
  }
}
Main = Radium(Main);

let HeaderContent = () => {
  return (
    <div style={style.header.outer}>
      <h1 style={style.header.h1}>Donate</h1>
    </div>
  );
};
HeaderContent = Radium(HeaderContent);


class Donate extends Component {
  render() {
    document.title = "Rising Phoenix | Donate";
    return (
      <div>
        <Header 
          bgImage={headerBackground}
          bgAlt="deep blue-puple starry sky with light from below"
          rightDiv={<HeaderContent/>}
        />
        <Main donateLink={this.props.donateLink}/>
      </div>
    );
  }
}

export default Donate;