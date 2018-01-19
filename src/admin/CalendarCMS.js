import React, {Component} from 'react';
import { arrayMove, SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import * as Datetime from 'react-datetime';
import moment from 'moment';
import generalStyles from '../styles/admin/generalStyles';
import '../styles/admin/externalComponentStyles.css';
import '../styles/admin/react-datetime.css';
import Radium from 'radium';
import { getData, postData, deleteData, putData } from '../utils/apiCalls';


const DragHandle = SortableHandle(() => 
  <div style={generalStyles.dragHandle}>
    <div>
      <i className="fa fa-ellipsis-v" style={{marginRight: 3}}></i>
      <i className="fa fa-ellipsis-v"></i>
    </div>
    <div>
      <i className="fa fa-ellipsis-v" style={{marginRight: 3}}></i>
      <i className="fa fa-ellipsis-v"></i>
    </div>
  </div>
);

const SortableEvent = SortableElement(({event, currentlyDeleting, handleEdit, handleDelete}) =>
  <div 
    className='card'
    id={event._id} 
    key={`sortable-element-${event._id}`}
  >
    <DragHandle />
    <div className='row-container'>
      <div className='card-label'>Name:</div>
      <div className='card-content'>{event.name}</div>
    </div>
    <div className='row-container'>
      <div className='card-label'>Date:</div>
      <div className='card-content'>{moment(event.dateTime).format("M/D/YY H:mm a")}</div>
    </div>
    {event.location && <div className='row-container'>
      <div className='card-label'>Location:</div>
      <div className='card-content'>{event.location}</div>
    </div>}
    {event.description && <div className='row-container'>
      <div className='card-label'>Description:</div>
      <div className='card-content pre-wrap'>{event.description}</div>
    </div>}
    {event.minutesLink && <div className='row-container'>
      <div className='card-label'>Link to minutes:</div>
      <div className='card-content'><a href={event.minutesLink}>{event.minutesLink}</a></div>
    </div>}
    <button 
      type='button'
      title="Edit"
      className={`edit ${currentlyDeleting ? 'edit-disabled' : ''}`}
      onClick={currentlyDeleting ? (e)=> e.preventDefault() : handleEdit}
      id={event._id}
      key={`edit-${event._id}`}
    >
      <i className="fa fa-pencil"></i>
    </button>
    <button 
      type='button'
      title="Delete" 
      className={`delete ${currentlyDeleting ? 'delete-disabled' : ''}`}
      onClick={currentlyDeleting ? (e)=> e.preventDefault() : handleDelete}
      id={event._id}
      key={`delete-${event._id}`}
    >
      <i className="fa fa-trash"></i>
    </button>
  </div>
);

const SortableEventList = SortableContainer(({eventList, currentlyDeleting, handleEdit, handleDelete, disabled}) => {
  return (
    <div>
      {eventList.map((event, index) => (
        <SortableEvent 
          event={event} 
          key={`event-${event._id}`}
          index={index}
          currentlyDeleting={currentlyDeleting}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          disabled={disabled}
        />
      ))}
    </div>
  );
});


class CalendarCMS extends Component {
  constructor() {
    super()

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
    getData('/api/calendar').then((events) => {
      if (events.error) {
        this.setState({ error: true });
        this.props.updateMessage(events.error);
      } else {
        const newIndex = this.getNextIndex(events)
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
    this.setState({addNewOpen: true})
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
      deleteData('/api/calendar', e.currentTarget.id)
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

  onSortEnd = ({oldIndex, newIndex}) => {
    const newEvents = arrayMove(this.state.events, oldIndex, newIndex)
      .map((event, index) => {
        event.index = index
        return event;
      });
    this.setState({
      events: newEvents,
      currentlySaving: true
    });

    putData('/api/calendar', newEvents)
      .then((response) => {
        this.setState({
          currentlySaving: false
        });
        this.getEvents();
      });
  };

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.name || !this.state.dateTime) {
      this.props.updateMessage('Required fields must be completed.');
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
    }
    postData('/api/calendar', event)
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
            {/* button to add new event */}
            <div style={generalStyles.addNewButton} onClick={this.handleAdd}>
              <i className="fa fa-plus" aria-hidden="true" style={{marginRight: 20}}></i> Add new
            </div>

            {/* modal to enter new event info */}
            {this.state.addNewOpen && 
              <div style={generalStyles.modalContainer}>
                <form 
                  onSubmit={this.state.currentlySaving ? (e) => e.preventDefault() : this.handleSubmit}
                  style={generalStyles.modalContent}
                >
                  <p style={{fontSize: '0.9em', color: '#777', marginTop: 0}}>Fields marked with a * are required.</p>
                  <div>
                    <label htmlFor="name" style={[generalStyles.label, generalStyles.modalContent.label]}>Name of Event <span>*</span> :</label>
                    <input 
                      type="text" 
                      id="name" 
                      value={this.state.name} 
                      style={[generalStyles.inputText, generalStyles.modalContent.input]}
                      maxLength={100}
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="dateTime" style={[generalStyles.label, generalStyles.modalContent.label]}>Date and Time <span>*</span> :</label>
                    <Datetime 
                      id="dateTime"
                      value={this.state.dateTime}
                      onChange={this.handleChange}
                      inputProps={{style: {...generalStyles.inputText, ...generalStyles.modalContent.input}, required: true}}
                    />
                  </div>
                  <div>
                    <label htmlFor="location" style={[generalStyles.label, generalStyles.modalContent.label]}>Location:</label>
                    <input 
                      type="text" 
                      id="location" 
                      value={this.state.location} 
                      style={[generalStyles.inputText, generalStyles.modalContent.input]}
                      maxLength={100}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="description" style={[generalStyles.label, generalStyles.modalContent.label, generalStyles.textareaLabel]}>Description:</label>
                    <textarea 
                      id="description" 
                      value={this.state.description} 
                      style={[generalStyles.inputText, generalStyles.modalContent.input, {height: 100}]}
                      maxLength={500}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="minutesLink" style={[generalStyles.label, generalStyles.modalContent.label]}>Link to minutes:</label>
                    <input 
                      type="url" 
                      id="minutesLink" 
                      value={this.state.minutesLink} 
                      style={[generalStyles.inputText, generalStyles.modalContent.input]}
                      maxLength={150}
                      onChange={this.handleChange}
                    />
                  </div>
                  <button 
                    type="submit"
                    key="submit" 
                    style={[generalStyles.submitButton, generalStyles.modalContent.submit, this.state.currentlySaving && generalStyles.submitButton.disabled]}
                  >
                    Save
                  </button>
                  <button 
                    type="button"
                    key="cancel" 
                    style={[generalStyles.modalContent.cancel, this.state.currentlySaving && generalStyles.modalContent.cancel.disabled]}
                    onClick={this.handleCancel}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            }

            {/* list of current committee members */}
            <div style={generalStyles.listContainer}>
              <SortableEventList 
                eventList={this.state.events} 
                onSortEnd={this.onSortEnd} 
                currentlyDeleting={this.state.currentlyDeleting}
                handleEdit={this.handleEdit}
                handleDelete={this.handleDelete}
                lockAxis='y'
                distance={10}
                useDragHandle={true}
                lockToContainerEdges={true}
                disabled={this.state.currentlySaving}
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