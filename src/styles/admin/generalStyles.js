const generalStyles = {  
  inputText: {
    fontSize: '1em',
    padding: '0.8em 1.2em',
    margin: '1em 0',
    display: 'block',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxSizing: 'border-box',
    width: '100%',
  },
  submitButton: {
    fontSize: '1em',
    backgroundColor: '#F58C5F',
    color: 'white',
    padding: '0.8em 1.2em',
    margin: '0.5em 0',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',
    ':hover': {
        backgroundColor: '#DE5E37',
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
    padding: '2em',
    boxSizing: 'border-box',
    text: {
      margin: '1em 0 2em 0',
      fontSize: '1.1em'
    }
  }
}

export default generalStyles;