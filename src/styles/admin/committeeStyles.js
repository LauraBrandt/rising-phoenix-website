const committeeStyles = {
  label: {
    width: 220, 
    fontSize: '1em',
    paddingRight: '1em',
    textAlign: 'right',
    '@media (max-width: 666px)': {
      paddingRight: 0,
      textAlign: 'center',
      width: 280
    }
  },
  input: {
    width: 330,
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
  memberListContainer: {
    width: '70%', 
    margin: 'auto',
    '@media (max-width: 800px)': {
      width: '100%'
    }
  },
  // card: {
  //   padding: '0.7em',
  //   display: 'flex',
  //   flexDirection: 'column',
  //   justifyContent: 'space-evenly',
  //   fontSize: '1.2em',
  //   '@media (max-width: 666px)': {
  //     fontSize: '0.9em',
  //   }
  // },
  rowContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: '0.2em',
    marginRight: 40,
  },
  cardLabel: {
    flexBasis: '35%',
    minWidth: '35%',
    textAlign: 'right',
    fontWeight: '600',
    paddingRight: '1em',
    color: '#888',
  },
  cardContent: {
    flexBasis: '65%',
    maxWidth: '60%',
    textAlign: 'left',
    overflowWrap: 'break-word',
  }
}

export default committeeStyles;