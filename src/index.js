import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import { StyleRoot } from 'radium';
import PageRouter from './pageRouter';

ReactDOM.render((
  <StyleRoot>
    <Router>
      <PageRouter />     
    </Router>
  </StyleRoot>
), document.getElementById('root'));

registerServiceWorker();