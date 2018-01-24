import React, {Component} from "react";
import { arrayMove, SortableContainer, SortableElement, SortableHandle } from "react-sortable-hoc";
import RichTextEditor from "react-rte";
import generalStyles from "../styles/admin/generalStyles";
import homeStyles from "../styles/admin/homeStyles";
import "../styles/admin/externalComponentStyles.css";
import Radium from "radium";
import { getData, postData, deleteData, putData } from "../utils/apiCalls";

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

const SortableNewsStory = SortableElement(({story, currentlyDeleting, handleEdit, handleDelete}) =>
  <div 
    className="card"
    id={story._id} 
    key={`sortable-element-${story._id}`}
  >
    <DragHandle />
    <div className="row-container">
      <div className="card-label">Title:</div>
      <div className="card-content title">{story.title}</div>
    </div>
    {story.image && <div className="row-container">
      <div className="card-label">Image:</div>
      <div className="card-content">
        <img class="card-img" src={`https://s3.us-east-2.amazonaws.com/risingphoenix/${story.image}`} alt={story.alt}/>
      </div>
    </div>}
    {story.alt && <div className="row-container">
      <div className="card-label">Image Alt Text:</div>
      <div className="card-content">{story.alt}</div>
    </div>}
    <RichTextEditor
      value={RichTextEditor.createValueFromString(story.article, "html")}
      readOnly={true}
      className='rte-card'
    />
    <button 
      type="button"
      title="Edit"
      className={`edit ${currentlyDeleting ? "edit-disabled" : ""}`}
      onClick={currentlyDeleting ? (e)=> e.preventDefault() : handleEdit}
      id={story._id}
      key={`edit-${story._id}`}
    >
      <i className="fa fa-pencil"></i>
    </button>
    <button 
      type="button"
      title="Delete" 
      className={`delete ${currentlyDeleting ? "delete-disabled" : ""}`}
      onClick={currentlyDeleting ? (e)=> e.preventDefault() : handleDelete}
      id={story._id}
      key={`delete-${story._id}`}
    >
      <i className="fa fa-trash"></i>
    </button>
  </div>
);

