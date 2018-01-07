import React, {Component} from 'react';
// import generalStyles from '../styles/admin/generalStyles';
import Radium from 'radium';

class DonateCMS extends Component {
  render() {
    document.title = "Donate | Rising Phoenix CMS";

    return (
      <div>
        Donate CMS
      </div>
    );
  }
}
DonateCMS = Radium(DonateCMS);
  
export default DonateCMS;