import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Login';

const AdminPanel = () => (
  <Switch>
    <Route exact path='/admin' component={Login}/>
    <Route path='/admin/login' component={Login}/>
  </Switch>
)
  
export default AdminPanel;