const generalStyles = {  
  inputText: {
    fontSize: '1em',
    padding: '0.8em 1.2em',
    margin: '1em auto',
    display: 'block',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxSizing: 'border-box',
    width: 500,
    maxWidth: '100%'
  },
  submitButton: {
    fontSize: '1em',
    backgroundColor: '#F58C5F',
    color: 'white',
    padding: '0.8em 1.2em',
    margin: '0.5em auto',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',
    display: 'block',
    ':hover': {
        backgroundColor: '#DE5E37',
    }
  },
  message: {
    position: 'fixed',
    bottom: 0,
    right: 0,
    margin: '1em', 
    color: 'white', 
    padding: '0.8em 1em', 
    backgroundColor: '#42c2f4',
    icon: {
      marginLeft: 5, 
      float: 'right', 
      fontSize: '1.3em', 
      cursor: 'pointer'
    }
  },
  adminPanel: {
    textAlign: 'center',
    padding: '3% 5%',
    boxSizing: 'border-box',
  },
  login: {
    border: '1px solid rgba(0,0,0,0.3)',
    borderRadius: '10px',
    width: 375,
    maxWidth: '95%',
    margin: '5em auto 0 auto',
    padding: '2.5em',
    boxSizing: 'border-box',
    text: {
      margin: '0 0 3em 0',
      fontSize: '1.1em'
    }
  }
}

export default generalStyles;