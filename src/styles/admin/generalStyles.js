const generalStyles = {  
  inputText: {
    fontSize: "1em",
    padding: "0.8em 1.2em",
    margin: "1em auto",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxSizing: "border-box",
    width: 500,
    maxWidth: "100%"
  },
  label: {
    fontSize: "1.2em",
    paddingRight: "2em",
    width: 235,
    maxWidth: "100%",
    display: "inline-block"
  },
  modalContainer: {
    position: "fixed",
    zIndex: 1,
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    overflow: "hidden",
    backgroundColor: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  modalContent: {
    boxSizing: "border-box",
    padding: "2em",
    border: "1px solid #888",
    borderRadius: 5,
    boxShadow: "2px 3px 16px rgba(0,0,0,0.3)",
    backgroundColor: "#fdfdfd",
    width: "750px",
    maxWidth: "90%",
    maxHeight: "90%",
    overflowY: "auto",
    overflowX: "hidden",
    label: {
      width: 150,
      fontSize: "1em",
      paddingRight: "1em",
      textAlign: "right",
      "@media (max-width: 702px)": {
        paddingRight: 0,
        textAlign: "center",
        width: 280
      }
    },
    input: {
      width: 400,
      fontSize: "0.95em",
      padding: "0.5em",
    }, 
    fileInputContainer: {
      width: 400, 
      maxWidth: "100%", 
      display: "inline-block", 
      textAlign: "left",
      "@media (max-width: 700px)": {
        textAlign: "center"
      }
    },
    fileInput: {
      padding: "0.6em 1.5em",
      margin: "1em auto",
      border: "1px solid #777",
      borderRadius: "5px",
      boxSizing: "border-box",
      maxWidth: "99%",
      backgroundColor: "white",
      fontSize: "0.95em",
      display: "inline-block",
      cursor: "pointer",
      ":hover": {
        backgroundColor: "#eee"
      },
    },
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
      image: {
        maxWidth: "100%",
        maxHeight: "100%"
      }
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
    },
      },
  listContainer: {
    width: "70%", 
    margin: "auto",
    "@media (max-width: 1100px)": {
      width: "90%"
    },
    "@media (max-width: 800px)": {
      width: "100%"
    }
  },
  textareaLabel: {
    position: "relative", 
    bottom:"90px",
    "@media (max-width: 702px)": {
      position: "static",
    }
  },
  adminPanel: {
    textAlign: "center",
    padding: "3% 5%",
    boxSizing: "border-box",
  },
  login: {
    border: "1px solid rgba(0,0,0,0.3)",
    borderRadius: "10px",
    width: 375,
    maxWidth: "95%",
    margin: "5em auto 0 auto",
    padding: "1.5em 2.5em",
    boxSizing: "border-box",
    text: {
      margin: "1em 0 3em 0",
      fontSize: "1.1em"
    }
  },
};

export default generalStyles;