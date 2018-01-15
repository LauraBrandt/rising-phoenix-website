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
  addNewButton: {
    fontSize: '1.2em',
    width: 200,
    maxWidth: '100%',
    margin: '2em auto',
    padding: '0.8em',
    border: '1px solid rgba(0,0,0,0.2)',
    borderRadius: 5,
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    backgroundColor: 'white',
    backgroundImage: 'linear-gradient(to bottom, #fdfdfd, #e9e9e9)',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#eee',
      backgroundImage: 'linear-gradient(to bottom, #fafafa, #e0e0e0)',
    },
    ':active': {
      backgroundImage: 'linear-gradient(to bottom, #efefef, #f5f5f5)',
    },
  },
  modalContainer: {
    position: 'fixed',
    zIndex: 1,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    overflow: 'auto', //?
    backgroundColor: 'rgba(0,0,0,0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    boxSizing: 'border-box',
    padding: '2em',
    border: '1px solid #888',
    borderRadius: 5,
    boxShadow: '2px 3px 16px rgba(0,0,0,0.3)',
    backgroundColor: '#fdfdfd',
    width: '750px',
    maxWidth: '90%',
    label: {
      width: 150,
      fontSize: '1em',
      paddingRight: '1em',
      textAlign: 'right',
      '@media (max-width: 702px)': {
        paddingRight: 0,
        textAlign: 'center',
        width: 280
      }
    },
    input: {
      width: 400,
      fontSize: '0.95em',
      padding: '0.5em',
    }, 
    submit: {
      padding: '0.6em 0.8em',
      margin: '2em 2em 0 2em',
      width: 150,
      display: 'inline-block',
      '@media (max-width: 666px)': {
        margin: '1em 1em 0 1em',
      }
    },
    cancel: {
      fontSize: '1em',
      padding: '0.6em 0.8em',
      margin: '2em 2em 0 2em',
      borderRadius: '5px',
      cursor: 'pointer',
      width: 150, 
      backgroundColor: 'white',
      color: '#111',
      border: '1px solid rgba(0,0,0,0.4)',
      display: 'inline-block',
      ':hover': {
        'backgroundColor': '#ddd',
      },
      disabled: {
        opacity: 0.8,
        cursor: 'auto',
        ':hover': {
          backgroundColor: 'white',         
        }
      },
      '@media (max-width: 666px)': {
        margin: '1em 1em 0 1em',
      },
    },
  }, 
  memberListContainer: {
    width: '70%', 
    margin: 'auto',
    '@media (max-width: 1100px)': {
      width: '90%'
    },
    '@media (max-width: 800px)': {
      width: '100%'
    }
  },
  dragHandle: {
    position: 'absolute',
    left: 10,
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#afafaf',
    fontSize: '1.5em',
    cursor: 'pointer',
  },
  textareaLabel: {
    position: 'relative', 
    bottom:'90px',
    '@media (max-width: 702px)': {
      position: 'static',
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