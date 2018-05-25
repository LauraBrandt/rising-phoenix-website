import React, {Component} from "react";
import { SaveButton } from "./components/buttons";
import Radium from "radium";
import { getData, postData } from "../utils/apiCalls";
import RichTextEditor from "react-rte";

class BylawsCMS extends Component {
  constructor() {
    super();

    this.state = { 
      bylawsContent: RichTextEditor.createEmptyValue(),
      error: false,
      currentlySaving: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  getBylaws() {
    getData("/api/bylaws").then((bylaws) => {
      if (bylaws.error) {
        this.setState({ error: true });
        this.props.updateMessage(bylaws.error);
      } else {
        this.setState({ 
          bylawsContent: bylaws.content ? RichTextEditor.createValueFromString(bylaws.content, "html") : RichTextEditor.createEmptyValue(),
          error: false
        });
      }
    });
  }

  componentDidMount() {
    this.getBylaws();
  }

  handleChange(value) {
    this.setState({
      bylawsContent: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ currentlySaving: true });
    const bylawsHtml = this.state.bylawsContent.toString("html");
    postData("/api/bylaws", {content: bylawsHtml})
      .then((response) => {
        const message = response.error || response.message;
        this.setState({currentlySaving: false});
        this.props.updateMessage(message);
      });
  }

  render() {
    document.title = "By-Laws | Rising Phoenix CMS";

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
        <h2>By-Laws</h2>
        {this.state.error ?
          <p>Sorry, something went wrong. Please try again later.</p>
          :
          <div>
            <form onSubmit={this.state.currentlySaving ? (e)=>{e.preventDevault();} : this.handleSubmit}>
              <RichTextEditor
                toolbarConfig={toolbarConfig}
                value={this.state.bylawsContent}
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
BylawsCMS = Radium(BylawsCMS);
  
export default BylawsCMS;