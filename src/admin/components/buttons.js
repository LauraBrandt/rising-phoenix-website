import React from "react";
import Radium from "radium";

const addNewStyle = {
  fontSize: "1.2em",
  width: 200,
  maxWidth: "100%",
  margin: "2em auto",
  padding: "0.8em",
  border: "1px solid rgba(0,0,0,0.2)",
  borderRadius: 5,
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  backgroundColor: "white",
  backgroundImage: "linear-gradient(to bottom, #fdfdfd, #e9e9e9)",
  cursor: "pointer",
  ":hover": {
    backgroundColor: "#eee",
    backgroundImage: "linear-gradient(to bottom, #fafafa, #e0e0e0)",
  },
  ":active": {
    backgroundImage: "linear-gradient(to bottom, #efefef, #f5f5f5)",
  },
}

const submitStyle = {
  fontSize: "1em",
  backgroundColor: "#F58C5F",
  color: "white",
  padding: "0.8em 1.2em",
  margin: "1.5em auto",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  width: 180,
  display: "block",
  ":hover": {
    backgroundColor: "#DE5E37",
  },
  disabled: {
    opacity: 0.8,
    cursor: "auto",
    backgroundColor: "#F58C5F",
    ":hover": {
      backgroundColor: "#F58C5F"
    }
  },
  modal: {
    padding: "0.6em 0.8em",
    margin: "2em 2em 0 2em",
    width: 150,
    display: "inline-block",
    "@media (max-width: 666px)": {
      margin: "1em 1em 0 1em",
    }
  }  
}

const cancelStyle = {
  fontSize: "1em",
  padding: "0.6em 0.8em",
  margin: "2em 2em 0 2em",
  borderRadius: "5px",
  cursor: "pointer",
  width: 150, 
  backgroundColor: "white",
  color: "#111",
  border: "1px solid rgba(0,0,0,0.4)",
  display: "inline-block",
  ":hover": {
    "backgroundColor": "#ddd",
  },
  disabled: {
    opacity: 0.8,
    cursor: "auto",
    ":hover": {
      backgroundColor: "white",         
    }
  },
  "@media (max-width: 666px)": {
    margin: "1em 1em 0 1em",
  },
}

let AddNewButton = (props) => {
  return (
    <div style={[addNewStyle, props.style]} onClick={props.handleAdd}>
      <i className="fa fa-plus" aria-hidden="true" style={{marginRight: 20}}></i> Add new
    </div>
  );
}
AddNewButton = Radium(AddNewButton);


let SaveButton = (props) => {
  return (
    <button 
      type="submit"
      key="submit" 
      style={[submitStyle, props.modal && submitStyle.modal, props.currentlySaving && submitStyle.disabled]}
    >
      {props.info ? "Save Info" : "Save"}
    </button>
  );
}
SaveButton = Radium(SaveButton);

let CancelButton = (props) => {
  return (
    <button 
      type="button"
      key="cancel" 
      style={[cancelStyle, props.currentlySaving && cancelStyle.disabled]}
      onClick={props.handleCancel}
    >
      Cancel
    </button>
  );
}
CancelButton = Radium(CancelButton);

export {
  AddNewButton, SaveButton, CancelButton
}
