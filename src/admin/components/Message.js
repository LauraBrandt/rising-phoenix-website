import React from "react";
import Radium from "radium";

const style = {
  position: "fixed",
    bottom: 0,
    right: 0,
    margin: "1em", 
    color: "white", 
    padding: "0.8em 1em", 
    backgroundColor: "#42c2f4",
    icon: {
      marginLeft: 5, 
      float: "right", 
      fontSize: "1.3em", 
      cursor: "pointer"
    }
}

let Message = (props) => {
  return (
    <div style={style}>
      {props.message}
      <i 
        className="fa fa-times" 
        aria-hidden="true" 
        style={style.icon}
        onClick={props.closeMessage}
      ></i>
    </div>
  );
};
Message = Radium(Message);
  
export default Message;