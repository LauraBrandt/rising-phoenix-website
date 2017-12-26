import sv from './styleVariables';

const aboutStyles = {  
  main: {
    ...sv.mainStyle,
  },
  header: {
    outer: {
      width: '100%',
      height: '100%',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      paddingLeft: '1.5em',
      fontSize: '1.8em',
      '@media (max-width: 1024px)': {
        fontSize: '1.5em',
      },
      '@media (max-width: 745px)': {
        fontSize: '1.2em',
      },
      '@media (min-width: 2000px)': {
        fontSize: '2.5em',
      }
    }
  }
}

export default aboutStyles;
