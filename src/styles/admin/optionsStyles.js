const optionsStyles = {
  width: '100%',
  position: 'relative',
  marginBottom: '1em',
  back: {
    position: 'absolute',
    left: 0,
    top: 0,
    cursor: 'pointer',
    border: '1px solid rgba(0,0,0,0.3)', 
    borderRadius: '5px',
    padding: '0.2em 0.4em',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    backgroundColor: 'white',
    fontSize: '1.5em',
    color: 'black',
    Link: {
      color: '#111',
      textDecoration: 'none'
    }
  },
  menu: {
    textAlign: 'right',
  },
  button: {
    position: 'relative',
    right: 0,
    top: 0,
    cursor: 'pointer',
    fontSize: '1.5em', 
    display: 'inline-block', 
    border: '1px solid rgba(0,0,0,0.3)', 
    borderRadius: '5px',
    padding: '0.2em 0.4em',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    backgroundColor: 'white'
  },
  dropDown: {
    position: 'absolute',
    right: 0,
    zIndex: 1,
    border: '1px solid rgba(0,0,0,0.4)',
    marginTop: 1,
    boxShadow: '3px 3px 16px rgba(0,0,0,0.1)',
    borderRadius: '3px',
    backgroundColor: 'white',
    menuItem: {
      padding: '0.7em 1.3em',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: '#eee'
      }
    }
  },
}

export default optionsStyles;