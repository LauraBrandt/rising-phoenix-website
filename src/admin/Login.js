import React from "react";
import Radium from "radium";
import loginStyles from "../styles/admin/loginStyles";
import { login } from "../utils/authService";

let Login = () => {
  document.title = "Login | Rising Phoenix CMS";
  return (
    <div style={loginStyles}>
      <div style={loginStyles.text}>You must be authorized to enter.</div>
      <button 
        style={loginStyles.submit}
        onClick={() => login()}
      >
        Log In
      </button>
    </div>
  );
};
Login = Radium(Login);
  
export default Login;