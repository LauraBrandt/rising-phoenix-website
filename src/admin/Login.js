import React from "react";
import Radium from "radium";
import generalStyles from "../styles/admin/generalStyles";
import { login } from "../utils/authService";

let Login = () => {
  document.title = "Login | Rising Phoenix CMS";
  return (
    <div style={generalStyles.login}>
      <div style={generalStyles.login.text}>You must be authorized to enter.</div>
      <button 
        style={[generalStyles.submitButton, {width: "100%"}]}
        onClick={() => login()}
      >
        Log In
      </button>
    </div>
  );
};
Login = Radium(Login);
  
export default Login;