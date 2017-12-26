import sv from './styleVariables';

const footerStyles = {
  footer: {
    backgroundColor: sv.dark,
    textAlign: 'center',
    padding: '1em',
  },
  links: {
    fontSize: '1.7em',
    margin: 'auto',
    width: '200px',
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: '0.3em'
  },
  copyright: {
    color: sv.light,
  },
  gfmLogo: {
    borderRadius: '5px',
    height: "0.87em",
    width: "auto",
    marginTop: '0.15em',
  },
  facebookLogo: {
    color: sv.facebookBlue,
  },
  twitterLogo: {
    color: sv.twitterBlue,
  },
}

export default footerStyles;
