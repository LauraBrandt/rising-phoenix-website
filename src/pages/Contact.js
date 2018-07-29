import React, { Component } from "react";
import Radium from "radium";
import Header from "../components/Header";
import style from "../styles/contactStyles";
import { postData } from "../utils/apiCalls";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      subject: "",
      message: "",
      statusMessage: ""
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
    e.preventDefault();

    const data = {
      name: this.state.name,
      email: this.state.email,
      subject: this.state.subject,
      message: this.state.message
    };

    postData("/api/contact", data)
      .then(response => {
        const message = response.error || response.message;
        this.setState({
          statusMessage: message
        });
        window.scrollTo(0, 0);
      });
  }

  render() {
    return (
      <main style={style.main}>  
        {this.state.statusMessage && <div style={style.statusMessage}>{this.state.statusMessage}</div>}      
        <form style={style.form} id="contact-form" method="post" action="/api/contact" onSubmit={this.handleSubmit}>
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
            maxLength={70}
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
            maxLength={254}
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
            maxLength={130}
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

          <input type="submit" value="Send Message" style={style.submit}/>
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
};
HeaderContent = Radium(HeaderContent);

class Contact extends Component {
  render() {
    document.title = "Rising Phoenix | Contact";
    return (
      <div>
        <Header 
          bgImage="https://s3.us-east-2.amazonaws.com/risingphoenix/static/astronomy4.min.jpg"
          bgAlt="nasa measuring instrument in space"
          contentDiv={<HeaderContent/>}
        />
        <Main />
      </div>
    );
  }
}

export default Contact;