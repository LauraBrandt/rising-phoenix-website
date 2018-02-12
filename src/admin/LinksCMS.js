import React, {Component} from "react";
import { SaveButton } from "./components/buttons";
import { TextInput } from "./components/inputs";
import { getData, postData } from "../utils/apiCalls";

class LinksCMS extends Component {
  constructor() {
    super();

    this.state = {
      error: false,
      facebookValue: "",
      twitterValue: "",
      donateValue: "",
      currentlySaving: false,
      linkLength: 100
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  getLinks() {
    getData("/api/links").then((links) => {
      if (links.error) {
        this.setState({ error: true });
        this.props.updateMessage(links.error);
      } else {
        this.setState({ 
          error: false,
          facebookValue: links.facebook,
          twitterValue: links.twitter,
          donateValue: links.donate
        });
      }
    });
  }

  componentDidMount() {
    this.getLinks();
  }

  handleChange(e) {
    const maxLength = this.state.linkLength;
    this.setState({
      [e.target.id]: e.target.value.substring(0, maxLength)
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({currentlySaving: true});
    const links = {
      facebook: this.state.facebookValue,
      twitter: this.state.twitterValue,
      donate: this.state.donateValue
    };
    postData("/api/links", links)
      .then(response => {
        const message = response.error || response.message;
        this.setState({currentlySaving: false});
        this.props.updateMessage(message);
      });
  }
  
  render() {
    document.title = "Links | Rising Phoenix CMS";

    return (
      <div>
        <h2>Links</h2>
        {this.state.error ?
          <p>Sorry, something went wrong. Please try again later.</p>
          :
          <div>
            <form onSubmit={this.state.currentlySaving ? (e)=>{e.preventDevault();} : this.handleSubmit}>
              <TextInput 
                id="facebookValue"
                label="Link to Facebook page:"
                type="url"
                value={this.state.facebookValue}
                handleChange={this.handleChange}
              />
              <TextInput 
                id="twitterValue"
                label="Link to Twitter account:"
                type="url"
                value={this.state.twitterValue}
                handleChange={this.handleChange}
              />
              <TextInput 
                id="donateValue"
                label="Link to Go Fund Me:"
                type="url"
                value={this.state.donateValue}
                handleChange={this.handleChange}
              />
              <SaveButton currentlySaving={this.state.currentlySaving} />
            </form>
          </div>
        }
      </div>
    );
  }
}
  
export default LinksCMS;