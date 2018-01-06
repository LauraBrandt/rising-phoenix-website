import { Component } from 'react';
import { setIdToken, setAccessToken } from '../utils/AuthService';

class Callback extends Component {
  componentDidMount() {
    setAccessToken();
    setIdToken();
    window.location.href = "/admin/dashboard";
  }

  render() {
    return null;
  }
}

export default Callback;