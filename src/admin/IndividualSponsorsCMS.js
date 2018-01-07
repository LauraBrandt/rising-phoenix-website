import React, {Component} from 'react';
// import generalStyles from '../styles/admin/generalStyles';
import Radium from 'radium';

class IndividualSponsorsCMS extends Component {
  render() {
    document.title = "Individual Sponsors | Rising Phoenix CMS";

    return (
      <div>
        Individual Sponsors CMS
      </div>
    );
  }
}
IndividualSponsorsCMS = Radium(IndividualSponsorsCMS);
  
export default IndividualSponsorsCMS;