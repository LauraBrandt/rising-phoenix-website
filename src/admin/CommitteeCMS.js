import React, {Component} from 'react';
// import generalStyles from '../styles/admin/generalStyles';
import Radium from 'radium';

class CommitteeCMS extends Component {
  render() {
    document.title = "Committee | Rising Phoenix CMS";

    return (
      <div>
        Committee CMS
      </div>
    );
  }
}
CommitteeCMS = Radium(CommitteeCMS);
  
export default CommitteeCMS;