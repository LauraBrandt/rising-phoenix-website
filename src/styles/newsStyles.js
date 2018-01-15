import sv from './styleVariables';

const articleStyles = {  
  article: {
    ...sv.mainStyle,
    minHeight: '90vh',
    margin: '2em 0 0 0',
    transition: 'all 0.3s ease',
    '@media (max-width: 850px)': {
      margin: '3em 0 0 0',
    },
    image: {
      display: 'block',
      maxWidth: '100%',
      height: 'auto',
    },
    header: {
      ...sv.h1Style,
      color: '#444',
      margin: '0.8em 0 0 0',
    },
    date: {
      color: '#999',
      fontSize: '0.95em',
      margin: '0.5em 0.5em 0 0.5em'
    },
    hr: {
      ...sv.hrStyle
    },
    article: {
      whiteSpace: 'pre-wrap',
    }
  },

  newsList: {
    ...sv.mainStyle,
    padding: '5em',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: sv.bgLight,
    transition: 'all 0.3s ease',
    '@media (max-width: 850px)': {
      padding: '5em 0',
    },
    '@media (max-width: 550px)': {
      padding: '5em 0',
    },
    '@media (max-width: 350px)': {
      fontSize: '0.95em',
    },
    item: {
      boxSizing: 'border-box',
      border: '1px solid rgba(0,0,0,0.1)',
      boxShadow: '0 10px 30px -7px rgba(0,0,0,0.25)',
      borderRadius: 5,
      width: '80%',
      margin: '1em',
      padding: '2em',
      backgroundColor: 'white',
      transition: 'all 0.3s ease',
      '@media (max-width: 450px)': {
        margin: '1em 0.5em',
        padding: '1em',
      },
    },
    image: {
      display: 'block',
      maxWidth: '100%',
      height: 'auto',
      margin: '0 auto 1.3em auto'
    },
    header: {
      margin: '0 0 0.2em 0',
      fontSize: '1.7em',
      fontWeight: 600,
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
}

export default articleStyles;
