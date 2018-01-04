import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import { StyleRoot } from 'radium';
import PageRouter from './pageRouter';
import Footer from './components/Footer';

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