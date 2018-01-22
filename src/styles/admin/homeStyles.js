const homeStyles = {
  newsHeader: {
    marginTop: "3em",
  },
  addNewButton: {
    padding: "0.7em 0.5em",
    margin: "1.5em auto",
  },
  modalContent: {
    width: "900px",
    label: {
      width: 220,
      "@media (max-width: 850px)": {
        width: 150
      },
      "@media (max-width: 702px)": {
        width: 280
      }
    },
    articleLabel: {
      display: "block",
      width: "100%",
      textAlign: "left",
      margin: "2em 0.5em 1em 0.5em"
    },
    textareaLabel: {
      "@media (max-width: 880px)": {
        position: "static",
      }
    },
    input: {
      width: 450,
      "@media (max-width: 850px)": {
        width: 400
      },
    },
    fileInputContainer: {
      width: 450,
      "@media (max-width: 850px)": {
        width: 400
      },
    },
    filePreview: {
      width: "85%",
      margin: "1em auto",
    },
  }
};
  
  
export default homeStyles;