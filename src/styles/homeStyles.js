import sv from './styleVariables';
import color from 'color';
import fire from '../img/fire.png';
import DATA from '../data.js';

const phoenixHeight = 400;

const percentGoal = DATA.home.donatedAmount / DATA.home.goalAmount;
const fakePercent = percentGoal / (percentGoal + .08);
const clipAmount = phoenixHeight - (phoenixHeight * fakePercent);

const homeStyles = {
  header: {
    margin: '3em 0 0 0',
    height: '58vh',
    background: `#222 url("${fire}") center top/cover no-repeat fixed`,
    textAlign: 'center',
    textShadow: '0 3px 3px rgba(0,0,0,0.9)', 
    paddingTop: '15vh',
    zIndex: 2,
    transition: 'all 0.3s ease',
    '@media (max-width: 450px)': {
      paddingTop: '10vh',
      height: '61vh',
    },
    '@media (min-width: 2000px)': {
      paddingTop: '18vh',
      height: '55vh',
    },
    h1: {
      fontFamily: sv.fontTitle,
      margin: 0,
      fontSize: '5em',
      color: '#eee',
      padding: '0 10%',
      transition: 'all 0.3s ease',
      '@media (max-width: 1000px)': {
        fontSize: '4.5em',
      },
      '@media (max-width: 750px)': {
        fontSize: '3.5em',
      },
      '@media (min-width: 2000px)': {
        fontSize: '6em',
      },
    },
    h2: {
      fontWeight: 'normal',
      fontSize: '1.5em',
      width: '40%',
      margin: '2.5em auto 0 auto',
      lineHeight: '150%',
      color: '#fff',
      transition: 'all 0.3s ease',
      '@media (max-width: 1100px)': {
        width: '50%',
        margin: '2em auto 0 auto',
      },
      '@media (max-width: 1000px)': {
        fontSize: '1.3em',
        width: '60%',
        margin: '4em auto 0 auto',
      },
      '@media (max-width: 750px)': {
        fontSize: '1.2em',
        margin: '1em auto 0 auto',
      },
      '@media (max-width: 450px)': {
        fontSize: '1.1em',
        width: '80%',
        margin: '3.5em auto 0 auto',
      },
      '@media (min-width: 2000px)': {
        fontSize: '2em',
        width: '50%',
        margin: '5em auto 0 auto',
      },
    },
  },

  main: {
    textAlign: 'center',
    zIndex: 1,
    giveContainer: {
      backgroundColor: 'white',
      borderRadius: '18px',
      display: 'inline-block',
      transform: 'translateY(-3.8em)',
      '@media (max-width: 1000px)': {
        transform: 'translateY(-4.2em)',
      },
      '@media (max-width: 750px)': {
        transform: 'translateY(-4.9em)',
        marginTop: '2.5em',
      },
      '@media (min-width: 2000px)': {
        transform: 'translateY(-4.5em)',
      },
    },
    giveLink: {
      backgroundColor: sv.red,
      color: 'white',
      fontFamily: sv.fontTitle,
      fontSize: '2em',
      margin: '0.5em',
      padding: '0.4em 3em',
      borderRadius: '12px',
      textDecoration: 'none',
      height: '100%',
      display: 'inline-block',
      transition: 'all 0.4s ease',
      ':hover': {
        backgroundColor: color(sv.red).lighten(0.2),
      },
      '@media (max-width: 1000px)': {
        fontSize: '1.6em',
      },
      '@media (max-width: 750px)': {
        fontSize: '1.3em',
      },
      '@media (min-width: 2000px)': {
        fontSize: '3em',
      },
    },
    main: {
      display: 'flex',
      marginTop: '-7em',
      padding: '4em 2em 3em 2em',
      backgroundColor: sv.bgLight,
      transition: 'all 0.3s ease',
      '@media (max-width: 1160px)': {
        flexDirection: 'column-reverse',
        padding: '3em 2em',
      },
      '@media (max-width: 450px)': {
        padding: '3em 1em 3em 1em',
      },
      '@media (min-width: 2000px)': {
        marginTop: '-10em',
        padding: '6em 5em 3em 5em',
      },
    },
    blurb: {
      textAlign: 'left',
      flexBasis: '40%',
      fontSize: '0.95em',
      lineHeight: '150%',
      whiteSpace: 'pre-wrap',
      padding: '0 1em',
      transition: 'all 0.3s ease',
      '@media (max-width: 1270px)': {
        flexBasis: '30%',
      },
      '@media (max-width: 1160px)': {
        textAlign: 'center',
      },
      '@media (min-width: 2000px)': {
        flexBasis: '50%',
        fontSize: '1.1em',
        padding: '0 2em',
      },
    },
    learnMoreLink: {
      ...sv.linkStyle
    },
    progress: {
      flexBasis: '60%',
      position: 'relative',
      margin: '1em 0 0 2em',
      border: '1px solid rgba(0,0,0,0.15)',
      borderRadius: '10px',
      backgroundColor: 'white',
      transition: 'all 0.3s ease',
      '@media (max-width: 1270px)': {
        flexBasis: '70%',
      },
      '@media (max-width: 1160px)': {
        width: '80%',
        margin: '1em auto',
      },
      '@media (max-width: 960px)': {
        width: '100%',
      },
      '@media (max-width: 650px)': {
        margin: '0 auto 1em auto',
      },
      '@media (min-width: 2000px)': {
        flexBasis: '40%',
        margin: '1em 3em 0 5em',
      },
    },
    phoenix: {
      height: phoenixHeight,
      position: 'absolute',
      right: 0,
      transition: 'all 0.3s ease',
      '@media (max-width: 750px)': {
        height: phoenixHeight*0.8,
      },
      '@media (max-width: 650px)': {
        bottom: '30px',
        marginLeft: 'auto',
        marginRight: 'auto',
        left: 0,
        height: phoenixHeight*0.65,
      },
      '@media (min-width: 2000px)': {
        right: '3em',
        top: '1em'
      },
    },
    phoenixFilled: {
      height: phoenixHeight,
      position: 'absolute',
      right: 0,
      clip: `rect(${clipAmount}px,400px,400px,0px)`,
      transition: 'all 0.3s ease',
      '@media (max-width: 750px)': {
        height: phoenixHeight*0.8,
        clip: `rect(${clipAmount*0.8}px,400px,400px,0px)`,
      },
      '@media (max-width: 650px)': {
        bottom: '30px',
        marginLeft: 'auto',
        marginRight: 'auto',
        left: 0,
        height: phoenixHeight*0.65,
        clip: `rect(${clipAmount*0.65}px,400px,400px,0px)`,
      },
      '@media (min-width: 2000px)': {
        right: '3em',
        top: '1em'
      },
    },
    progressBox: {
      float: 'left',
      borderRadius: '10px',
      margin: '2em 1em',
      padding: '0.5em',
      fontSize: '1.4em',
      backgroundColor: color(sv.lightBrown).lighten(1.0),
      border: '1px solid rgba(0,0,0,0.05)',
      // boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.2), inset 0 -1px 1px rgba(0,0,0,0.2), 0 2px 4px rgba(0,0,0,0.2)',
      boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
      transition: 'all 0.3s ease',
      '@media (max-width: 1270px)': {
        margin: '2em',
      },
      '@media (max-width: 960px)': {
        margin: '2em 1em',
      },
      '@media (max-width: 750px)': {
        fontSize: '1.2em',
      },
      '@media (max-width: 650px)': {
        float: 'none',
        width: '70%',
        margin: `2em auto ${(phoenixHeight*0.65) + 50}px auto`
      },
      '@media (min-width: 2000px)': {
        margin: '2em 3em',
        padding: '1em',
        fontSize: '1.5em'
      },
      label: {
        color: sv.lightBrown,
        padding: '0.8em',
        // opacity: 0.9
      },
      amount: {
        fontSize: "1.8em",
        padding: '0 0 0.8em 0',
        color: sv.dark,
      },
    },    
  },

  ctas: {
    backgroundColor: sv.orange,
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: '2.5em 0',
    fontSize: '1.5em',
    textAlign: 'center',
    color: 'white',
    transition: 'all 0.3s ease',
    '@media (max-width: 1024px)': {
      fontSize: '1.3em',
      padding: '2em 0',
    },
    '@media (max-width: 768px)': {
      fontSize: '1.1em',
      padding: '2em 1em',
      justifyContent: 'space-around',
    },
    '@media (max-width: 750px)': {
      flexDirection: 'column',
    },
    contact: {
      transition: 'all 0.3s ease',
      '@media (max-width: 750px)': {
        marginBottom: '3em',
      },
    },
    getInTouch: {
      display: 'inline-block',
      border: '3px solid white',
      color: 'white',
      textDecoration: 'none',
      fontSize: '0.8em',
      padding: '0.5em 1em',
      margin: '1em 0 0 0',
      borderRadius: 7,
      transition: 'background-color 0.4s ease',
      ':hover': {
        color: sv.orange,
        backgroundColor: 'white',
        fontWeight: 600,
      }
    },
    subscribeText: {
      margin: '0.7em 1em 0.3em 1em',
      fontSize: '0.95em',
    },
    emailInput: {
      padding: '0.5em',
      transition: 'all 0.3s ease',
      '@media (max-width: 768px)': {
        padding: '0.35em',
      },
    },
    emailSubmit: {
      height: '2.3em',
      border: 'none',
      padding: '0 1em',
      cursor: 'pointer',
      backgroundColor: '#eee',
      transition: 'background-color 0.4s ease',
      ':hover': {
        color: 'black',
        backgroundColor: '#ddd',
        outline: '1px solid rgba(0,0,0,0.1)'
      },
      '@media (max-width: 768px)': {
        height: '2em',
      },
    }
  },

  news: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '2em',
    justifyContent: 'space-evenly',
    backgroundColor: sv.bgLight,
    transition: 'all 0.3s ease',
    '@media (max-width: 450px)': {
      padding: '1em',
    },
    newsItem: {
      flexBasis: '550px',
      boxSizing: 'border-box',
      border: '1px solid rgba(0,0,0,0.1)',
      boxShadow: '0 10px 30px -7px rgba(0,0,0,0.25)',
      borderRadius: 5,
      margin: '1em',
      padding: '2em',
      backgroundColor: 'white',
      transition: 'all 0.3s ease',
      '@media (max-width: 1230px)': {
        flexBasis: '440px',
      },
      '@media (max-width: 450px)': {
        margin: '1em 0.5em',
        padding: '1em',
      },
    },
    newsImage: {
      display: 'block',
      maxWidth: '100%',
      height: 'auto',
      margin: '0 auto 1.3em auto'
    },
    header: {
      margin: '0 0 0.2em 0',
      fontSize: '1.7em',
      fontWeight: 600,
      // color: sv.lightBrown
      ...sv.linkStyle
    },
    date: {
      fontStyle: 'italic',
      fontSize: '0.95em',
    },
    preview: {
      margin: '1rem 0 0 0',
    },
    readMore: {
      ...sv.linkStyle,
      display: 'block',
      margin: '1em 0 0 0'
    }
  }, 

  sponsors: {
    backgroundColor: sv.lightBrown,
    padding: '2em',
    textAlign: 'center',
    fontSize: '1.3em',
    color: 'white',
    link: {
      ...sv.linkStyle
    }
  }
}

export default homeStyles;
