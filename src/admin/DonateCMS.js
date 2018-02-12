import React, {Component} from "react";
import { arrayMove } from "react-sortable-hoc";
import SortableRewardLevelList from "./components/SortableItemList";
import { AddNewButton, SaveButton, CancelButton } from "./components/buttons";
import { TextInput, TextAreaInput } from "./components/inputs";
import inputStyles from "../styles/admin/inputStyles";
import containerStyles from "../styles/admin/containerStyles";
import donateStyles from "../styles/admin/donateStyles";
import Radium from "radium";
import { getData, postData, deleteData, putData } from "../utils/apiCalls";


class DonateCMS extends Component {
  constructor() {
    super();

    this.state = {
      donateText: "",
      rewardText: "",
      checkTo: "",
      checkName: "",
      checkAddress1: "",
      checkAddress2: "",
      checkCity: "",
      checkState: "",
      checkZip: "",
      rewardLevels: [],
      rewardId: "",
      rewardAmountStart: "",
      rewardAmountEnd: "",
      rewardName: "",
      rewardReward: "",
      rewardIndex: "",
      error: false,
      currentlySaving: false,
      currentlyDeleting: false,
      addNewOpen: false,
    };

    this.handleSubmitInfo = this.handleSubmitInfo.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.handleAdd = this.handleAdd.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.getNextIndex = this.getNextIndex.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.onSortEnd = this.onSortEnd.bind(this);
    this.handleSubmitRewardLevel = this.handleSubmitRewardLevel.bind(this);
  }

  getDonateInfo() {
    getData("/api/donate-info").then((doc) => {
      if (doc.error) {
        this.setState({ error: true });
        this.props.updateMessage(doc.error);
      } else if (doc) {
        this.setState({ 
          donateText: doc.donateText,
          rewardText: doc.rewardText,
          checkTo: doc.check.to,
          checkName: doc.check.name,
          checkAddress1: doc.check.address1,
          checkAddress2: doc.check.address2,
          checkCity: doc.check.city,
          checkState: doc.check.state,
          checkZip: doc.check.zip,
        });
      }
    });
  }

  getRewardLevels() {
    getData("/api/donate-levels").then((levels) => {
      if (levels.error) {
        this.setState({ error: true });
        this.props.updateMessage(levels.error);
      } else {
        const newIndex = this.getNextIndex(levels);
        this.setState({ 
          rewardLevels: levels,
          rewardIndex: newIndex
        });
      }
    });
  }

  componentDidMount() {
    this.getDonateInfo();
    this.getRewardLevels();
  }

  getNextIndex(levels) {
    if (levels.length < 1) {
      return 0;
    }
    return Math.max(...levels.map(level => level.index)) + 1;    
  }

