import React, {Component} from 'react';
// import generalStyles from '../styles/admin/generalStyles';
import Radium from 'radium';

class LinksCMS extends Component {
  render() {
    document.title = "Links | Rising Phoenix CMS";

    return (
      <div>
        Links CMS
      </div>
    );
  }
}
LinksCMS = Radium(LinksCMS);
  
export default LinksCMS;