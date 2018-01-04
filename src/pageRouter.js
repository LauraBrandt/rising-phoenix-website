import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import CommitteeMembers from './pages/CommitteeMembers';
import Calendar from './pages/Calendar';
import CorporateSponsors from './pages/CorporateSponsors';
import IndividualSponsors from './pages/IndividualSponsors';
import Donate from './pages/Donate';
import Contact from './pages/Contact';
import News from './pages/News';
import NotFound from './pages/NotFound';
import AdminPanel from './admin/AdminPanel';

const PageRouter = () => {
  return (
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/about' component={About}/>
      <Route exact path='/committee-members' component={CommitteeMembers}/>
      <Route exact path='/calendar' component={Calendar}/>
      <Route exact path='/corporate-sponsors' component={CorporateSponsors}/>
      <Route exact path='/individual-sponsors' component={IndividualSponsors}/>
      <Route exact path='/donate' component={Donate}/>
      <Route exact path='/contact' component={Contact}/>
      <Route path='/news' component={News}/>
      <Route path='/admin' component={AdminPanel}/>
      <Route component={NotFound}/>
    </Switch>
  );
}

export default PageRouter;