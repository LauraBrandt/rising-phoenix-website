const generalStyles = {  
  inputText: {
    fontSize: '1em',
    padding: '0.8em 1.2em',
    margin: '1em auto',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxSizing: 'border-box',
    width: 500,
    maxWidth: '100%'
  },
  label: {
    fontSize: '1.2em',
    paddingRight: '2em',
    width: 235,
    maxWidth: '100%',
    display: 'inline-block'
  },
  submitButton: {
    fontSize: '1em',
    backgroundColor: '#F58C5F',
    color: 'white',
    padding: '0.8em 1.2em',
    margin: '1.5em auto',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: 180,
    display: 'block',
    ':hover': {
        backgroundColor: '#DE5E37',
    },
    disabled: {
      opacity: 0.8,
      cursor: 'auto',
      backgroundColor: '#F58C5F',
      ':hover': {
        backgroundColor: '#F58C5F'
      }
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
    padding: '1.5em 2.5em',
    boxSizing: 'border-box',
    text: {
      margin: '1em 0 3em 0',
      fontSize: '1.1em'
    }
  },
}

export default generalStyles;