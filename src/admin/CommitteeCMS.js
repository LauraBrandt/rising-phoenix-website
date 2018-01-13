import React, {Component} from 'react';
import generalStyles from '../styles/admin/generalStyles';
import committeeStyles from '../styles/admin/committeeStyles';
import Radium from 'radium';
import { getData, postData, deleteData } from '../utils/apiCalls';

class CommitteeCMS extends Component {
  constructor() {
    super()

    this.state = { 
      // committeeMembers: [],
      committeeMembers: [
        { name: 'John Allen',     affiliation: 'PSRC, Early College HS',                          link: '',                                           _id: "111", index: 0 },
        { name: 'Tim Barry',      affiliation: 'IPS Facilities and Design Committee (Architect)', link: "",                                           _id: "121", index: 1 },
        { name: 'Ken Brandt',     affiliation: 'Robeson Planetarium',                             link: "",                                           _id: "131", index: 2 },
        { name: 'Traci Bullard',  affiliation: 'SERMC',                                           link: 'http://www.navsea.navy.mil/Home/RMC/SERMC/', _id: "141", index: 3 }
      ],
      currentId: "",
      name: "",
      affiliation: "",
      link: "",
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
  }

  getCommitteeMembers() {
    getData('/api/committee-members').then((committeeMembers) => {
      if (committeeMembers.error) {
        this.setState({ error: true });
        this.props.updateMessage(committeeMembers.error);
      } else {
        const newIndex = this.getNextIndex(committeeMembers)
        this.setState({ 
          committeeMembers,
          error: false,
          index: newIndex
        });
      }
    });
  }

  componentDidMount() {
    this.getCommitteeMembers();
  }

  getNextIndex(committeeMembers) {
    if (committeeMembers.length < 1) {
      return 0;
    }
    return Math.max(...committeeMembers.map(member => member.index)) + 1;    
  }

  handleAdd() {
    this.setState({addNewOpen: true})
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleCancel(e) {
    if (window.confirm("Your data will not be saved. Continue?")) {
      const index = this.getNextIndex(this.state.committeeMembers);
      this.setState({
        currentId: "",
        name: "",
        affiliation: "",
        link: "",
        index: index,
        addNewOpen: false,
      });
    } else {
      e.preventDefault();
    }
  }

  handleEdit(e) {
    e.preventDefault();
    const currCommitteeMember = this.state.committeeMembers
      .find((member) => member._id === e.currentTarget.id);

    this.setState({
      currentId: currCommitteeMember._id,
      name: currCommitteeMember.name,
      affiliation: currCommitteeMember.affiliation,
      link: currCommitteeMember.link,
      index: currCommitteeMember.index,
      addNewOpen: true,
    });
  }

  handleDelete(e) {
    e.preventDefault();
    this.setState({currentlyDeleting: true});
    deleteData('/api/committee-members', e.currentTarget.id)
      .then((response) => {
        const message = response.error || response.message;
        this.setState({
          currentlyDeleting: false,
        });
        this.props.updateMessage(message);
        this.getCommitteeMembers();
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({currentlySaving: true});
    const committeeMember = {
      _id: this.state.currentId,
      name: this.state.name,
      affiliation: this.state.affiliation,
      link: this.state.link,
      index: this.state.index
    }
    postData('/api/committee-members', committeeMember)
      .then((response) => {
        const message = response.error || response.message;
        this.setState({
          currentlySaving: false,
          addNewOpen: false,
          currentId: "",
          name: "",
          affiliation: "",
          link: ""
        });
        this.props.updateMessage(message);
        window.scrollTo(0, document.body.scrollHeight);
        this.getCommitteeMembers();
      });
  }

  render() {
    document.title = "Committee Members | Rising Phoenix CMS";
    console.log('index: ', this.state.index)
    return (
      <div>
        <h2>Committee Members</h2>
        {/* {this.state.error ?
          <p>Sorry, something went wrong. Please try again later.</p>
          : */}
          <div>
            {/* button to add new committee member */}
            <div style={generalStyles.addNewButton} onClick={this.handleAdd}>
              <i className="fa fa-plus" aria-hidden="true" style={{marginRight: 20}}></i> Add new
            </div>

            {/* modal to enter new committee member info */}
            {this.state.addNewOpen && 
              <div style={generalStyles.modalContainer}>
                <form 
                  onSubmit={this.state.currentlySaving ? (e) => e.preventDefault() : this.handleSubmit}
                  style={generalStyles.modalContent}
                >
                  <div>
                    <label htmlFor="name" style={[generalStyles.label, committeeStyles.label]}>Name:</label>
                    <input 
                      type="text" 
                      id="name" 
                      value={this.state.name} 
                      style={[generalStyles.inputText, committeeStyles.input]}
                      maxLength={100}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="affiliation" style={[generalStyles.label, committeeStyles.label]}>Affiliation:</label>
                    <input 
                      type="text" 
                      id="affiliation" 
                      value={this.state.affiliation} 
                      style={[generalStyles.inputText, committeeStyles.input]}
                      maxLength={100}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="link" style={[generalStyles.label, committeeStyles.label]}>Link to affiliation website: <span style={{fontSize: '0.9em', fontStyle: 'italic', color: '#666'}}>(optional)</span></label>
                    <input 
                      type="text" 
                      id="link" 
                      value={this.state.link} 
                      style={[generalStyles.inputText, committeeStyles.input]}
                      maxLength={150}
                      onChange={this.handleChange}
                    />
                  </div>
                  <button 
                    type="submit"
                    key="submit" 
                    style={[generalStyles.submitButton, committeeStyles.submit, this.state.currentlySaving && generalStyles.submitButton.disabled]}
                  >
                    Save
                  </button>
                  <button 
                    type="button"
                    key="cancel" 
                    style={[committeeStyles.cancel, this.state.currentlySaving && committeeStyles.cancel.disabled]}
                    onClick={this.handleCancel}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            }

            {/* list of current committee members (still need to do styles, and add edit/delete buttons - don't forget about drag'n'drop! (and index stuff)) */}
            <div>
              {this.state.committeeMembers.map( member => (
                <div key={member._id} style={[generalStyles.card, committeeStyles.card]} id={member._id}>
                  <div style={committeeStyles.rowContainer}>
                    <div style={committeeStyles.cardLabel}>Name:</div>
                    <div style={committeeStyles.cardContent}>{member.name}</div>
                  </div>
                  <div style={committeeStyles.rowContainer}>
                    <div style={committeeStyles.cardLabel}>Affiliation:</div>
                    <div style={committeeStyles.cardContent}>{member.affiliation}</div>
                  </div>
                  {member.link && <div style={committeeStyles.rowContainer}>
                    <div style={committeeStyles.cardLabel}>Link to affiliation website:</div>
                    <div style={committeeStyles.cardContent}><a href={member.link}>{member.link}</a></div>
                  </div>}                  
                  <button 
                    type='button'
                    title="Edit"
                    style={[generalStyles.edit, this.state.currentlyDeleting && generalStyles.edit.disabled]}
                    onClick={this.state.currentlyDeleting ? (e)=> e.preventDefault() : this.handleEdit}
                    id={member._id}
                    key={member.name}
                  >
                    <i className="fa fa-pencil"></i>
                  </button>
                  <button 
                    type='button'
                    title="Delete" 
                    style={[generalStyles.delete, this.state.currentlyDeleting && generalStyles.delete.disabled]}
                    onClick={this.state.currentlyDeleting ? (e)=> e.preventDefault() : this.handleDelete}
                    id={member._id}
                    key={member.index}
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>
        {/* } */}
      </div>
    );
  }
}
CommitteeCMS = Radium(CommitteeCMS);
  
export default CommitteeCMS;