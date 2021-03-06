import React, { Component } from "react";
import Radium from "radium";
import Header from "../components/Header";
import style from "../styles/calendarStyles";
import { getData } from "../utils/apiCalls";

class Main extends Component {
  constructor() {
    super();
    this.state = { events: [] };
    this.getEvents = this.getEvents.bind(this);
  }

  getEvents() {
    getData("/api/calendar").then((events) => {
      if (events.length) {
        events = events.map(event => {
          event.dateTime = new Date(event.dateTime);
          return event;
        });
        this.setState({ events });
      }
    });
  }

  componentDidMount() {
    this.getEvents();
  }

  render() {
    const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return (
      <main style={style.main}>
        <article>
          {this.state.events.length ? 
            this.state.events.map(event => 
              <div key={event.name} style={style.event}>
                <div style={style.calendarPage}>
                  <div style={style.calendarPage.month}>{months[event.dateTime.getMonth()].substr(0,3).toUpperCase()}</div>
                  <div style={style.calendarPage.date}>{event.dateTime.getDate()}</div>
                  <div style={style.calendarPage.time}>
                    {event.dateTime.getHours() > 12 ?
                      `${event.dateTime.toTimeString().substr(0,5).replace(/\d{2}/, (h) => { return h-12; })} PM` :
                      `${event.dateTime.toTimeString().substr(0,5)} AM`
                    }
                  </div>  
                </div>
                <div style={style.eventInfo}>
                  <div style={style.eventInfo.name}>{event.name}{event.minutesLink && <span style={style.eventInfo.minutes}>(<a href={event.minutesLink} style={style.eventInfo.minutesLink}>minutes</a>)</span>}</div>
                  <div style={style.eventInfo.datetime}>{weekdays[event.dateTime.getDay()]}, {months[event.dateTime.getMonth()]} {event.dateTime.getDate()}, {event.dateTime.getFullYear()} at {event.dateTime.getHours() > 12 ?
                    `${event.dateTime.toTimeString().substr(0,5).replace(/\d{2}/, (h) => { return h-12; })} PM` :
                    `${event.dateTime.toTimeString().substr(0,5)} AM`
                  }</div>
                  {event.location && <div style={style.eventInfo.location}>{event.location}</div>}
                  {event.description && <div style={[style.eventInfo.description, {whiteSpace: "pre-wrap"}]}>{event.description}</div>}
                </div>
              </div>
            )
            :
            <div style={[style.eventInfo, {padding: "1.5em 3em", fontSize: "1.1em"}]}>There are no upcoming events at the moment. Check back soon!</div>
          }          
        </article>
      </main>
    );
  }
}
Main = Radium(Main);

class HeaderContent extends Component {
  constructor() {
    super();
    this.state = {
      email: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({
      email: e.target.value
    });
  }
  render() {
    return (
      <div style={style.header.outer}>
        <h1 style={style.header.h1}>Upcoming Events</h1>
        <div>
          <div style={style.header.cta}>Make sure you don't miss anything.</div>
          <input 
            type="email" 
            value={this.state.email} 
            placeholder="Email"
            onChange={this.handleChange} 
            style={style.header.input}/>
          <button type="button" style={style.header.submit}>Subscribe</button>
        </div>
      </div>
    );
  }  
}
HeaderContent = Radium(HeaderContent);

class Calendar extends Component {
  render() {
    document.title = "Rising Phoenix | Calendar";
    return (
      <div>
        <Header 
          bgImage="https://s3.us-east-2.amazonaws.com/risingphoenix/static/astronomy6.min.jpg"
          bgAlt="telescope pointing out a glass wall towards a sunset sky"
          contentDiv={<HeaderContent/>}
        />
        <Main />
      </div>
    );
  }
}

export default Calendar;