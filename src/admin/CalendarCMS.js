import React, {Component} from 'react';
// import generalStyles from '../styles/admin/generalStyles';
import Radium from 'radium';

class CalendarCMS extends Component {
  render() {
    document.title = "Calendar | Rising Phoenix CMS";

    return (
      <div>
        Calendar CMS
      </div>
    );
  }
}
CalendarCMS = Radium(CalendarCMS);
  
export default CalendarCMS;