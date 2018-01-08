import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import { StyleRoot } from 'radium';
import MainRouter from './mainRouter';

ReactDOM.render((
  <StyleRoot>
    <Router>
      <MainRouter />     
    </Router>
  </StyleRoot>
), document.getElementById('root'));

registerServiceWorker();