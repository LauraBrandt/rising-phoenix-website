const containerStyles = { 
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
};

export default containerStyles;  