import React, { Component } from 'react';
import Radium from 'radium';
import Header from '../components/Header';
import style from '../styles/contactStyles';
import headerBackground from '../img/astronomy4.png';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      subject: "",
      message: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleSubmit(e) {

  }

  render() {
    return (
      <main style={style.main}>        
        <form style={style.form}>
          <label htmlFor="name" style={[style.label, style.nameLabel]}>
            Your Name: 
          </label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={this.state.name}
            style={[style.text, style.name]}
            onChange={this.handleChange}
          />

          <label htmlFor="email" style={[style.label, style.emailLabel]}>
            Your Email: <span style={style.required}>(required)</span>
          </label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={this.state.email}
            style={[style.text, style.email]}
            onChange={this.handleChange}
            required
          />

          <label htmlFor="subject" style={[style.label, style.subjectLabel]}>
            Email Subject: 
          </label>
          <input 
            type="text" 
            id="subject" 
            name="subject" 
            value={this.state.subject} 
            style={[style.text, style.subject]}
            onChange={this.handleChange}
          />

          <label htmlFor="message" style={[style.label, style.messageLabel]}>
            Message: <span style={style.required}>(required)</span>
          </label>
          <textarea 
            id="message" 
            name="message" 
            value={this.state.message} 
            style={style.message}
            onChange={this.handleChange}
            required
          />

          <input type="button" value="Send Message" onClick={this.handleSubmit} style={style.submit}/>
        </form>
      </main>
    );
  }
}
Main = Radium(Main);

let HeaderContent = () => {
  return (
    <div style={style.header.outer}>
      <h1 style={style.header.h1}>Contact</h1>
      <div>Questions? Suggestions? Want to get involved? Let us know!</div>
    </div>
  );
}
HeaderContent = Radium(HeaderContent);

class Contact extends Component {
  render() {
    document.title = "Rising Phoenix | Contact";
    return (
      <div>
        <Header 
          bgImage={headerBackground}
          bgAlt="nasa measuring instrument in space"
          rightDiv={<HeaderContent/>}
        />
        <Main />
      </div>
    );
  }
}

export default Contact;