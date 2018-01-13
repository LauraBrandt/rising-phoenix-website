import React, { Component } from 'react';
import { setIdToken, setAccessToken } from '../../utils/authService';

class Callback extends Component {
  componentDidMount() {
    setAccessToken();
    setIdToken();
    window.location.href = "/admin/dashboard";
  }

  render() {
    return (
      <div>
        <p>Loading...</p>
        {/* <img src={loading} alt="loading"/> */}
      </div>
    )
  }
}

export default Callback;