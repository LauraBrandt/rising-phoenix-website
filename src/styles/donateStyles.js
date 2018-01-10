import sv from './styleVariables';

const donateStyles = {  
  main: {
    ...sv.mainStyle,
    marginTop: '1em',
    h2: {
      fontSize: '1.8em',
      margin: '0 0 0.5em 0',
    },
    donateText: {
      margin: '0 0 2em 0',
      whiteSpace: 'pre-line'
    },
    donateHeader: {
    },
    donateContainer: {
      margin: '1em 0 5em 0',
      display: 'flex',
      justifyContent: 'space-between',
      color: '#4d4d4d',
      backgroundColor: '#f5f5f5', //grey
      padding: '1em', //grey
      transition: 'all 0.3s ease',
      '@media (max-width: 550px)': {
        flexDirection: 'column',
      },
    },
    gfmContainer: {
      flexBasis: '40%',
      // padding: '2.5em 3em 2.5em 0', //white
      padding: '2em 3em 2em 2em', //grey
      borderRight: '2px solid #ccc',
      transition: 'all 0.3s ease',
      '@media (max-width: 550px)': {
        borderRight: 'none',
        borderBottom: '2px solid #ccc',
        padding: '1em 1em 2em 1em',
      },
    },
    gfmLink: {
      borderRadius: '8px',
      ':active': {
        backgroundColor: '#5d8421',
      },
      ':focus': {
        backgroundColor: '#5d8421',
        outline: 'none'
      }
    },
    gfmLogo: {
      borderRadius: '8px',
      maxWidth: "250px",
      height: "auto",
      transition: 'all 0.3s ease',
      '@media (max-width: 950px)': {
        maxWidth: "100%",
      },
    },
    checkContainer: {
      flexBasis: '60%',
      // padding: '2.5em 0 2.5em 4em', //white
      padding: '2em 0 2em 3em', //grey
      transition: 'all 0.3s ease',
      '@media (max-width: 550px)': {
        padding: '2em 1em 1em 1em',
      },
    },
    checkAddress: {
      fontSize: '0.95em',
      padding: '0.5em 0 0 2em',
      transition: 'all 0.3s ease',
      '@media (max-width: 550px)': {
        padding: '0.5em 0 0 1em',
      },
    },
    rewardText: {
      whiteSpace: 'pre-line'
    },
    rewardsTable: {
      margin: '2em 0 0.5em 0',
      color: '#333',
      borderBottom: '1px solid #ddd',
      borderTop: '1px solid #ddd',
      row: {
        display: 'flex',
        width: '100%',
        borderBottom: '1px solid #ddd',
        borderTop: '1px solid #ddd',
        borderCollapse: 'collapse',
        transition: 'all 0.2s ease',
        ':hover': {
          backgroundColor: "#f5f5f5"
        },
        ':active': {
          backgroundColor: "#f5f5f5"
        },
        ':focus': {
          backgroundColor: "#f5f5f5",
          outline: 'none'
        },
        '@media (max-width: 550px)': {
          flexDirection: 'column',
          padding: '0.5em 0'
        },
      },
      amtCol: {
        width: '20%',
        padding: '0.3em 0.7em',
        boxSizing: 'border-box',
        transition: 'all 0.3s ease',
        '@media (max-width: 1024px)': {
          width: '25%',
        },
        '@media (max-width: 800px)': {
          width: '29%',
        },
        '@media (max-width: 550px)': {
          width: '100%',
          padding: '0.1em 0.5em',
        },
        '@media (min-width: 2000px)': {
          width: '20%',
        },
      },
      nameCol: {
        width: '20%',
        padding: '0.3em 0.7em',
        boxSizing: 'border-box',
        transition: 'all 0.3s ease',
        '@media (min-width 801) and (max-width: 1024px)': {
          width: '30%'
        },
        '@media (min-width 551) and (max-width: 800px)': {
          width: '28%'
        },
        '@media (max-width: 550px)': {
          width: '100%',
          padding: '0.1em 0.5em',
        },
        '@media (min-width: 2000px)': {
          width: '20%',
        },
      },
      rewardCol: {
        width: '55%',
        padding: '0.3em 0.7em',
        boxSizing: 'border-box',
        transition: 'all 0.3s ease',
        '@media (min-width 801) and (max-width: 1024px)': {
          width: '45%',
        },
        '@media (min-width 551) and (max-width: 800px)': {
          width: '42%',
        },
        '@media (max-width: 550px)': {
          width: '100%',
          padding: '0.1em 0.5em',
        },
        '@media (min-width: 2000px)': {
          width: '60%',
        },
      },
    },
    footnote: {
      fontSize: '0.9em',
    }
  },

  header: {
    outer: {
      width: '100%',
      height: '100%',
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '2em',
      fontSize: '2.2em',
      transition: 'all 0.3s ease',
      '@media (max-width: 1024px)': {
        fontSize: '1.8em',
      },
      '@media (max-width: 745px)': {
        fontSize: '1.5em',
        justifyContent: 'center',
        paddingLeft: 0
      },
      '@media (min-width: 2000px)': {
        fontSize: '2.8em',
      }
    }
  }
}

export default donateStyles;
