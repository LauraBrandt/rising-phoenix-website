import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Home from './Home';
import About from './About';
import CommitteeMembers from './CommitteeMembers';
import Calendar from './Calendar';
import CorporateSponsors from './CorporateSponsors';
import IndividualSponsors from './IndividualSponsors';
import Donate from './Donate';
import Contact from './Contact';
import News from './News';
import NotFound from './NotFound';

const PageRouter = () => {
  return (
    <div>
      <Navbar />
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
        <Route component={NotFound}/>
      </Switch>
      <Footer />
    </div>
  );
}

export default PageRouter;