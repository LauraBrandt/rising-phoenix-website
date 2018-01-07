import React, {Component} from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Callback from './Callback'
import Options from './Options';
import Login from './Login';
import Dashboard from './Dashboard';
import HomeCMS from './HomeCMS';
import AboutCMS from './AboutCMS';
import CommitteeCMS from './CommitteeCMS';
import CalendarCMS from './CalendarCMS';
import CorporateSponsorsCMS from './CorporateSponsorsCMS';
import IndividualSponsorsCMS from './IndividualSponsorsCMS';
import DonateCMS from './DonateCMS';
import LinksCMS from './LinksCMS';


import { isLoggedIn } from '../utils/AuthService';
import generalStyles from '../styles/admin/generalStyles';
import Radium from 'radium';

const renderIfAuth = (Component) => (
    isLoggedIn() ? (
      <Component />
    ) : (
      <Redirect to="/admin/login"/>
    )
  );

class AdminPanel extends Component {
  render() {
    return (
      <div style={generalStyles.adminPanel}>
        <h1>Rising Phoenix Content Management</h1>
        {isLoggedIn() && <Options />}
        <Switch>
          <Route exact path="/admin/callback" component={Callback} />
          <Route exact path="/admin/login" render={() => (
            isLoggedIn() ? (
              <Redirect to="/admin/dashboard"/>
            ) : (
              <Login/>
            )
          )}/>
          <Route exact path="/admin/dashboard" render={() => renderIfAuth(Dashboard)} />
          <Route exact path="/admin/home" render={() => renderIfAuth(HomeCMS)} />
          <Route exact path="/admin/about" render={() => renderIfAuth(AboutCMS)} />
          <Route exact path="/admin/committee" render={() => renderIfAuth(CommitteeCMS)} />
          <Route exact path="/admin/calendar" render={() => renderIfAuth(CalendarCMS)} />
          <Route exact path="/admin/corporate-sponsors" render={() => renderIfAuth(CorporateSponsorsCMS)} />
          <Route exact path="/admin/individual-sponsors" render={() => renderIfAuth(IndividualSponsorsCMS)} />
          <Route exact path="/admin/donate" render={() => renderIfAuth(DonateCMS)} />
          <Route exact path="/admin/links" render={() => renderIfAuth(LinksCMS)} />
          <Route path="/admin" render={() => renderIfAuth(Dashboard) } />
        </Switch>
      </div>
    );
  }
}
AdminPanel = Radium(AdminPanel);
  
export default AdminPanel;