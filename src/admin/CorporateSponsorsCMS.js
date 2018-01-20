import React, {Component} from 'react';
import { arrayMove, SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import generalStyles from '../styles/admin/generalStyles';
import '../styles/admin/externalComponentStyles.css';
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

const SortableSponsor = SortableElement(({sponsor, currentlyDeleting, handleEdit, handleDelete}) =>
  <div 
    className='card'
    id={sponsor._id} 
    key={`sortable-element-${sponsor._id}`}
  >
    <DragHandle />
    <div className='row-container'>
      <div className='card-label'>Name:</div>
      <div className='card-content'>{sponsor.name}</div>
    </div>
    {sponsor.link && <div className='row-container'>
      <div className='card-label'>Website:</div>
      <div className='card-content'><a href={sponsor.link}>{sponsor.link}</a></div>
    </div>}
    {sponsor.logo && <div className='row-container'>
      <div className='card-label'>Logo:</div>
      <div className='card-content'>
        <img class='card-img' src={`https://s3.us-east-2.amazonaws.com/risingphoenix/${sponsor.logo}`} alt={`${sponsor.name} logo`}/>
      </div>
    </div>}
    <button 
      type='button'
      title="Edit"
      className={`edit ${currentlyDeleting ? 'edit-disabled' : ''}`}
      onClick={currentlyDeleting ? (e)=> e.preventDefault() : handleEdit}
      id={sponsor._id}
      key={`edit-${sponsor._id}`}
    >
      <i className="fa fa-pencil"></i>
    </button>
    <button 
      type='button'
      title="Delete" 
      className={`delete ${currentlyDeleting ? 'delete-disabled' : ''}`}
      onClick={currentlyDeleting ? (e)=> e.preventDefault() : handleDelete}
      id={sponsor._id}
      key={`delete-${sponsor._id}`}
    >
      <i className="fa fa-trash"></i>
    </button>
  </div>
);

const SortableSponsorList = SortableContainer(({sponsorList, currentlyDeleting, handleEdit, handleDelete, disabled}) => {
  return (
    <div>
      {sponsorList.map((sponsor, index) => (
        <SortableSponsor 
          sponsor={sponsor} 
          key={`sponsor-${sponsor._id}`}
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

class CorporateSponsorsCMS extends Component {
  constructor() {
    super()

    this.state = { 
      sponsors: [],
      id: "",
      name: "",
      link: "",
      logo: "",
      logoPath: "",
      logoFile: "",
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

  getSponsors() {
    getData('/api/corporate-sponsors').then((sponsors) => {
      if (sponsors.error) {
        this.setState({ error: true });
        this.props.updateMessage(sponsors.error);
      } else {
        const newIndex = this.getNextIndex(sponsors)
        this.setState({ 
          sponsors,
          error: false,
          index: newIndex
        });
      }
    });
  }

  componentDidMount() {
    this.getSponsors();
  }

  getNextIndex(sponsors) {
    if (sponsors.length < 1) {
      return 0;
    }
    return Math.max(...sponsors.map(sponsor => sponsor.index)) + 1;    
  }

  handleAdd() {
    this.setState({addNewOpen: true})
  }

  handleChange(e) {
    if (e.target.id === "logo") {
      this.setState({
        logoPath: e.target.value,
        logoFile: e.target.files[0],
        logo: ""
      });
    } else {
      this.setState({
        [e.target.id]: e.target.value
      });
    }
  }

  handleCancel(e) {
    if (window.confirm("Your data will not be saved. Continue?")) {
      const index = this.getNextIndex(this.state.sponsors);
      this.setState({
        id: "",
        name: "",
        link: "",
        logo: "",
        logoPath: "",
        logoFile: "",
        index: index,
        addNewOpen: false,
      });
    } else {
      e.preventDefault();
    }
  }

  handleEdit(e) {
    e.preventDefault();
    const currSponsor = this.state.sponsors
      .find((sponsor) => sponsor._id === e.currentTarget.id);

    this.setState({
      id: currSponsor._id,
      name: currSponsor.name,
      link: currSponsor.link,
      logo: currSponsor.logo,
      index: currSponsor.index,
      addNewOpen: true,
    });
  }

  handleDelete(e) {
    e.preventDefault();
    const currSponsor = this.state.sponsors
      .find((sponsor) => sponsor._id === e.currentTarget.id);
    if (window.confirm(`Are you sure you want to permanently delete the sponsor ${currSponsor.name}?`)) {
      this.setState({currentlyDeleting: true});
      deleteData('/api/corporate-sponsors', e.currentTarget.id)
        .then((response) => {
          const message = response.error || response.message;
          this.setState({
            currentlyDeleting: false,
          });
          this.props.updateMessage(message);
          this.getSponsors();
        });
    }
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    const newSponsors = arrayMove(this.state.sponsors, oldIndex, newIndex)
      .map((sponsor, index) => {
        sponsor.index = index
        return sponsor;
      });
    this.setState({
      sponsors: newSponsors,
      currentlySaving: true
    });

    putData('/api/corporate-sponsors', newSponsors)
      .then((response) => {
        this.setState({
          currentlySaving: false
        });
        this.getSponsors();
      });
  };

  handleSubmit(e) {
    e.preventDefault();

    this.setState({currentlySaving: true});

    let sponsor = new FormData();
    sponsor.append('_id', this.state.id);
    sponsor.append('name', this.state.name);
    sponsor.append('link', this.state.link);
    sponsor.append('logo', this.state.logo);
    sponsor.append('logoFile', this.state.logoFile);
    sponsor.append('index', this.state.index);

    postData('/api/corporate-sponsors', sponsor)
      .then((response) => {
        const message = response.error || response.message;
        this.setState({
          currentlySaving: false,
          addNewOpen: false,
          id: "",
          name: "",
          link: "",
          logo: "",
          logoPath: "",
          logoFile: ""
        });
        this.props.updateMessage(message);
        this.getSponsors();
      });
  }


  render() {
    document.title = "Corporate Sponsors | Rising Phoenix CMS";

    return (
      <div>
        <h2>Corporate Sponsors</h2>
        {this.state.error ?
          <p>Sorry, something went wrong. Please try again later.</p>
          :
          <div>
            {/* button to add new sponsor */}
            <div style={generalStyles.addNewButton} onClick={this.handleAdd}>
              <i className="fa fa-plus" aria-hidden="true" style={{marginRight: 20}}></i> Add new
            </div>

            {/* modal to enter new sponsor info */}
            {this.state.addNewOpen && 
              <div style={generalStyles.modalContainer}>
                <form 
                  onSubmit={this.state.currentlySaving ? (e) => e.preventDefault() : this.handleSubmit}
                  style={generalStyles.modalContent}
                >
                  <p style={{fontSize: '0.9em', color: '#777', marginTop: 0}}>Fields marked with a * are required.</p>
                  <div>
                    <label htmlFor="name" style={[generalStyles.label, generalStyles.modalContent.label]}>Sponsor Name <span>*</span> :</label>
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
                    <label htmlFor="link" style={[generalStyles.label, generalStyles.modalContent.label]}>Sponsor Website:</label>
                    <input 
                      type="url" 
                      id="link" 
                      value={this.state.link} 
                      style={[generalStyles.inputText, generalStyles.modalContent.input]}
                      maxLength={150}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div>
                    <div style={[generalStyles.label, generalStyles.modalContent.label]}>Sponsor Logo:</div>
                    <div style={generalStyles.modalContent.fileInputContainer}>
                      <label 
                        htmlFor="logo" 
                        style={generalStyles.modalContent.fileInput}
                        key='fileInput'
                      >
                        Choose a File
                      </label>
                      <input 
                        type="file" 
                        accept='image/*' 
                        id='logo'
                        style={{opacity: 0, width: 0, height: 0}}
                        value={this.state.logoPath}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="preview" style={generalStyles.modalContent.filePreview}>
                      {
                        this.state.logo ? 
                        <div>
                          <img 
                            src={`https://s3.us-east-2.amazonaws.com/risingphoenix/${this.state.logo}`}
                            alt={`${this.state.name} logo`} 
                            style={generalStyles.modalContent.filePreview.image}
                          />
                          <p style={{marginBottom: 0}}>{this.state.logo}</p>
                        </div>
                        :
                        this.state.logoPath ? 
                        <div>
                          <img 
                            src={window.URL.createObjectURL(this.state.logoFile)}
                            alt={`${this.state.name} logo`} 
                            style={generalStyles.modalContent.filePreview.image}
                          />
                          <p style={{marginBottom: 0}}>{this.state.logoFile.name}</p>
                        </div>
                        :
                        <p>No file currently selected.</p>
                      }
                    </div>
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
              <SortableSponsorList 
                sponsorList={this.state.sponsors} 
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
CorporateSponsorsCMS = Radium(CorporateSponsorsCMS);
  
export default CorporateSponsorsCMS;