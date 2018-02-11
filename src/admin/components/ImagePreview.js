import React from "react";
import Radium from "radium";

const style = {
  filePreview: {
    width: "90%",
    margin: "auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: 5,
    backgroundColor: "#eee",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  image: {
    maxWidth: "100%",
    maxHeight: "100%"
  },
  removeImage: {
    position: "absolute",
    right: 0,
    top: 0,
    width: 25,
    height: 25,
    display: "flex",
    justifyContent: "center",
    alignItems: "center", 
    color: "white",
    backgroundColor: "#BE352D",
    fontSize: "1.2em",
    borderRadius: "0 5px 0 2px",
    cursor: "pointer"
  }
}

const ImagePreview = ({ image, path, file, alt, removeImage }) => {
  return (
    <div style={style.filePreview}>
      {image ?
        <div>
          <i 
            className="fa fa-times" 
            title="remove image"
            onClick={removeImage}
            style={style.removeImage}
          ></i>
          <img 
            src={`https://s3.us-east-2.amazonaws.com/risingphoenix/${image}`}
            alt={alt} 
            style={style.image}
          />
          <p style={{marginBottom: 0}}>{image}</p>
        </div>
        :
        path ?
          <div>
            <i 
              className="fa fa-times" 
              title="remove image"
              onClick={removeImage}
              style={style.removeImage}
            ></i>
            <img 
              src={window.URL.createObjectURL(file)}
              alt={alt} 
              style={style.image}
            />
            <p style={{marginBottom: 0}}>{file.name}</p>
          </div>
          :
          <p>No file currently selected.</p>
      }
    </div>
  );
}

export default Radium(ImagePreview);