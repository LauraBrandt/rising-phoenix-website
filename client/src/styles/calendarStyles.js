import sv from './styleVariables';
// import color from 'color';

const calendarStyles = {
  main: {
    ...sv.mainStyle,
    backgroundColor: sv.bgLight,
  },
  event: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    margin: '0 0 2em 0',
    transition: 'all 0.3s ease',
    '@media (min-width: 2000px)': {
      width: '80%',
      margin: '0 auto 2em auto',
      justifyContent: 'space-evenly',
    }
  },
  calendarPage: {
    border: '1px solid rgba(0,0,0,0.1)',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.7), 0 1px 1px rgba(0,0,0,0.05)',
    borderRadius: '5px',
    backgroundColor: 'white',
    width: '5.8em',
    margin: '0.3em 2em 0 0',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    '@media (max-width: 450px)': {
      display: 'none'
    },
    month: {
      backgroundColor: sv.lightBrown,
      padding: '0.1em 0 0 0',
      fontSize: '0.95em',
      color: 'white',
      borderRadius: '5px 5px 0 0',
    },
    date: {
      fontSize: '1.8em',
      padding: '0.25em',
    },
    time: {
      borderTop: '1px solid rgba(0,0,0,0.1)',
      fontSize: '0.9em',
    },
  },
  eventInfo: {
    border: '1px solid rgba(0,0,0,0.1)',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.7), 0 1px 1px rgba(0,0,0,0.05)',
    borderRadius: '5px',
    backgroundColor: 'white',
    flexBasis: '80%',
    padding: '1.5em 2em',
    transition: 'all 0.3s ease',
    '@media (max-width: 450px)': {
      flexBasis: '100%',
      fontSize: '0.95em'
    },
    name: {
      fontSize: '1.8em',
    },
    minutes: {
      paddingLeft: '1em',
      fontSize: '0.55em',
      fontStyle: 'italic',
      opacity: '0.95'
    },
    minutesLink: {
      ...sv.linkStyle,
    },
    datetime: {
      fontWeight: '600',
      margin: '1em 0 0 0',
      color: '#494949'
    },
    location: {
      fontSize: '0.9em',
      color: '#494949'
    },
    description: {
      marginTop: '1em'
    },
  },
  header: {
    outer: {
      width: '100%',
      height: '100%',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      padding: '0 2em 0 1em',
      transition: 'all 0.3s ease',
      '@media (max-width: 450px)': {
        padding: '0.5em 2em',
      },
    },
    h1: {
      fontSize: '3.5em',
      margin: 0,
      transition: 'all 0.3s ease',
      '@media (max-width: 1024px)': {
        fontSize: '3em',
      },
      '@media (max-width: 745px)': {
        fontSize: '2.4em',
        margin: '0.3em 0 0 0',
      },
      '@media (min-width: 2000px)': {
        fontSize: '4.5em',
      }
    },
    cta: {
      fontSize: '1.3em',
      padding: '0 0 0.5em 0',
      transition: 'all 0.3s ease',
      '@media (max-width: 1024px)': {
        fontSize: '1.2em',
      },
      '@media (max-width: 745px)': {
        fontSize: '1em',
      },
      '@media (min-width: 2000px)': {
        fontSize: '1.8em',
      }
    },
    input: {
      height: '15px',
      padding: '0.3em 0.5em',
      border: 'inset 1px solid rgba(0,0,0,0.3)',
      margin: 0,
    },
    submit: {   
      backgroundColor: '#f5f5f5',
      border: '1px solid rgba(0,0,0,0.3)',
      height: '27px',      
      padding: '0.3em 1em',
      cursor: 'pointer',
      margin: '0 0 0 -1px',
      transition: 'all 0.4s ease',
      ':hover': {
        backgroundColor: '#e2e2e2',
      },
      ':active': {
        backgroundColor: '#e2e2e2',
      },
      ':focus': {
        backgroundColor: '#ddd',
        outline: 'none',
      }
    }
  }
}

export default calendarStyles;
