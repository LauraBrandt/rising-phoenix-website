import React, {Component} from "react";
import { arrayMove, SortableContainer } from "react-sortable-hoc";
import SortableCommitteeMember from "./components/SortableItem";
import generalStyles from "../styles/admin/generalStyles";
import Radium from "radium";
import { getData, postData, deleteData, putData } from "../utils/apiCalls";


const SortableMemberList = SortableContainer(({memberList, currentlyDeleting, handleEdit, handleDelete, disabled}) => {
  return (
    <div>
      {memberList.map((member, index) => (
        <SortableCommitteeMember 
          item={member} 
          key={`member-${member._id}`}
          index={index}
          currentlyDeleting={currentlyDeleting}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          disabled={disabled}
          fieldList={[
            {label: "Name:", content: member.name},
            {label: "Affiliation:", content: member.affiliation},
            {label: "Link to affiliation:", content: member.link ? `<a href=${member.link}>${member.link}</a>` : ""}
          ]}
        />
      ))}
    </div>
  );
});


class CommitteeCMS extends Component {
  constructor() {
    super();

    this.state = { 
      // committeeMembers: [{name: "John Allen", affiliation: "PSRC, Early College HS", _id: 123}, {name: "Traci Bullard", affiliation: "SERMC", link: "http://www.navsea.navy.mil/Home/RMC/SERMC/", id: 456}],
      committeeMembers: [],
      id: "",
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
    this.onSortEnd = this.onSortEnd.bind(this);
  }

  getCommitteeMembers() {
    getData("/api/committee-members").then((committeeMembers) => {
      if (committeeMembers.error) {
        this.setState({ error: true });
        this.props.updateMessage(committeeMembers.error);
      } else {
        const newIndex = this.getNextIndex(committeeMembers);
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
    this.setState({addNewOpen: true});
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleCancel(e) {
    if (window.confirm("Your data will not be saved. Continue?")) {
      const index = this.getNextIndex(this.state.committeeMembers);
      this.setState({
        id: "",
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
      id: currCommitteeMember._id,
      name: currCommitteeMember.name,
      affiliation: currCommitteeMember.affiliation,
      link: currCommitteeMember.link,
      index: currCommitteeMember.index,
      addNewOpen: true,
    });
  }

  handleDelete(e) {
    e.preventDefault();
    const currMember = this.state.committeeMembers
      .find((member) => member._id === e.currentTarget.id);
    if (window.confirm(`Are you sure you want to permanently delete the committee member ${currMember.name}?`)) {
      this.setState({currentlyDeleting: true});
      deleteData("/api/committee-members", e.currentTarget.id)
        .then((response) => {
          const message = response.error || response.message;
          this.setState({
            currentlyDeleting: false,
          });
          this.props.updateMessage(message);
          this.getCommitteeMembers();
        });
    }
  }

  onSortEnd({oldIndex, newIndex}) {
    const NewCommitteeMembers = arrayMove(this.state.committeeMembers, oldIndex, newIndex)
      .map((member, index) => {
        member.index = index;
        return member;
      });
    this.setState({
      committeeMembers: NewCommitteeMembers,
      currentlySaving: true
    });

    putData("/api/committee-members", NewCommitteeMembers)
      .then((response) => {
        const message = response.error || response.message;
        this.setState({
          currentlySaving: false
        });
        this.props.updateMessage(message);
        this.getCommitteeMembers();
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({currentlySaving: true});
    const committeeMember = {
      _id: this.state.id,
      name: this.state.name,
      affiliation: this.state.affiliation,
      link: this.state.link,
      index: this.state.index
    };
    postData("/api/committee-members", committeeMember)
      .then((response) => {
        const message = response.error || response.message;
        this.setState({
          currentlySaving: false,
          addNewOpen: false,
          id: "",
          name: "",
          affiliation: "",
          link: ""
        });
        this.props.updateMessage(message);
        this.getCommitteeMembers();
      });
  }

  render() {
    document.title = "Committee Members | Rising Phoenix CMS";

    return (
      <div>
        <h2>Committee Members</h2>
        {this.state.error ?
          <p>Sorry, something went wrong. Please try again later.</p>
          :
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
                    <label htmlFor="name" style={[generalStyles.label, generalStyles.modalContent.label, {width: 220 }]}>Name:</label>
                    <input 
                      type="text" 
                      id="name" 
                      value={this.state.name} 
                      style={[generalStyles.inputText, generalStyles.modalContent.input, {width: 330 }]}
                      maxLength={100}
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="affiliation" style={[generalStyles.label, generalStyles.modalContent.label, {width: 220 }]}>Affiliation:</label>
                    <input 
                      type="text" 
                      id="affiliation" 
                      value={this.state.affiliation} 
                      style={[generalStyles.inputText, generalStyles.modalContent.input, {width: 330 }]}
                      maxLength={100}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="link" style={[generalStyles.label, generalStyles.modalContent.label, {width: 220 }]}>Link to affiliation website: <span style={{fontSize: "0.9em", fontStyle: "italic", color: "#666"}}>(optional)</span></label>
                    <input 
                      type="url" 
                      id="link" 
                      value={this.state.link} 
                      style={[generalStyles.inputText, generalStyles.modalContent.input, {width: 330 }]}
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
              <SortableMemberList 
                memberList={this.state.committeeMembers} 
                onSortEnd={this.onSortEnd} 
                currentlyDeleting={this.state.currentlyDeleting}
                handleEdit={this.handleEdit}
                handleDelete={this.handleDelete}
                lockAxis="y"
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
CommitteeCMS = Radium(CommitteeCMS);
  
export default CommitteeCMS;