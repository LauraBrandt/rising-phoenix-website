import React, {Component} from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Callback from "./components/Callback";
import Options from "./components/Options";
import Login from "./Login";
import Dashboard from "./Dashboard";
import HomeCMS from "./HomeCMS";
import AboutCMS from "./AboutCMS";
import CommitteeCMS from "./CommitteeCMS";
import BylawsCMS from "./BylawsCMS";
import CalendarCMS from "./CalendarCMS";
import CorporateSponsorsCMS from "./CorporateSponsorsCMS";
import IndividualSponsorsCMS from "./IndividualSponsorsCMS";
import DonateCMS from "./DonateCMS";
import LinksCMS from "./LinksCMS";
import Message from "./components/Message";
import { isLoggedIn } from "../utils/AuthService";
import Radium from "radium";

const style = {
  textAlign: "center",
  padding: "3% 5%",
  boxSizing: "border-box",
}

const renderIfAuth = (Component, props) => (
  isLoggedIn() ? (
    <Component {...props} />
  ) : (
    <Redirect to="/admin/login"/>
  )
);

class AdminPanel extends Component {
  constructor(){
    super();
    this.state = {message: ""};
    this.updateMessage = this.updateMessage.bind(this);
    this.closeMessage = this.closeMessage.bind(this);
  }
  updateMessage(message){
    this.setState({message});    
    setTimeout(() => { this.setState({message: ""}); }, 8000);
  }
  closeMessage() {
    this.setState({message: ""});
  }
  render() {
    return (
      <div style={style}>
        <h1>Rising Phoenix Content Management</h1>
        {isLoggedIn() && <Options updateMessage={this.updateMessage}/>}
        <Switch>
          <Route exact path="/admin/callback" component={Callback} />
          <Route exact path="/admin/login" render={() => (
            isLoggedIn() ? (
              <Redirect to="/admin/dashboard"/>
            ) : (
              <Login/>
            )
          )}/>
          <Route exact path="/admin/dashboard" render={() => renderIfAuth(Dashboard, {updateMessage: this.updateMessage})} />
          <Route exact path="/admin/home" render={() => renderIfAuth(HomeCMS, {updateMessage: this.updateMessage})} />
          <Route exact path="/admin/about" render={() => renderIfAuth(AboutCMS, {updateMessage: this.updateMessage})} />
          <Route exact path="/admin/committee-members" render={() => renderIfAuth(CommitteeCMS, {updateMessage: this.updateMessage})} />
          <Route exact path="/admin/bylaws" render={() => renderIfAuth(BylawsCMS, {updateMessage: this.updateMessage})} />
          <Route exact path="/admin/calendar" render={() => renderIfAuth(CalendarCMS, {updateMessage: this.updateMessage})} />
          <Route exact path="/admin/corporate-sponsors" render={() => renderIfAuth(CorporateSponsorsCMS, {updateMessage: this.updateMessage})} />
          <Route exact path="/admin/individual-sponsors" render={() => renderIfAuth(IndividualSponsorsCMS, {updateMessage: this.updateMessage})} />
          <Route exact path="/admin/donate" render={() => renderIfAuth(DonateCMS, {updateMessage: this.updateMessage})} />
          <Route exact path="/admin/links" render={() => renderIfAuth(LinksCMS, {updateMessage: this.updateMessage})} />
          <Route path="/admin" render={() => renderIfAuth(Dashboard, {updateMessage: this.updateMessage}) } />
        </Switch>
        {this.state.message && <Message message={this.state.message} closeMessage={this.closeMessage}/>}
      </div>
    );
  }
}
AdminPanel = Radium(AdminPanel);
  
export default AdminPanel;