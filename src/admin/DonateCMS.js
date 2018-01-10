import React, {Component} from 'react';
import generalStyles from '../styles/admin/generalStyles';
import donateStyles from '../styles/admin/donateStyles';
import Radium from 'radium';
import { getData, postData } from '../utils/apiCalls';

class DonateCMS extends Component {
  constructor() {
    super()

    this.state = {
      donateTitle: "",
      donateText: "",
      rewardTitle: "",
      rewardText: "",
      checkTo: "",
      checkName: "",
      checkAddress1: "",
      checkAddress2: "",
      checkCity: "",
      checkState: "",
      checkZip: "",
      error: false,
      currentlySaving: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  getDonateInfo() {
    getData('/api/donate-info').then((doc) => {
      if (doc.error) {
        this.setState({ error: true });
        this.props.updateMessage(doc.error);
      } else if (doc) {
        this.setState({ 
          error: false,
          donateTitle: doc.donateTitle,
          donateText: doc.donateText,
          rewardTitle: doc.rewardTitle,
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

  componentDidMount() {
    this.getDonateInfo();
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({currentlySaving: true});
    const donateInfo = {
      donateTitle: this.state.donateTitle,
      donateText: this.state.donateText,
      rewardTitle: this.state.rewardTitle,
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
    }
    postData('/api/donate-info', donateInfo)
      .then(response => {
        const message = response.error || response.message;
        this.setState({currentlySaving: false});
        this.props.updateMessage(message);
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
            <form onSubmit={this.state.currentlySaving ? (e)=>{e.preventDevault()} : this.handleSubmit}>
              <div style={donateStyles.inputContainer}>
                <label htmlFor="donateTitle" style={[generalStyles.label, donateStyles.label]}>
                  Subtitle 1 (how to donate section):
                </label>
                <input 
                  type="text" 
                  id="donateTitle" 
                  value={this.state.donateTitle} 
                  style={[generalStyles.inputText, donateStyles.input]}
                  maxLength={100}
                  onChange={this.handleChange}
                />
              </div>
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
                <label htmlFor="rewardTitle" style={[generalStyles.label, donateStyles.label]}>
                  Subtitle 2 (rewards description section):
                </label>
                <input 
                  type="text" 
                  id="rewardTitle" 
                  value={this.state.rewardTitle} 
                  style={[generalStyles.inputText, donateStyles.input]}
                  maxLength={100}
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
                <h3 style={{textAlign: 'left'}}>Address to mail checks to:</h3>
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
                    <label htmlFor="checkAddress2" style={[generalStyles.label, donateStyles.label, {width: 100, '@media (max-width: 700px)': { display: 'none'}}]}>
                    </label>
                    <input 
                      type="text" 
                      id="checkAddress2" 
                      value={this.state.checkAddress2} 
                      style={[generalStyles.inputText, donateStyles.address.input, {margin: '0 0.5em 1em 0.5em'}]}
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
              <button style={[generalStyles.submitButton, {width: 180}, this.state.currentlySaving && generalStyles.submitButton.disabled]}>Save</button>
            </form>
          </div>
        }
      </div>
    );
  }
}
DonateCMS = Radium(DonateCMS);
  
export default DonateCMS;