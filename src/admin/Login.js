import React from 'react';
import Radium from 'radium';
import generalStyles from '../styles/admin/generalStyles';
import { login } from '../utils/AuthService';

let Login = () => {
  document.title = "Login | Rising Phoenix CMS";
    
  return (
    <div>
      <div>You must be authorized to enter.</div>
      <button 
        style={generalStyles.submitButton}
        onClick={() => login()}
      >
        Log In
      </button>
    </div>
  );
}
Login = Radium(Login);
  
export default Login;