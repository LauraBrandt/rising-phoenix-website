import React, {Component} from "react";
import { arrayMove, SortableContainer } from "react-sortable-hoc";
import SortableRewardLevel from "./components/SortableItem";
import { AddNewButton, SaveButton, CancelButton } from "./components/buttons";
import generalStyles from "../styles/admin/generalStyles";
import donateStyles from "../styles/admin/donateStyles";
import Radium from "radium";
import { getData, postData, deleteData, putData } from "../utils/apiCalls";


const SortableRewardLevelList = SortableContainer(({rewardLevelList, currentlyDeleting, handleEdit, handleDelete, disabled}) => {
  return (
    <div>
      {rewardLevelList.map((level, index) => (
        <SortableRewardLevel 
          item={level} 
          key={`level-${level._id}`}
          index={index}
          currentlyDeleting={currentlyDeleting}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          disabled={disabled}
          fieldList={[
            {label: "Amount:", content: level.amountEnd ? `$ ${level.amountStart.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} - ${level.amountEnd.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}` : `$ ${level.amountStart.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} +`},
            {label: "Name:", content: level.name},
            {label: "Reward:", content: level.reward}
          ]}
        />
      ))}
    </div>
  );
});


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
              <div style={donateStyles.inputContainer}>
                <label htmlFor="donateText" style={[generalStyles.label, donateStyles.label]}>
                  Text for the section on how to donate:
                </label>
                <textarea
                  id="donateText" 
                  value={this.state.donateText} 
                  style={[generalStyles.inputText, donateStyles.textarea]}
                  maxLength={500}
                  onChange={this.handleChange}
                />
              </div>
              <div style={donateStyles.inputContainer}>
                <label htmlFor="rewardText" style={[generalStyles.label, donateStyles.label]}>
                  Text for the section describing rewards:
                </label>
                <textarea 
                  id="rewardText" 
                  value={this.state.rewardText} 
                  style={[generalStyles.inputText, donateStyles.textarea]}
                  maxLength={500}
                  onChange={this.handleChange}
                />
              </div>
              <div style={donateStyles.inputContainer}>
                <label htmlFor="checkTo" style={[generalStyles.label, donateStyles.label]}>
                  Make checks out to:
                </label>
                <input 
                  type="text" 
                  id="checkTo" 
                  value={this.state.checkTo} 
                  style={[generalStyles.inputText, donateStyles.input]}
                  maxLength={100}
                  onChange={this.handleChange}
                />
              </div>

              <div style={donateStyles.address}>
                <h3 style={{textAlign: "left"}}>Address to mail checks to:</h3>
                <div style={donateStyles.address.container}>
                  <div style={[donateStyles.inputContainer, donateStyles.address.inputContainer]}>
                    <label htmlFor="checkName" style={[generalStyles.label, donateStyles.label, {width: 100}]}>
                      Name:
                    </label>
                    <input 
                      type="text" 
                      id="checkName" 
                      value={this.state.checkName} 
                      style={[generalStyles.inputText, donateStyles.address.input]}
                      maxLength={100}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div style={[donateStyles.inputContainer, donateStyles.address.inputContainer]}>
                    <label htmlFor="checkAddress1" style={[generalStyles.label, donateStyles.label, {width: 100}]}>
                      Address:
                    </label>
                    <input 
                      type="text" 
                      id="checkAddress1" 
                      value={this.state.checkAddress1} 
                      style={[generalStyles.inputText, donateStyles.address.input]}
                      maxLength={100}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div style={[donateStyles.inputContainer, donateStyles.address.inputContainer, {paddingTop: 0, marginTop: 0}]}>
                    <label htmlFor="checkAddress2" style={[generalStyles.label, donateStyles.label, {width: 100, "@media (max-width: 700px)": { display: "none"}}]}>
                    </label>
                    <input 
                      type="text" 
                      id="checkAddress2" 
                      value={this.state.checkAddress2} 
                      style={[generalStyles.inputText, donateStyles.address.input, {margin: "0 0.5em 1em 0.5em"}]}
                      maxLength={100}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div style={[donateStyles.inputContainer, donateStyles.address.inputContainer]}>
                    <label htmlFor="checkCity" style={[generalStyles.label, donateStyles.label, {width: 100}]}>
                      City:
                    </label>
                    <input 
                      type="text" 
                      id="checkCity" 
                      value={this.state.checkCity} 
                      style={[generalStyles.inputText, donateStyles.address.input]}
                      maxLength={50}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div style={[donateStyles.inputContainer, donateStyles.address.inputContainer]}>
                    <label htmlFor="checkState" style={[generalStyles.label, donateStyles.label, {width: 100}]}>
                      State:
                    </label>
                    <input 
                      type="text" 
                      id="checkState" 
                      value={this.state.checkState} 
                      style={[generalStyles.inputText, donateStyles.address.input]}
                      maxLength={2}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div style={[donateStyles.inputContainer, donateStyles.address.inputContainer]}>
                    <label htmlFor="checkZip" style={[generalStyles.label, donateStyles.label, {width: 100}]}>
                      Zip:
                    </label>
                    <input 
                      type="text" 
                      id="checkZip" 
                      value={this.state.checkZip} 
                      style={[generalStyles.inputText, donateStyles.address.input]}
                      maxLength={10}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
              </div>
              <SaveButton currentlySaving={this.state.currentlySaving} info={true} />
            </form>


            <h2 style={donateStyles.rewardsHeader}>Reward Levels</h2>
            
            <AddNewButton handleAdd={this.handleAdd} style={donateStyles.addNewButton} />

            {/* modal to enter new reward level info */}
            {this.state.addNewOpen && 
              <div style={generalStyles.modalContainer}>
                <form 
                  onSubmit={this.state.currentlySaving ? (e) => e.preventDefault() : this.handleSubmitRewardLevel}
                  style={generalStyles.modalContent}
                >
                  <p style={{fontSize: "0.9em", color: "#777", marginTop: 0}}>Fields marked with a * are required.</p>
                  <div>
                    <label htmlFor="rewardAmountStart" style={[generalStyles.label, generalStyles.modalContent.label]}>Amount:</label>
                    <div style={donateStyles.amountEntryContainer}>
                      $ <input 
                        type="number" 
                        id="rewardAmountStart" 
                        value={this.state.rewardAmountStart} 
                        style={[generalStyles.inputText, generalStyles.modalContent.input, donateStyles.amountInput]}
                        maxLength={15}
                        min="0"
                        onChange={this.handleChange}
                      />
                      &nbsp;&nbsp;&ndash;&nbsp;&nbsp;
                      <input 
                        type="number" 
                        id="rewardAmountEnd" 
                        value={this.state.rewardAmountEnd} 
                        style={[generalStyles.inputText, generalStyles.modalContent.input, donateStyles.amountInput]}
                        maxLength={15}
                        min="0"
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="rewardName" style={[generalStyles.label, generalStyles.modalContent.label]}>Name <span>*</span> :</label>
                    <input 
                      type="text" 
                      id="rewardName" 
                      value={this.state.rewardName} 
                      style={[generalStyles.inputText, generalStyles.modalContent.input]}
                      maxLength={100}
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="rewardReward" style={[generalStyles.label, generalStyles.modalContent.label]}>Reward:</label>
                    <input 
                      type="text" 
                      id="rewardReward" 
                      value={this.state.rewardReward} 
                      style={[generalStyles.inputText, generalStyles.modalContent.input]}
                      maxLength={100}
                      onChange={this.handleChange}
                    />
                  </div>
                  
                  <SaveButton currentlySaving={this.state.currentlySaving} modal={true} />
                  <CancelButton currentlySaving={this.state.currentlySaving} handleCancel={this.handleCancel} />

                </form>
              </div>
            }

            {/* list of current reward levels */}
            <div style={generalStyles.listContainer}>
              <SortableRewardLevelList 
                rewardLevelList={this.state.rewardLevels} 
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
DonateCMS = Radium(DonateCMS);
  
export default DonateCMS;