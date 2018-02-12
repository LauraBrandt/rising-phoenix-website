import React, {Component} from "react";
import { arrayMove } from "react-sortable-hoc";
import SortableEventList from "./components/SortableItemList";
import { AddNewButton, SaveButton, CancelButton } from "./components/buttons";
import { TextInput, TextAreaInput } from "./components/inputs";
import * as Datetime from "react-datetime";
import moment from "moment";
import inputStyles from "../styles/admin/inputStyles";
import containerStyles from "../styles/admin/containerStyles";
import Radium from "radium";
import { getData, postData, deleteData, putData } from "../utils/apiCalls";


class CalendarCMS extends Component {
  constructor() {
    super();

    this.state = { 
      events: [],
      id: "",
      name: "",
      dateTime: new Date(),
      location: "",
      description: "",
      minutesLink: "",
      index: "",
      addNewOpen: false,
      currentlySaving: false,
      currentlyDeleting: false,
      error: false,
    };

    this.handleAdd = this.handleAdd.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.getNextIndex = this.getNextIndex.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.onSortEnd = this.onSortEnd.bind(this);
  }

  getEvents() {
    getData("/api/calendar").then((events) => {
      if (events.error) {
        this.setState({ error: true });
        this.props.updateMessage(events.error);
      } else {
        const newIndex = this.getNextIndex(events);
        this.setState({ 
          events,
          error: false,
          index: newIndex
        });
      }
    });
  }

  componentDidMount() {
    this.getEvents();
  }

  getNextIndex(events) {
    if (events.length < 1) {
      return 0;
    }
    return Math.max(...events.map(event => event.index)) + 1;    
  }

  handleAdd() {
    this.setState({addNewOpen: true});
  }

  handleChange(e) {
    if (e.target) { // text input
      this.setState({
        [e.target.id]: e.target.value
      });
    } else { // date input
      if (moment.isMoment(e)) {
        this.setState({
          dateTime: new Date(e)
        });
      } else {
        this.setState({
          dateTime: e
        });
      }
    }
  }

  handleCancel(e) {
    if (window.confirm("Your data will not be saved. Continue?")) {
      const index = this.getNextIndex(this.state.events);
      this.setState({
        id: "",
        name: "",
        dateTime: new Date(),
        location: "",
        description: "",
        minutesLink: "",
        index: index,
        addNewOpen: false,
      });
    } else {
      e.preventDefault();
    }
  }

  handleEdit(e) {
    e.preventDefault();
    const currEvent = this.state.events
      .find((event) => event._id === e.currentTarget.id);

    this.setState({
      id: currEvent._id,
      name: currEvent.name,
      dateTime: currEvent.dateTime,
      location: currEvent.location,
      description: currEvent.description,
      minutesLink: currEvent.minutesLink,
      index: currEvent.index,
      addNewOpen: true,
    });
  }

  handleDelete(e) {
    e.preventDefault();
    const currEvent = this.state.events
      .find((event) => event._id === e.currentTarget.id);
    if (window.confirm(`Are you sure you want to permanently delete the event ${currEvent.name}?`)) {
      this.setState({currentlyDeleting: true});
      deleteData("/api/calendar", e.currentTarget.id)
        .then((response) => {
          const message = response.error || response.message;
          this.setState({
            currentlyDeleting: false,
          });
          this.props.updateMessage(message);
          this.getEvents();
        });
    }
  }

