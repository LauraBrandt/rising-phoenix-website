import sv from './styleVariables';

const notFoundStyles = {  
  main: {
    ...sv.mainStyle,
    textAlign: 'center',
    marginTop: '10vh',
    '@media': {
      fontSize: '0.8em'
    }
  },
  h1: {
    fontSize: '6em'
  },
  p1: {
    fontSize: '1.8em'
  },
  p2: {
    fontSize: '1.3em'
  },
  button: {
    textDecoration: 'none',
    // color: sv.orange,
    backgroundColor: sv.orange,
    color: 'white',
    border: `3px solid ${sv.orange}`,
    borderRadius: 5,
    fontWeight: 600,
    display: 'inline-block',
    padding: '0.5em 1em',
    margin: '1em',    
    transition: 'all 0.4s',
    ':hover': {
      // backgroundColor: sv.orange,
      // color: 'white'
      color: sv.orange,
      backgroundColor: 'white',
    }
  }
}

export default notFoundStyles;
