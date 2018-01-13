import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { logout, sendResetPasswordRequest } from '../../utils/authService';
import optionsStyles from '../../styles/admin/optionsStyles';
import Radium from 'radium';

class Options extends Component {
  constructor() {
    super();
    this.state = {
      menuShowing: false,
      passwordButtonDisabled: false
    }
    this.toggleMenu = this.toggleMenu.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.handleResetPassword = this.handleResetPassword.bind(this);
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
    this.setState({passwordButtonDisabled: true})
    sendResetPasswordRequest((res) => {
      this.setState({passwordButtonDisabled: false})
      this.props.updateMessage(res);
    } );
  }

  render() {
    return (
      <div style={optionsStyles}>
        <div style={optionsStyles.back}>
          <Link to="/admin" style={optionsStyles.back.Link}><i className="fa fa-bars" aria-hidden="true"></i></Link>
        </div>
        <div style={optionsStyles.menu}>
          <div type='button' style={optionsStyles.button} onClick={this.toggleMenu}>
            <i className="fa fa-cog" aria-hidden="true" style={{marginRight: 5}}></i>
            <i className="fa fa-caret-down" aria-hidden="true"></i>
          </div>
          { this.state.menuShowing && <div style={optionsStyles.dropDown}>
            <div 
              key='pwReset'
              onClick={this.state.passwordButtonDisabled ? ()=>{} : this.handleResetPassword}
              style={[optionsStyles.dropDown.menuItem, 
                      this.state.passwordButtonDisabled && optionsStyles.dropDown.menuItemDisabled
                    ]}
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
      </div>
    );
  }
}
Options = Radium(Options);
  
export default Options;