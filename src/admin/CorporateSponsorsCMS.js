import React, {Component} from "react";
import { arrayMove, SortableContainer } from "react-sortable-hoc";
import SortableSponsor from "./components/SortableItem";
import ImagePreview from "./components/ImagePreview";
import { AddNewButton, SaveButton, CancelButton } from "./components/buttons";
import generalStyles from "../styles/admin/generalStyles";
import Radium from "radium";
import { getData, postData, deleteData, putData } from "../utils/apiCalls";


const SortableSponsorList = SortableContainer(({sponsorList, currentlyDeleting, handleEdit, handleDelete, disabled}) => {
  return (
    <div>
      {sponsorList.map((sponsor, index) => (
        <SortableSponsor
          item={sponsor} 
          key={`sponsor-${sponsor._id}`}
          index={index}
          currentlyDeleting={currentlyDeleting}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          disabled={disabled}
          fieldList={[
            {label: "Name:", content: sponsor.name},
            {label: "Website:", content: sponsor.link ? `<a href=${sponsor.link}>${sponsor.link}</a>` : ""},
            {label: "Logo:", content: sponsor.logo ? `<img class="card-img" src="https://s3.us-east-2.amazonaws.com/risingphoenix/${sponsor.logo}" alt="${sponsor.name} logo"/>` : ""}
          ]}
        />
      ))}
    </div>
  );
});

class CorporateSponsorsCMS extends Component {
  constructor() {
    super();

    this.state = { 
      // sponsors: [
      //   {name: "Mariani's Venue", logo: "marianisvenue-logo.png", link: "https://www.marianivenue.com/", _id: 1}, 
      //   {name: "Mobile Meat Market", logo: "mobile_meat_market.jpg", _id: 2},
      //   {name: "All Occasions & Bridal", link: "https://www.facebook.com/ALLOCCASIONSANDBRIDAL/", _id: 3}, 
      // ],
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
    this.removeImage = this.removeImage.bind(this);
  }

  getSponsors() {
    getData("/api/corporate-sponsors").then((sponsors) => {
      if (sponsors.error) {
        this.setState({ error: true });
        this.props.updateMessage(sponsors.error);
      } else {
        const newIndex = this.getNextIndex(sponsors);
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
    this.setState({addNewOpen: true});
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
      deleteData("/api/corporate-sponsors", e.currentTarget.id)
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

  removeImage() {
    this.setState({
      logo: "",
      logoFile: "",
      logoPath: ""
    });
  }

  onSortEnd({oldIndex, newIndex}) {
    const newSponsors = arrayMove(this.state.sponsors, oldIndex, newIndex)
      .map((sponsor, index) => {
        sponsor.index = index;
        return sponsor;
      });
    this.setState({
      sponsors: newSponsors,
      currentlySaving: true
    });

    putData("/api/corporate-sponsors", newSponsors)
      .then((response) => {
        const message = response.error || response.message;
        this.setState({
          currentlySaving: false
        });
        this.props.updateMessage(message);
        this.getSponsors();
      });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({currentlySaving: true});

    let sponsor = new FormData();
    sponsor.append("_id", this.state.id);
    sponsor.append("name", this.state.name);
    sponsor.append("link", this.state.link);
    sponsor.append("logo", this.state.logo);
    sponsor.append("logoFile", this.state.logoFile);
    sponsor.append("index", this.state.index);

    postData("/api/corporate-sponsors", sponsor)
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
            <AddNewButton handleAdd={this.handleAdd} />

            {/* modal to enter new sponsor info */}
            {this.state.addNewOpen && 
              <div style={generalStyles.modalContainer}>
                <form 
                  onSubmit={this.state.currentlySaving ? (e) => e.preventDefault() : this.handleSubmit}
                  style={generalStyles.modalContent}
                >
                  <p style={{fontSize: "0.9em", color: "#777", marginTop: 0}}>Fields marked with a * are required.</p>
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
                        key="fileInput"
                      >
                        Choose a File
                      </label>
                      <input 
                        type="file" 
                        accept="image/*" 
                        id="logo"
                        style={{opacity: 0, width: 0, height: 0}}
                        value={this.state.logoPath}
                        onChange={this.handleChange}
                      />
                    </div>
                    <ImagePreview  
                      image={this.state.logo} 
                      path={this.state.logoPath} 
                      file={this.state.logoFile} 
                      alt={`${this.state.name} logo`} 
                      removeImage={this.removeImage} 
                    />
                  </div>

                  <SaveButton currentlySaving={this.state.currentlySaving} modal={true} />
                  <CancelButton currentlySaving={this.state.currentlySaving} handleCancel={this.handleCancel} />

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
CorporateSponsorsCMS = Radium(CorporateSponsorsCMS);
  
export default CorporateSponsorsCMS;