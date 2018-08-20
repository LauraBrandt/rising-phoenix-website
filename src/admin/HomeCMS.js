import React, {Component} from "react";
import { arrayMove } from "react-sortable-hoc";
import SortableNewsList from "./components/SortableItemList";
import ImagePreview from "./components/ImagePreview";
import { AddNewButton, SaveButton, CancelButton } from "./components/buttons";
import { TextInput, TextAreaInput, ImageInput } from "./components/inputs";
import RichTextEditor from "react-rte";
import inputStyles from "../styles/admin/inputStyles";
import containerStyles from "../styles/admin/containerStyles";
import homeStyles from "../styles/admin/homeStyles";
import Radium from "radium";
import { getData, postData, deleteData, putData } from "../utils/apiCalls";


class HomeCMS extends Component {
  constructor() {
    super();

    this.state = {
      tagline: "",
      blurbTitle: "",
      blurb: "",
      // goalAmount: "",
      donatedAmount: "",
      news: [],
      newsId: "",
      newsTitle: "",
      newsImage: "",
      newsImagePath: "",
      newsImageFile: "",
      newsImageAlt: "",
      newsArticle: RichTextEditor.createEmptyValue(),
      newsIndex: "",
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
    this.removeImage = this.removeImage.bind(this);
    this.handleSubmitNewsStory = this.handleSubmitNewsStory.bind(this);
  }

  getHomeInfo() {
    getData("/api/home").then((doc) => {
      if (doc.error) {
        this.setState({ error: true });
        this.props.updateMessage(doc.error);
      } else if (doc) {
        this.setState({ 
          tagline: doc.tagline,
          blurbTitle: doc.blurbTitle,
          blurb: doc.blurb,
          // goalAmount: doc.goalAmount,
          donatedAmount: doc.donatedAmount,
        });
      }
    });
  }

  getNews() {
    getData("/api/news").then((news) => {
      if (news.error) {
        this.setState({ error: true });
        this.props.updateMessage(news.error);
      } else {
        const newIndex = this.getNextIndex(news);
        this.setState({ 
          news,
          newsIndex: newIndex
        });
      }
    });
  }

  componentDidMount() {
    this.getHomeInfo();
    this.getNews();
  }

  getNextIndex(stories) {
    if (stories.length < 1) {
      return 0;
    }
    return Math.max(...stories.map(story => story.index)) + 1;    
  }

  handleAdd() {
    this.setState({addNewOpen: true});
  }

  handleChange(e) {
    if (!e.target) { // news article onChange only returns value
      this.setState({
        newsArticle: e
      });
    } else if (e.target.id === "newsImage") { // news image file upload
      this.setState({
        newsImage: "",
        newsImagePath: e.target.value,
        newsImageFile: e.target.files[0],
      });
    } else { // everything else
      this.setState({
        [e.target.id]: e.target.value
      });
    }
  }

  handleSubmitInfo(e) {
    e.preventDefault();
    this.setState({currentlySaving: true});

    // const goalAmount = typeof this.state.goalAmount === "string" ? 
    //   this.state.goalAmount.replace(/,/g, "") 
    //   :
    //   this.state.goalAmount;
    const donatedAmount = typeof this.state.donatedAmount === "string" ?
      this.state.donatedAmount.replace(/,/g, "")
      :
      this.state.donatedAmount;

    const homeInfo = {
      tagline: this.state.tagline,
      blurbTitle: this.state.blurbTitle,
      blurb: this.state.blurb,
      // goalAmount: goalAmount,
      donatedAmount: donatedAmount,
    };
    postData("/api/home", homeInfo)
      .then(response => {
        const message = response.error || response.message;
        this.setState({currentlySaving: false});
        this.props.updateMessage(message);
      });
  }

  handleCancel(e) {
    if (window.confirm("Your data will not be saved. Continue?")) {
      const index = this.getNextIndex(this.state.news);
      this.setState({
        newsId: "",
        newsTitle: "",
        newsImage: "",
        newsImagePath: "",
        newsImageFile: "",
        newsImageAlt: "",
        newsArticle: RichTextEditor.createEmptyValue(),
        newsIndex: index,
        addNewOpen: false,
      });
    } else {
      e.preventDefault();
    }
  }

  handleEdit(e) {
    e.preventDefault();
    const currStory = this.state.news
      .find((story) => story._id === e.currentTarget.id);

    this.setState({
      newsId: currStory._id,
      newsTitle: currStory.title,
      newsImage: currStory.image,
      newsImageAlt: currStory.alt,
      newsArticle: RichTextEditor.createValueFromString(currStory.article, "html"),
      newsIndex: currStory.index,
      addNewOpen: true,
    });
  }

  handleDelete(e) {
    e.preventDefault();
    const currStory = this.state.news
      .find((story) => story._id === e.currentTarget.id);
    if (window.confirm(`Are you sure you want to permanently delete the news story ${currStory.title}?`)) {
      this.setState({currentlyDeleting: true});
      deleteData("/api/news", e.currentTarget.id)
        .then((response) => {
          const message = response.error || response.message;
          this.setState({
            currentlyDeleting: false,
          });
          this.props.updateMessage(message);
          this.getNews();
        });
    }
  }

  onSortEnd({oldIndex, newIndex}) {
    const newStories = arrayMove(this.state.news, oldIndex, newIndex)
      .map((story, index) => {
        story.index = index;
        return story;
      });
    this.setState({
      news: newStories,
      currentlySaving: true
    });

    putData("/api/news", newStories)
      .then((response) => {
        const message = response.error || response.message;
        this.setState({
          currentlySaving: false
        });
        this.props.updateMessage(message);
        this.getNews();
      });
  }

  removeImage() {
    this.setState({
      newsImage: "",
      newsImagePath: "",
      newsImageFile: "",
    });
  }

  handleSubmitNewsStory(e) {
    e.preventDefault();

    this.setState({currentlySaving: true});

    let newsStory = new FormData();
    newsStory.append("_id", this.state.newsId);
    newsStory.append("title", this.state.newsTitle);
    newsStory.append("image", this.state.newsImage);
    newsStory.append("imageFile", this.state.newsImageFile);
    newsStory.append("alt", this.state.newsImageAlt);
    newsStory.append("article", this.state.newsArticle.toString("html"));
    newsStory.append("index", this.state.newsIndex);
    
    postData("/api/news", newsStory)
      .then((response) => {
        const message = response.error || response.message;
        this.setState({
          currentlySaving: false,
          addNewOpen: false,
          newsId: "",
          newsTitle: "",
          newsImage: "",
          newsImagePath: "",
          newsImageFile: "",
          newsImageAlt: "",
          newsArticle: RichTextEditor.createEmptyValue(),
        });
        this.props.updateMessage(message);
        this.getNews();
      });
  }

  render() {
    document.title = "Home | Rising Phoenix CMS";

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
        <h2>Home</h2>
        {this.state.error ?
          <p>Sorry, something went wrong. Please try again later.</p>
          :
          <div>
            <form onSubmit={this.state.currentlySaving ? (e)=>{e.preventDevault();} : this.handleSubmitInfo}>
              <TextInput 
                id="tagline"
                label="Tagline:"
                value={this.state.tagline}
                handleChange={this.handleChange}
                maxLength={100}
              />
              <TextInput 
                id="blurbTitle"
                label="Title of Rising Phoenix info:"
                value={this.state.blurbTitle}
                handleChange={this.handleChange}
                maxLength={100}
              />
              <TextAreaInput 
                id="blurb"
                label="Brief information about Rising Phoenix/Robeson Planetarium:"
                value={this.state.blurb}
                handleChange={this.handleChange}
                maxLength={750}
                inputStyle={{height: 150}}
                labelStyle={homeStyles.modalContent.textareaLabel}
              />
              {/* <div>
                <label htmlFor="goalAmount" style={inputStyles.label}>Goal Amount:</label>
                <div style={{display: "inline-block", maxWidth: "90%", whiteSpace: "nowrap"}}>
                  $ <input 
                    type="number" 
                    id="goalAmount" 
                    value={this.state.goalAmount} 
                    style={inputStyles.inputText}
                    maxLength={20}
                    onChange={this.handleChange}
                  />
                </div>
              </div> */}
              <div>
                <label htmlFor="donatedAmount" style={inputStyles.label}>Amount Donated:</label>
                <div style={{display: "inline-block", maxWidth: "90%", whiteSpace: "nowrap"}}>
                  $ <input 
                    type="number" 
                    id="donatedAmount" 
                    value={this.state.donatedAmount} 
                    style={inputStyles.inputText}
                    maxLength={20}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <SaveButton currentlySaving={this.state.currentlySaving} info={true} />
            </form>


            <h2 style={homeStyles.newsHeader}>News Stories</h2>
            
            <AddNewButton handleAdd={this.handleAdd} style={homeStyles.addNewButton} />

            {/* modal to enter new news story */}
            {this.state.addNewOpen && 
              <div style={containerStyles.modalContainer}>
                <form 
                  onSubmit={this.state.currentlySaving ? (e) => e.preventDefault() : this.handleSubmitNewsStory}
                  style={[containerStyles.modalContent, homeStyles.modalContent]}
                >
                  <p style={{fontSize: "0.9em", color: "#777", marginTop: 0}}>Fields marked with a * are required.</p>
                  <TextInput 
                    id="newsTitle"
                    label="Title:"
                    value={this.state.newsTitle}
                    handleChange={this.handleChange}
                    maxLength={100}
                    required={true}
                    modal={true}
                    labelStyle={homeStyles.modalContent.label}
                    inputStyle={homeStyles.modalContent.input}
                  />
                  <ImageInput 
                    id="newsImage" 
                    label="Image:"
                    modal={true}
                    value={this.state.newsImagePath}
                    handleChange={this.handleChange}
                    labelStyle={homeStyles.modalContent.label}
                    containerStyle={homeStyles.modalContent.fileInputContainer}
                  />
                  <ImagePreview  
                    image={this.state.newsImage} 
                    path={this.state.newsImagePath} 
                    file={this.state.newsImageFile} 
                    alt={this.state.alt} 
                    removeImage={this.removeImage} 
                  />
                  <TextInput 
                    id="newsImageAlt"
                    label="Brief description of image:"
                    value={this.state.newsImageAlt}
                    handleChange={this.handleChange}
                    maxLength={100}
                    modal={true}
                    labelStyle={homeStyles.modalContent.label}
                    inputStyle={homeStyles.modalContent.input}
                  />
                  <div>
                    <label htmlFor="newsArticle" style={[inputStyles.label, inputStyles.modal.label, homeStyles.modalContent.articleLabel]}>Article:</label>
                    <RichTextEditor
                      id="newsArticle"
                      toolbarConfig={toolbarConfig}
                      value={this.state.newsArticle}
                      onChange={this.handleChange}
                      className="rte-component"
                      editorClassName="rte-editor"
                    />
                  </div>
                  
                  <SaveButton currentlySaving={this.state.currentlySaving} modal={true} />
                  <CancelButton currentlySaving={this.state.currentlySaving} handleCancel={this.handleCancel} />

                </form>
              </div>
            }

            {/* list of current news stories */}
            <div style={containerStyles.listContainer}>
              <SortableNewsList 
                itemList={this.state.news}
                itemType="news" 
                onSortEnd={this.onSortEnd} 
                currentlyDeleting={this.state.currentlyDeleting}
                handleEdit={this.handleEdit}
                handleDelete={this.handleDelete}
                lockAxis="y"
                distance={10}
                useDragHandle={true}
                lockToContainerEdges={true}
                disabled={this.state.currentlySaving}
                fieldList={(story) => 
                  [
                    {label: "Title:", content: story.title},
                    {label: "Image:", content: story.image ? `<img class="card-img" src="https://s3.us-east-2.amazonaws.com/risingphoenix/${story.image}" alt=${story.alt}/>` : ""},
                    {label: "Image Alt Text:", content: story.alt},
                    {rte: true, value: RichTextEditor.createValueFromString(story.article, "html")}
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
HomeCMS = Radium(HomeCMS);
  
export default HomeCMS;