  onSortEnd({oldIndex, newIndex}) {
    const newEvents = arrayMove(this.state.events, oldIndex, newIndex)
      .map((event, index) => {
        event.index = index;
        return event;
      });
    this.setState({
      events: newEvents,
      currentlySaving: true
    });

    putData("/api/calendar", newEvents)
      .then((response) => {
        const message = response.error || response.message;
        this.setState({
          currentlySaving: false
        });
        this.props.updateMessage(message);
        this.getEvents();
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.name || !this.state.dateTime) {
      this.props.updateMessage("Required fields must be completed.");
      return;
    }
    this.setState({currentlySaving: true});
    const event = {
      _id: this.state.id,
      name: this.state.name,
      dateTime: this.state.dateTime,
      location: this.state.location,
      description: this.state.description,
      minutesLink: this.state.minutesLink,
      index: this.state.index
    };
    postData("/api/calendar", event)
      .then((response) => {
        const message = response.error || response.message;
        this.setState({
          currentlySaving: false,
          addNewOpen: false,
          id: "",
          name: "",
          dateTime: new Date(),
          location: "",
          description: "",
          minutesLink: ""
        });
        this.props.updateMessage(message);
        this.getEvents();
      });
  }

  render() {
    document.title = "Calendar | Rising Phoenix CMS";

    return (
      <div>
        <h2>Calendar</h2>
        {this.state.error ?
          <p>Sorry, something went wrong. Please try again later.</p>
          :
          <div>
            <AddNewButton handleAdd={this.handleAdd} />

            {/* modal to enter new event info */}
            {this.state.addNewOpen && 
              <div style={containerStyles.modalContainer}>
                <form 
                  onSubmit={this.state.currentlySaving ? (e) => e.preventDefault() : this.handleSubmit}
                  style={containerStyles.modalContent}
                >
                  <p style={{fontSize: "0.9em", color: "#777", marginTop: 0}}>Fields marked with a * are required.</p>
                  <TextInput 
                    id="name"
                    label="Name of Event:"
                    value={this.state.name}
                    handleChange={this.handleChange}
                    maxLength={100}
                    modal={true}
                    required={true}
                  />
                  <div>
                    <label htmlFor="dateTime" style={[inputStyles.label, inputStyles.modal.label]}>Date and Time: <span>*</span></label>
                    <Datetime 
                      id="dateTime"
                      value={this.state.dateTime}
                      onChange={this.handleChange}
                      inputProps={{style: {...inputStyles.inputText, ...inputStyles.modal.input}, required: true}}
                    />
                  </div>
                  <TextInput 
                    id="location"
                    label="Location:"
                    value={this.state.location}
                    handleChange={this.handleChange}
                    maxLength={100}
                    modal={true}
                  />
                  <TextAreaInput 
                    id="description"
                    label="Description:"
                    value={this.state.description}
                    handleChange={this.handleChange}
                    maxLength={500}
                    modal={true}
                    inputStyle={{height: 100}}
                  />
                  <TextInput 
                    id="minutesLink"
                    label="Link to minutes:"
                    type="url" 
                    value={this.state.minutesLink}
                    handleChange={this.handleChange}
                    maxLength={150}
                    modal={true}
                  />

                  <SaveButton currentlySaving={this.state.currentlySaving} modal={true} />
                  <CancelButton currentlySaving={this.state.currentlySaving} handleCancel={this.handleCancel} />

                </form>
              </div>
            }

            {/* list of current committee members */}
            <div style={containerStyles.listContainer}>
              <SortableEventList 
                itemList={this.state.events} 
                itemType="event"
                onSortEnd={this.onSortEnd} 
                currentlyDeleting={this.state.currentlyDeleting}
                handleEdit={this.handleEdit}
                handleDelete={this.handleDelete}
                lockAxis="y"
                distance={10}
                useDragHandle={true}
                lockToContainerEdges={true}
                disabled={this.state.currentlySaving}
                fieldList={(event) => 
                  [
                    {label: "Name:", content: event.name},
                    {label: "Date:", content: event.dateTime ? moment(event.dateTime).format("M/D/YY H:mm a") : ""},
                    {label: "Location:", content: event.location},
                    {label: "Description:", content: event.description},
                    {label: "Link to minutes:", content: event.minutesLink ? `<a href=${event.minutesLink}>${event.minutesLink}</a>` : ""}
                  ]
                }
              />
            </div>
          </div>
        }
      </div>
    );
  }
}
CalendarCMS = Radium(CalendarCMS);
  
export default CalendarCMS;