const SortableNewsList = SortableContainer(({newsList, currentlyDeleting, handleEdit, handleDelete, disabled}) => {
  return (
    <div>
      {newsList.map((story, index) => (
        <SortableNewsStory 
          story={story} 
          key={`news-${story._id}`}
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


class HomeCMS extends Component {
  constructor() {
    super();

    this.state = {
      tagline: "",
      blurbTitle: "",
      blurb: "",
      goalAmount: "",
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
          goalAmount: doc.goalAmount,
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

    const goalAmount = typeof this.state.goalAmount === "string" ? 
      this.state.goalAmount.replace(/,/g, "") 
      :
      this.state.goalAmount;
    const donatedAmount = typeof this.state.donatedAmount === "string" ?
      this.state.donatedAmount.replace(/,/g, "")
      :
      this.state.donatedAmount;

    const homeInfo = {
      tagline: this.state.tagline,
      blurbTitle: this.state.blurbTitle,
      blurb: this.state.blurb,
      goalAmount: goalAmount,
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
              <div>
                <label htmlFor="tagline" style={generalStyles.label}>Tagline:</label>
                <input 
                  type="text" 
                  id="tagline" 
                  value={this.state.tagline} 
                  style={generalStyles.inputText}
                  maxLength={100}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <label htmlFor="blurb" style={[generalStyles.label, generalStyles.textareaLabel, homeStyles.modalContent.textareaLabel]}>Short blurb about Rising Phoenix:</label>
                <textarea
                  id="blurb" 
                  value={this.state.blurb} 
                  style={[generalStyles.inputText, {height: 150}]}
                  maxLength={750}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <label htmlFor="blurbTitle" style={generalStyles.label}>Title of blurb:</label>
                <input 
                  type="text" 
                  id="blurbTitle" 
                  value={this.state.blurbTitle} 
                  style={generalStyles.inputText}
                  maxLength={100}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <label htmlFor="goalAmount" style={generalStyles.label}>Goal Amount:</label>
                <div style={{display: "inline-block", maxWidth: "90%", whiteSpace: "nowrap"}}>
                  $ <input 
                    type="number" 
                    id="goalAmount" 
                    value={this.state.goalAmount} 
                    style={generalStyles.inputText}
                    maxLength={20}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="donatedAmount" style={generalStyles.label}>Amount Donated:</label>
                <div style={{display: "inline-block", maxWidth: "90%", whiteSpace: "nowrap"}}>
                  $ <input 
                    type="number" 
                    id="donatedAmount" 
                    value={this.state.donatedAmount} 
                    style={generalStyles.inputText}
                    maxLength={20}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <button style={[generalStyles.submitButton, this.state.currentlySaving && generalStyles.submitButton.disabled]}>Save Info</button>
            </form>


            <h2 style={homeStyles.newsHeader}>News Stories</h2>
            {/* button to add new news story */}
            <div 
              key="addNew" 
              style={[generalStyles.addNewButton, homeStyles.addNewButton]} 
              onClick={this.handleAdd}
            >
              <i className="fa fa-plus" aria-hidden="true" style={{marginRight: 20}}></i> Add new
            </div>

            {/* modal to enter new news story */}
            {this.state.addNewOpen && 
              <div style={generalStyles.modalContainer}>
                <form 
                  onSubmit={this.state.currentlySaving ? (e) => e.preventDefault() : this.handleSubmitNewsStory}
                  style={[generalStyles.modalContent, homeStyles.modalContent]}
                >
                  <p style={{fontSize: "0.9em", color: "#777", marginTop: 0}}>Fields marked with a * are required.</p>
                  <div>
                    <label htmlFor="newsTitle" style={[generalStyles.label, generalStyles.modalContent.label, homeStyles.modalContent.label]}>Title <span>*</span> :</label>
                    <input 
                      type="text" 
                      id="newsTitle" 
                      value={this.state.newsTitle} 
                      style={[generalStyles.inputText, generalStyles.modalContent.input, homeStyles.modalContent.input]}
                      maxLength={100}
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                  <div>
                    <div style={[generalStyles.label, generalStyles.modalContent.label, homeStyles.modalContent.label]}>Image:</div>
                    <div style={[generalStyles.modalContent.fileInputContainer, homeStyles.modalContent.fileInputContainer]}>
                      <label 
                        htmlFor="newsImage" 
                        style={generalStyles.modalContent.fileInput}
                        key="fileInput"
                      >
                        Choose a File
                      </label>
                      <input 
                        type="file" 
                        accept="image/*" 
                        id="newsImage"
                        style={{opacity: 0, width: 0, height: 0}}
                        value={this.state.newsImagePath}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="preview" style={[generalStyles.modalContent.filePreview, homeStyles.modalContent.filePreview]}>
                      {
                        this.state.newsImage ? 
                          <div>
                            <i 
                              className="fa fa-times" 
                              title="remove image"
                              onClick={this.removeImage}
                              style={generalStyles.modalContent.removeImage}
                            ></i>
                            <img 
                              src={`https://s3.us-east-2.amazonaws.com/risingphoenix/${this.state.newsImage}`}
                              alt={this.state.alt} 
                              style={generalStyles.modalContent.filePreview.image}
                            />
                            <p style={{marginBottom: 0}}>{this.state.newsImage}</p>
                          </div>
                          :
                          this.state.newsImagePath ? 
                            <div>
                              <i 
                                className="fa fa-times" 
                                title="remove image"
                                onClick={this.removeImage}
                                style={generalStyles.modalContent.removeImage}
                              ></i>
                              <img 
                                src={window.URL.createObjectURL(this.state.newsImageFile)}
                                alt={this.state.alt}
                                style={generalStyles.modalContent.filePreview.image}
                              />
                              <p style={{marginBottom: 0}}>{this.state.newsImageFile.name}</p>
                            </div>
                            :
                            <p>No file currently selected.</p>
                      }
                    </div>
                  </div>
                  <div>
                    <label htmlFor="newsImageAlt" style={[generalStyles.label, generalStyles.modalContent.label, homeStyles.modalContent.label]}>Brief description of image:</label>
                    <input 
                      type="text" 
                      id="newsImageAlt" 
                      value={this.state.newsImageAlt} 
                      style={[generalStyles.inputText, generalStyles.modalContent.input, homeStyles.modalContent.input]}
                      maxLength={100}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="newsArticle" style={[generalStyles.label, generalStyles.modalContent.label, homeStyles.modalContent.articleLabel]}>Article:</label>
                    <RichTextEditor
                      id="newsArticle"
                      toolbarConfig={toolbarConfig}
                      value={this.state.newsArticle}
                      onChange={this.handleChange}
                      className="rte-component"
                      editorClassName="rte-editor"
                    />
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

            {/* list of current news stories */}
            <div style={generalStyles.listContainer}>
              <SortableNewsList 
                newsList={this.state.news} 
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
HomeCMS = Radium(HomeCMS);
  
export default HomeCMS;