  handleAdd() {
    this.setState({addNewOpen: true});
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleSubmitInfo(e) {
    e.preventDefault();
    this.setState({currentlySaving: true});
    const donateInfo = {
      donateText: this.state.donateText,
      rewardText: this.state.rewardText,
      check: {
        to: this.state.checkTo,
        name: this.state.checkName,
        address1: this.state.checkAddress1,
        address2: this.state.checkAddress2,
        city: this.state.checkCity,
        state: this.state.checkState,
        zip: this.state.checkZip,
      }
    };
    postData("/api/donate-info", donateInfo)
      .then(response => {
        const message = response.error || response.message;
        this.setState({currentlySaving: false});
        this.props.updateMessage(message);
      });
  }

  handleCancel(e) {
    if (window.confirm("Your data will not be saved. Continue?")) {
      const index = this.getNextIndex(this.state.rewardLevels);
      this.setState({
        rewardId: "",
        rewardAmountStart: "",
        rewardAmountEnd: "",
        rewardName: "",
        rewardReward: "",
        rewardIndex: index,
        addNewOpen: false,
      });
    } else {
      e.preventDefault();
    }
  }

  handleEdit(e) {
    e.preventDefault();
    const currLevel = this.state.rewardLevels
      .find((level) => level._id === e.currentTarget.id);

    this.setState({
      rewardId: currLevel._id,
      rewardAmountStart: currLevel.amountStart,
      rewardAmountEnd: currLevel.amountEnd,
      rewardName: currLevel.name,
      rewardReward: currLevel.reward,
      rewardIndex: currLevel.index,
      addNewOpen: true,
    });
  }

  handleDelete(e) {
    e.preventDefault();
    const currLevel = this.state.rewardLevels
      .find((level) => level._id === e.currentTarget.id);
    if (window.confirm(`Are you sure you want to permanently delete the donate level ${currLevel.name}?`)) {
      this.setState({currentlyDeleting: true});
      deleteData("/api/donate-levels", e.currentTarget.id)
        .then((response) => {
          const message = response.error || response.message;
          this.setState({
            currentlyDeleting: false,
          });
          this.props.updateMessage(message);
          this.getRewardLevels();
        });
    }
  }

  onSortEnd({oldIndex, newIndex}) {
    const newLevels = arrayMove(this.state.rewardLevels, oldIndex, newIndex)
      .map((level, index) => {
        level.index = index;
        return level;
      });
    this.setState({
      rewardLevels: newLevels,
      currentlySaving: true
    });

    putData("/api/donate-levels", newLevels)
      .then((response) => {
        const message = response.error || response.message;
        this.setState({
          currentlySaving: false
        });
        this.props.updateMessage(message);
        this.getRewardLevels();
      });
  }

  handleSubmitRewardLevel(e) {
    e.preventDefault();

    if (!this.state.rewardName) {
      this.props.updateMessage("Required field must be completed.");
      return;
    }

    this.setState({currentlySaving: true});

    const amountStart = typeof this.state.rewardAmountStart === "string" ? 
      this.state.rewardAmountStart.replace(/,/g, "") 
      :
      this.state.rewardAmountStart;
    const amountEnd = typeof this.state.rewardAmountEnd === "string" ?
      this.state.rewardAmountEnd.replace(/,/g, "")
      :
      this.state.rewardAmountEnd;

    if (isNaN(amountStart) || isNaN(amountEnd)) {
      this.props.updateMessage("Amounts must be numbers.");
      return;
    }

    const level = {
      _id: this.state.rewardId,
      amountStart: amountStart,
      amountEnd: amountEnd,
      name: this.state.rewardName,
      reward: this.state.rewardReward,
      index: this.state.rewardIndex
    };

    postData("/api/donate-levels", level)
      .then((response) => {
        const message = response.error || response.message;
        this.setState({
          currentlySaving: false,
          addNewOpen: false,
          rewardId: "",
          rewardAmountStart: "",
          rewardAmountEnd: "",
          rewardName: "",
          rewardReward: ""
        });
        this.props.updateMessage(message);
        this.getRewardLevels();
      });
  }

  render() {
    document.title = "Donate | Rising Phoenix CMS";

    return (
      <div>
        <h2>Donate</h2>
        {this.state.error ?
          <p>Sorry, something went wrong. Please try again later.</p>
          :
          <div>
            <form onSubmit={this.state.currentlySaving ? (e)=>{e.preventDevault();} : this.handleSubmitInfo}>
              <TextAreaInput 
                id="donateText"
                label="Text for the section on how to donate:"
                value={this.state.donateText}
                handleChange={this.handleChange}
                maxLength={500}
                containerStyle={donateStyles.inputContainer}
                inputStyle={donateStyles.textarea}
                labelStyle={donateStyles.label}
              />
              <TextAreaInput 
                id="rewardText"
                label="Text for the section describing rewards:"
                value={this.state.rewardText}
                handleChange={this.handleChange}
                maxLength={500}
                containerStyle={donateStyles.inputContainer}
                inputStyle={donateStyles.textarea}
                labelStyle={donateStyles.label}
              />
              <TextInput 
                id="checkTo"
                label="Make checks out to:"
                value={this.state.checkTo}
                handleChange={this.handleChange}
                maxLength={100}
                containerStyle={donateStyles.inputContainer}
                labelStyle={donateStyles.label}
                inputStyle={donateStyles.input}
              />
              <div style={donateStyles.address}>
                <h3 style={{textAlign: "left"}}>Address to mail checks to:</h3>
                <div style={donateStyles.address.container}>
                  <TextInput 
                    id="checkName"
                    label="Name:"
                    value={this.state.checkName}
                    handleChange={this.handleChange}
                    maxLength={100}
                    containerStyle={{...donateStyles.inputContainer, ...donateStyles.address.inputContainer}}
                    labelStyle={{...donateStyles.label, width: 100}}
                    inputStyle={donateStyles.address.input}
                  />
                  <TextInput 
                    id="checkAddress1"
                    label="Address:"
                    value={this.state.checkAddress1}
                    handleChange={this.handleChange}
                    maxLength={100}
                    containerStyle={{...donateStyles.inputContainer, ...donateStyles.address.inputContainer}}
                    labelStyle={{...donateStyles.label, width: 100}}
                    inputStyle={donateStyles.address.input}
                  />
                  <TextInput 
                    id="checkAddress2"
                    value={this.state.checkAddress2}
                    handleChange={this.handleChange}
                    maxLength={100}
                    containerStyle={{...donateStyles.inputContainer, ...donateStyles.address.inputContainer, paddingTop: 0, marginTop: 0}}
                    labelStyle={{...donateStyles.label, width: 100, "@media (max-width: 700px)": { display: "none"}}}
                    inputStyle={{...donateStyles.address.input, margin: "0 0.5em 1em 0.5em"}}
                  />
                  <TextInput 
                    id="checkCity"
                    label="City:"
                    value={this.state.checkCity}
                    handleChange={this.handleChange}
                    maxLength={50}
                    containerStyle={{...donateStyles.inputContainer, ...donateStyles.address.inputContainer}}
                    labelStyle={{...donateStyles.label, width: 100}}
                    inputStyle={donateStyles.address.input}
                  />
                  <TextInput 
                    id="checkState"
                    label="State:"
                    value={this.state.checkState}
                    handleChange={this.handleChange}
                    maxLength={2}
                    containerStyle={{...donateStyles.inputContainer, ...donateStyles.address.inputContainer}}
                    labelStyle={{...donateStyles.label, width: 100}}
                    inputStyle={donateStyles.address.input}
                  />
                  <TextInput 
                    id="checkZip"
                    label="Zip:"
                    value={this.state.checkZip}
                    handleChange={this.handleChange}
                    maxLength={10}
                    containerStyle={{...donateStyles.inputContainer, ...donateStyles.address.inputContainer}}
                    labelStyle={{...donateStyles.label, width: 100}}
                    inputStyle={donateStyles.address.input}
                  />
                </div>
              </div>
              <SaveButton currentlySaving={this.state.currentlySaving} info={true} />
            </form>


            <h2 style={donateStyles.rewardsHeader}>Reward Levels</h2>
            
            <AddNewButton handleAdd={this.handleAdd} style={donateStyles.addNewButton} />

            {/* modal to enter new reward level info */}
            {this.state.addNewOpen && 
              <div style={containerStyles.modalContainer}>
                <form 
                  onSubmit={this.state.currentlySaving ? (e) => e.preventDefault() : this.handleSubmitRewardLevel}
                  style={containerStyles.modalContent}
                >
                  <p style={{fontSize: "0.9em", color: "#777", marginTop: 0}}>Fields marked with a * are required.</p>
                  <div>
                    <label htmlFor="rewardAmountStart" style={[inputStyles.label, inputStyles.modal.label]}>Amount:</label>
                    <div style={donateStyles.amountEntryContainer}>
                      $ <input 
                        type="number" 
                        id="rewardAmountStart" 
                        value={this.state.rewardAmountStart} 
                        style={[inputStyles.inputText, inputStyles.modal.input, donateStyles.amountInput]}
                        maxLength={15}
                        min="0"
                        onChange={this.handleChange}
                      />
                      &nbsp;&nbsp;&ndash;&nbsp;&nbsp;
                      <input 
                        type="number" 
                        id="rewardAmountEnd" 
                        value={this.state.rewardAmountEnd} 
                        style={[inputStyles.inputText, inputStyles.modal.input, donateStyles.amountInput]}
                        maxLength={15}
                        min="0"
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <TextInput 
                    id="rewardName"
                    label="Name:"
                    value={this.state.rewardName}
                    handleChange={this.handleChange}
                    maxLength={100}
                    modal={true}
                    required={true}
                  />
                  <TextInput 
                    id="rewardReward"
                    label="Reward:"
                    value={this.state.rewardReward}
                    handleChange={this.handleChange}
                    maxLength={100}
                    modal={true}
                  />
                  
                  <SaveButton currentlySaving={this.state.currentlySaving} modal={true} />
                  <CancelButton currentlySaving={this.state.currentlySaving} handleCancel={this.handleCancel} />

                </form>
              </div>
            }

            {/* list of current reward levels */}
            <div style={containerStyles.listContainer}>
              <SortableRewardLevelList 
                itemList={this.state.rewardLevels} 
                itemType="level"
                onSortEnd={this.onSortEnd} 
                currentlyDeleting={this.state.currentlyDeleting}
                handleEdit={this.handleEdit}
                handleDelete={this.handleDelete}
                lockAxis="y"
                distance={10}
                useDragHandle={true}
                lockToContainerEdges={true}
                disabled={this.state.currentlySaving}
                fieldList={(level) => 
                  [
                    {label: "Amount:", content: level.amountEnd ? `$ ${level.amountStart.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} - ${level.amountEnd.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}` : `$ ${level.amountStart.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} +`},
                    {label: "Name:", content: level.name},
                    {label: "Reward:", content: level.reward}
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
DonateCMS = Radium(DonateCMS);
  
export default DonateCMS;