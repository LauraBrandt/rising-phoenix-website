import sv from './styleVariables';
// import color from 'color';

const committeeStyles = {
  main: {
    ...sv.mainStyle,
  },
  ul: {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
  },
  li: {
    padding: '1%',
  },
  name: {
    fontSize: '1.3em',
    '@media (max-width: 550px)': {
      display: 'block',
      marginTop: '0.8em'
    }
  },
  organizationLink: {
    ...sv.linkStyle
  },
  header: {
    outer: {
      width: '100%',
      height: '100%',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      paddingLeft: '2.5em',
      fontSize: '1.8em',
      '@media (max-width: 1024px)': {
        fontSize: '1.5em',
        paddingLeft: '0.7em',
      },
      '@media (max-width: 745px)': {
        fontSize: '1.2em',
        alignItems: 'center',
        padding: '0 10%',
      },
      '@media (min-width: 2000px)': {
        fontSize: '2.5em',
      }
    }
  }
}

export default committeeStyles;
  