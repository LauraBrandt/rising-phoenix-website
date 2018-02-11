import React, {Component} from "react";
import { SaveButton } from "./components/buttons";
import Radium from "radium";
import { getData, postData } from "../utils/apiCalls";
import RichTextEditor from "react-rte";

class AboutCMS extends Component {
  constructor() {
    super();

    this.state = { 
      aboutContent: RichTextEditor.createEmptyValue(),
      error: false,
      currentlySaving: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  getAbout() {
    getData("/api/about").then((about) => {
      if (about.error) {
        this.setState({ error: true });
        this.props.updateMessage(about.error);
      } else {
        this.setState({ 
          aboutContent: about.content ? RichTextEditor.createValueFromString(about.content, "html") : RichTextEditor.createEmptyValue(),
          error: false
        });
      }
    });
  }

  componentDidMount() {
    this.getAbout();
  }

  handleChange(value) {
    this.setState({
      aboutContent: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ currentlySaving: true });
    const aboutHtml = this.state.aboutContent.toString("html");
    postData("/api/about", {content: aboutHtml})
      .then((response) => {
        const message = response.error || response.message;
        this.setState({currentlySaving: false});
        this.props.updateMessage(message);
      });
  }

  render() {
    document.title = "About | Rising Phoenix CMS";

    const toolbarConfig = {
      display: ["INLINE_STYLE_BUTTONS", "BLOCK_TYPE_BUTTONS", "LINK_BUTTONS", "BLOCK_TYPE_DROPDOWN", "HISTORY_BUTTONS"],
      INLINE_STYLE_BUTTONS: [
        {label: "Bold", style: "BOLD"},
        {label: "Italic", style: "ITALIC"},
        {label: "Underline", style: "UNDERLINE"},
        {label: "Strikethrough", style: "STRIKETHROUGH"}
      ],
      BLOCK_TYPE_BUTTONS: [
        {label: "Bullet List", style: "unordered-list-item"},
        {label: "Numbered List", style: "ordered-list-item"},
        {label: "Blockquote", style: "blockquote"}
      ],
      BLOCK_TYPE_DROPDOWN: [
        {label: "Normal", style: "unstyled"},
        {label: "Heading Large", style: "header-one"},
        {label: "Heading Medium", style: "header-two"},
        {label: "Heading Small", style: "header-three"}
      ]
    };
    
    return (
      <div>
        <h2>About</h2>
        {this.state.error ?
          <p>Sorry, something went wrong. Please try again later.</p>
          :
          <div>
            <form onSubmit={this.state.currentlySaving ? (e)=>{e.preventDevault();} : this.handleSubmit}>
              <RichTextEditor
                toolbarConfig={toolbarConfig}
                value={this.state.aboutContent}
                onChange={this.handleChange}
                className="rte-component"
                autoFocus={true}
              />
              <SaveButton currentlySaving={this.state.currentlySaving} />
            </form>
          </div>
        }
      </div>
    );
  }
}
AboutCMS = Radium(AboutCMS);
  
export default AboutCMS;