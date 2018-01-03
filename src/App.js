import { BrowserRouter as Router } from 'react-router-dom';
import { StyleRoot } from 'radium';
import PageRouter from './pages/index';
import Footer from './components/Footer'

const App = (
  <StyleRoot>
    <Router>
      <div>
        <PageRouter />
        <Footer />
      </div>
    </Router>
  </StyleRoot>
);

export default App;
