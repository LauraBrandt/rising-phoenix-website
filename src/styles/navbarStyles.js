import sv from './styleVariables';
import color from 'color';

const navElemStyles = {
  fontSize: '0.95em',
  fontFamily: sv.fontDefault,
  color: sv.light,
  transition: 'all 0.4s ease',
  ':hover': {
    color: 'white',
  },
  ':active': {
    color: 'white',
  },  
};

const navElemWideStyles = {
  padding: '0.5em 1em 0.9em 1em',
};

const navElemNarrowStyles = {
  padding: '0.5em 1.3em',
  margin: '0.5em 0.2em',
  width: '100%',
  textAlign: 'left',
};

const LinkStyles = {
  display: 'block',
  textDecoration: 'none',
  ...navElemStyles,
};

const ulStyles = {
  listStyleType: 'none',
  display: 'flex',
};

const dropdownToggleStyles = {
  background: 'none',
  borderTop: 'none',
  borderBottom: 'none',
  borderLeft: 'none',
  borderRight: 'none',
  margin: 0,
  cursor: 'pointer',
  ...navElemStyles,  
};

const dropdownMenuStyles = {
  flexDirection: 'column',  
  backgroundColor: color(sv.dark).lighten(0.8),
};

const navbarStyles = {

  navbar: {
    position: 'fixed',
    left: 0,
    top: 0,
    right: 0,
    zIndex: 10,
  },

  wide: {
    navbar: {      
      backgroundColor: sv.dark,
      boxShadow: '0 3px 10px rgba(0, 0, 0, 0.5)',
      '@media (max-width: 745px)': {
        display: 'none'
      }
    },
    ul: {
      ...ulStyles,
      margin: '0 auto',
      padding: '.1em 0 0 0',
      justifyContent: 'space-around',
      alignItems: 'flex-end',
      width: '75%',
      transition: 'all 0.4s ease',
      '@media (max-width: 1025px)': {
        width: '90%',
      }
    },
    li: {
      borderRadius: '5px',
      position: 'relative',
    },
    Link: {
      ...LinkStyles,
      ...navElemWideStyles,
    },
    dropdownToggle: {
      ...dropdownToggleStyles,
      ...navElemWideStyles,
    },
    dropdownMenu: {
      ...ulStyles,
      ...dropdownMenuStyles,
      position: 'absolute',
      minWidth: '250px',
      margin: '-0.3em 0 0 0',
      padding: '.5em 0 .5em 0',
      boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
      zIndex: 20,
    },
    dropdownLi: {
      width: '100%',   
      transition: 'all 0.4s ease', 
      ':hover': {
        backgroundColor: color(sv.dark).lighten(1.2),
      },
      ':active': {
        backgroundColor: color(sv.dark).lighten(1.2),
      }
    },
    dropdownLink: {
    },
    donateLink: {
      color: 'white',
      padding: '0.4em 1em 0.5em 1em',
      margin: '0.5em 0 0.4em 0',
      backgroundColor: sv.red,
      border: `1px solid ${sv.red}`,
      borderRadius: 5,
      transition: 'all 0.4s ease',
      ':hover': {
        backgroundColor: color(sv.red).lighten(0.2),
        border: `1px solid ${color(sv.red).lighten(0.2)}`,
      }
    },
    current: {
      padding: '0.5em 1em 0.65em 1em',
      borderBottom: `4px solid ${sv.light}`,
      color: '#eee'
    },
    donateLinkCurrent: {
      padding: '0.4em 1em 0.5em 1em',
      borderBottom: 'none',
      color: 'white',
      backgroundColor: color(sv.red).lighten(0.2),
      border: `1px inset ${sv.red}`,
    },
    socialButtons: {
      fontSize: '1.5em',
      paddingBottom: '0.35em',
    },
    facebookButton: {
      color: sv.facebookBlue,
      marginRight: '.8em',
      transition: 'all 0.4s ease',
      ':hover': {
        color: color(sv.facebookBlue).lighten(0.2),
      },
      ':active': {
        color: color(sv.facebookBlue).lighten(0.2),
      },
      '@media (max-width: 1025px)': {
        marginRight: '.6em',
      }
    },
    twitterButton: {
      color: sv.twitterBlue,
      marginRight: '.8em',
      transition: 'all 0.4s ease',
      ':hover': {
        color: color(sv.twitterBlue).lighten(0.2),
      },
      ':active': {
        color: color(sv.twitterBlue).lighten(0.2),
      },
      '@media (max-width: 1025px)': {
        marginRight: '.6em',
      }
    },
  }, 


  narrow: {
    navbar: {
      '@media (min-width: 746px)': {
        display: 'none'
      }
    },
    topBar: {      
      backgroundColor: sv.dark,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 1%',
      boxShadow: '0 3px 10px rgba(0, 0, 0, 0.5)',
    },
    logo: {
      height: 50,
      width: 50,
      display: 'block',
      margin: '2% 0 2% 3%',
    },
    title: {
      fontFamily: sv.fontTitle,
      color: color(sv.light).lighten(0.3),
      margin: 0,
      fontSize: '1.3em'
    },
    barsButton: {
      color: color(sv.light).lighten(0.3),
      backgroundColor: sv.dark,
      border: 'none',
      fontSize: '1.5em',
      padding: '0.3em 0.5em',
      float: 'right',
    },
    ul: {
      ...ulStyles,
      backgroundColor: sv.dark,
      flexDirection: 'column',
      margin: '3.5em 0',
      padding: '0.5em 0',
      height: '100%',
      width: 0,
      position: 'fixed',
      zIndex: 20,
      overflowX: 'hidden',
      transition: '0.3s',
      top: 0,
      right: 0,
    },
    Link: {
      ...LinkStyles,
      ...navElemNarrowStyles,
      transition: '0.3s',
    },
    dropdownToggle: {
      ...dropdownToggleStyles,
      ...navElemNarrowStyles,
      display: 'block',
    },
    dropdownMenu: {
      ...ulStyles,
      ...dropdownMenuStyles,
      margin: 0,      
      padding: '0 1em',
    },
    dropdownLink: {
      margin: 0,
      padding: '0.5em 0',
      fontSize: '0.95em',
      width: 'auto',
    },    
    donateLink: {
      color: 'white',
      backgroundColor: sv.red,
      transition: 'all 0.4s ease',
      ':hover': {
        backgroundColor: color(sv.red).lighten(0.2),
      }
    },
    current: {
      padding: '0.5em 1.5em 0.5em 1.05em',
      borderLeft: `4px solid ${sv.light}`,
      color: '#eee'
    },
    donateLinkCurrent: {
      color: 'white',
      backgroundColor: color(sv.red).lighten(0.2),
    },
  },
  
  carat: {
    paddingLeft: '.5em',
  },
}

export default navbarStyles;
