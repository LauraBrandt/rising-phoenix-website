import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { StyleRoot } from 'radium';
import registerServiceWorker from './registerServiceWorker';
import PageRouter from './pages/index';
import Footer from './components/Footer'

ReactDOM.render((
  <StyleRoot>
    <Router>
      <div>
        <PageRouter />
        <Footer />
      </div>
    </Router>
  </StyleRoot>
), document.getElementById('root'));

registerServiceWorker();