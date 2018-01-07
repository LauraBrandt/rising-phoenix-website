import React, {Component} from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Callback from './Callback'
import Options from './Options';
import Login from './Login';
import Dashboard from './Dashboard';
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
          <Route path="/admin" render={() => renderIfAuth(Dashboard) } />
        </Switch>
      </div>
    );
  }
}
AdminPanel = Radium(AdminPanel);
  
export default AdminPanel;