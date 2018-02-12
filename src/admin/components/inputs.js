import React from "react";
import Radium from "radium";
import inputStyles from "../../styles/admin/inputStyles";

let TextInput = (props) => {
  return (
    <div style={props.containerStyle}>
      <label 
        htmlFor={props.id} 
        style={[inputStyles.label, props.modal && inputStyles.modal.label, props.labelStyle]}
      >
        {props.label} {props.required && <span>*</span>}
      </label>
      <input 
        type={props.type || "text"} 
        id={props.id}
        value={props.value} 
        style={[inputStyles.inputText, props.modal && inputStyles.modal.input, props.inputStyle]}
        onChange={props.handleChange}
        maxLength={props.maxLength}
        required={props.required}
      />
    </div>
  );
}
TextInput = Radium(TextInput);


let TextAreaInput = (props) => {
  return (
    <div style={props.containerStyle}>
      <label 
        htmlFor={props.id} 
        style={[inputStyles.label, props.modal && inputStyles.modal.label, inputStyles.textareaLabel, props.labelStyle]}
      >
        {props.label}
      </label>
      <textarea 
        id={props.id} 
        value={props.value} 
        style={[inputStyles.inputText, props.modal && inputStyles.modal.input, props.inputStyle]}
        maxLength={props.maxLength}
        onChange={props.handleChange}
      />
    </div>
  );
}
TextAreaInput = Radium(TextAreaInput);

//id, label, value, modal, handleChange, labelStyle, containerStyle
let ImageInput = (props) => {
  return (
    <div>
      <div style={[inputStyles.label, props.modal && inputStyles.modal.label, props.labelStyle]}>{props.label}</div>
      <div style={[inputStyles.fileInputContainer, props.containerStyle]}>
        <label 
          htmlFor={props.id}
          style={inputStyles.fileInput}
          key="fileInput"
        >
          Choose a File
        </label>
        <input 
          type="file" 
          accept="image/*" 
          id={props.id}
          style={{opacity: 0, width: 0, height: 0}}
          value={props.value}
          onChange={props.handleChange}
        />
      </div>
    </div>
  );
}
ImageInput = Radium(ImageInput);


export {
  TextInput, TextAreaInput, ImageInput
}
