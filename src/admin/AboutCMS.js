import React, {Component} from 'react';
// import generalStyles from '../styles/admin/generalStyles';
import Radium from 'radium';

class AboutCMS extends Component {
  render() {
    document.title = "About | Rising Phoenix CMS";

    return (
      <div>
        About CMS
      </div>
    );
  }
}
AboutCMS = Radium(AboutCMS);
  
export default AboutCMS;