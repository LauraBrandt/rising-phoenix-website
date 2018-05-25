import React, {Component} from "react";
import dashboardStyles from "../styles/admin/dashboardStyles";
import { Link } from "react-router-dom";
import Radium from "radium";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      pages: ["Home", "About", "Committee Members", "Bylaws", "Calendar", "Corporate Sponsors", "Individual Sponsors", "Donate", "Links"]
    };
  }
  render() {
    document.title = "Dashboard | Rising Phoenix CMS";

    return (
      <div style={dashboardStyles}>
        {this.state.pages.map( page => (
          <div key={page} style={dashboardStyles.dashboardCard}>
            <Link 
              to={`/admin/${page}`.replace(" ", "-").toLowerCase()} 
              style={dashboardStyles.Link}
            >
              {page}
            </Link>
          </div>
        ))}
      </div>
    );
  }
}
Dashboard = Radium(Dashboard);
  
export default Dashboard;