import React, {Component} from 'react';
import generalStyles from '../styles/admin/generalStyles';
import Radium from 'radium';
import { getData, postData } from '../utils/apiCalls';

class IndividualSponsorsCMS extends Component {
  constructor() {
    super()

    this.state = { 
      sponsors: [],
      error: false,
      sponsorsEntryValue: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEntryChange = this.handleEntryChange.bind(this);
  }

  getSponsors() {
    getData('/api/individual-sponsors').then((sponsors) => {
      if (sponsors.error) {
        this.setState({ error: true });
        this.props.updateMessage(sponsors.error);
      } else {
        const initSponsorsEntryValue = sponsors.map(sponsor => sponsor.name).join('\n');
        this.setState({ 
          sponsors,
          sponsorsEntryValue: initSponsorsEntryValue,
          error: false
        });
      }
    });
  }

  componentDidMount() {
    this.getSponsors();
  }

  handleEntryChange(e) {
    this.setState({
      sponsorsEntryValue: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    const newSponsors = this.state.sponsorsEntryValue
      .split("\n")
      .filter(sponsor => !!sponsor) // remove blank lines
      .map((sponsor, i) => ({index: i, name: sponsor}));
    postData('/api/individual-sponsors', newSponsors)
      .then((response) => {
        const message = response.error || response.message;
        this.props.updateMessage(message);
      });
  }

  render() {
    document.title = "Individual Sponsors | Rising Phoenix CMS";
    
    return (
      <div>
        <h2>Individual Sponsors</h2>
        {this.state.error ?
          <p>Sorry, something went wrong. Please try again later.</p>
          :
          <div>
            <p>Please enter one sponsor name per line.</p>
            <form onSubmit={this.handleSubmit}>
              <textarea 
                onChange={this.handleEntryChange} 
                value={this.state.sponsorsEntryValue}
                style={[generalStyles.inputText, {height: 200}]}  
              ></textarea>
              <button style={[generalStyles.submitButton, {width: 180}]}>Save</button>
            </form>
          </div>
        }
      </div>
    );
  }
}
IndividualSponsorsCMS = Radium(IndividualSponsorsCMS);
  
export default IndividualSponsorsCMS;