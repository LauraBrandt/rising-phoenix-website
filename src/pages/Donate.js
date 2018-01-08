import React, { Component } from 'react';
import Radium from 'radium';
import Header from '../components/Header';
import style from '../styles/donateStyles';
import headerBackground from '../img/astronomy7.png';
import gfmLogo from '../img/GoFundMe-Logo.jpg';
import DATA from '../data.js';

class Main extends Component {
  render() {
    const donateData = DATA.donate;
    return (
      <main style={style.main}>
        <h2 style={style.main.h2}>{donateData.donateTitle}</h2>
        <div style={style.main.donateText}>{donateData.donateText}</div>
        <div style={style.main.donateHeader}>You can donate in one of the following ways:</div>
        <div style={style.main.donateContainer}>
          <div style={style.main.gfmContainer}>
            Through our GoFundMe page:<br/><br/>
            <a href={DATA.links.goFundMe} style={style.main.gfmLink}><img src={gfmLogo} alt="gofundme logo" style={style.main.gfmLogo}/></a>
          </div>
          <div style={style.main.checkContainer}>
            By mailing a check made payable to <span style={{fontWeight: 600}}>{donateData.check.to}</span> to
            <div style={style.main.checkAddress}>
              {donateData.check.name && <div>{donateData.check.name}</div>}
              {donateData.check.address1 && <div>{donateData.check.address1}</div>}
              {donateData.check.address2 && <div>{donateData.check.address2}</div>}
              {donateData.check.city}, {donateData.check.state} {donateData.check.zip}<br />
            </div>
          </div>
        </div>
        <h2 style={style.main.h2}>{donateData.rewardTitle}</h2>
        <div>{donateData.rewardText}</div>
        <div style={style.main.rewardsTable}>
          {donateData.rewardLevels.map( level => 
            <div key={level.name} style={style.main.rewardsTable.row} tabIndex="0">
              {level.amountEnd && <div style={style.main.rewardsTable.amtCol}>$ {level.amountStart.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} - {level.amountEnd.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>}
              {!level.amountEnd && <div style={style.main.rewardsTable.amtCol}>$ {level.amountStart.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} +</div>}
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
}
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
        <Main />
      </div>
    );
  }
}

export default Donate;