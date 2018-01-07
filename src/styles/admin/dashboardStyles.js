const dashboardStyles = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  dashboardCard: {
    margin: '1em',
    border: '1px solid rgba(0,0,0,0.1)',
    borderRadius: 3,
    fontSize: '1.5em',
    width: '250px',
    height: '120px',
    boxShadow: '0 3px 12px 0 rgba(0,0,0,0.2)',
    transition: '0.3s',
    ':hover': {
      backgroundColor: '#f3f3f3'
    }
  },
  Link: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    padding: '1em',
    width: '100%',
    height: '100%',
    color: '#555',
    textTransform: 'uppercase',
    textDecoration: 'none'
  }
}

export default dashboardStyles;