import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { logout, sendResetPasswordRequest } from '../utils/AuthService';
import optionsStyles from '../styles/admin/optionsStyles';
import Radium from 'radium';

class Options extends Component {
  constructor() {
    super();
    this.state = {
      menuShowing: false,
      pwResetMessage: "",
    }
    this.toggleMenu = this.toggleMenu.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.handleResetPassword = this.handleResetPassword.bind(this);
    this.closeMessage = this.closeMessage.bind(this);
  }

  toggleMenu() {
    if (!this.state.menuShowing) {
      document.addEventListener('click', this.handleOutsideClick, false);
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false);
    }

    const currShowing = this.state.menuShowing
    this.setState({menuShowing: !currShowing})
  }

  handleOutsideClick(e) {
    // ignore clicks on the component itself
    if(!ReactDOM.findDOMNode(this).contains(e.target)) {
      this.toggleMenu();
    }    
  }

  handleResetPassword() {
    sendResetPasswordRequest((res) => { this.setState({pwResetMessage: res}) } );
  }

  closeMessage() {
    this.setState({pwResetMessage: ""})
  }

  render() {
    return (
      <div style={optionsStyles}>
        <div style={optionsStyles.back}>
          <Link to="/admin" style={optionsStyles.back.Link}><i class="fa fa-bars" aria-hidden="true"></i></Link>
        </div>
        <div style={optionsStyles.menu}>
          <div type='button' style={optionsStyles.button} onClick={this.toggleMenu}>
            <i className="fa fa-cog" aria-hidden="true" style={{marginRight: 5}}></i>
            <i className="fa fa-caret-down" aria-hidden="true"></i>
          </div>
          { this.state.menuShowing && <div style={optionsStyles.dropDown}>
            <div 
              key='pwReset'
              onClick={this.handleResetPassword}
              style={optionsStyles.dropDown.menuItem}
            >
              Change password
            </div>
            <hr style={{margin: 0}}/>
            <div 
              key='logout'
              onClick={() => logout()}
              style={optionsStyles.dropDown.menuItem}
            >
              Log out
            </div>
          </div> }
        </div>
        {this.state.pwResetMessage && <div style={optionsStyles.message}>
          {this.state.pwResetMessage}
          <i 
            className="fa fa-times" 
            aria-hidden="true" 
            style={optionsStyles.message.icon}
            onClick={this.closeMessage}
          ></i>
        </div>}
      </div>
    );
  }
}
Options = Radium(Options);
  
export default Options;