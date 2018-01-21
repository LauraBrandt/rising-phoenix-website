import React, {Component} from "react";
// import generalStyles from "../styles/admin/generalStyles";
import Radium from "radium";

class HomeCMS extends Component {
  render() {
    document.title = "Home | Rising Phoenix CMS";

    return (
      <div>
        Home CMS
      </div>
    );
  }
}
HomeCMS = Radium(HomeCMS);
  
export default HomeCMS;