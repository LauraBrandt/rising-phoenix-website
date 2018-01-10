const donateStyles = {
  inputContainer: {
    display: 'flex', 
    justifyContent: 'center',
    '@media (max-width: 900px)': {
      flexDirection: 'column',
      alignItems: 'center'
    }
  },  
  label: {
    width: 390, 
    margin: '1em 0', 
    textAlign: 'right',
    '@media (max-width: 900px)': {
      margin: '1em 1em 0 1em',
      padding: 0,
      textAlign: 'center',
    }
  },
  input: {
    '@media (min-width: 901px)': {
      margin: '1em',
    }
  },
  textarea: {
    height: 80,
    '@media (min-width: 901px)': {
      margin: '1em',
    }
  },
  address: {
    width: 700, 
    maxWidth: '100%', 
    margin: 'auto',
    container: {
      border: '1px solid #bbb', 
      borderRadius: '5px', 
      boxSizing: 'border-box', 
      padding: '1em 2em',
      fontSize: '0.9em',
    },
    inputContainer: {
      '@media (max-width: 900px)': {
        flexDirection: 'row',
        alignItems: 'stretch'
      },
      '@media (max-width: 700px)': {
        flexDirection: 'column',
        alignItems: 'center'
      }
    },
    input: {
      padding: '0.6em 0.9em',
      margin: '0.5em', 
      width: 400,
    }
  }
}


export default donateStyles;