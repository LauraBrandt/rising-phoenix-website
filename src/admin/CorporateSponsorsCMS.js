import React, {Component} from 'react';
// import generalStyles from '../styles/admin/generalStyles';
import Radium from 'radium';

class CorporateSponsorsCMS extends Component {
  render() {
    document.title = "Corporate Sponsors | Rising Phoenix CMS";

    return (
      <div>
        Corporate Sponsors CMS
      </div>
    );
  }
}
CorporateSponsorsCMS = Radium(CorporateSponsorsCMS);
  
export default CorporateSponsorsCMS;