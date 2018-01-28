import React from "react";
import Radium from "radium";
import style from "../styles/navbarStyles";
// import logo from "../img/logo_ajeno.png";

let Link = require("react-router-dom").Link;
Link = Radium(Link);

const navElements = [
  {label: "Home", link: "/", isDropdown: false},
  {label: "About", isDropdown: true, sublinks: [
    {label: "What is this all about?", link: "/about"}, 
    {label: "Committee Members", link: "/committee-members"}
  ]},
  {label: "Calendar", link: "/calendar", isDropdown: false},
  {label: "Sponsors", isDropdown: true, sublinks: [
    {label: "Corporate Sponsors", link: "/corporate-sponsors"}, 
    {label: "Individual Sponsors", link: "/individual-sponsors"}
  ]},
  {label: "Donate", link: "/donate", isDropdown: false},
  {label: "Contact", link: "/contact", isDropdown: false},
];

const renderNavElements = (styleType) => {
  const path = window.location.pathname;
  return navElements.map((elem) => 
    (<li key={elem.label} style={style[styleType].li}>
      {elem.isDropdown ? 
        <DropDown 
          label={elem.label}
          sublinks={elem.sublinks}
          path={path}
          styleType={styleType}
        />
        :
        <Link 
          to={elem.link}
          style={[
            style[styleType].Link,
            path===elem.link && style[styleType].current,
            elem.label==="Donate" && style[styleType].donateLink,
            path===elem.link && elem.label==="Donate" && style[styleType].donateLinkCurrent
          ]}
        >
          {elem.label}
        </Link>
      }
    </li>)
  );
};

let NavbarWide = (props) => {
  return (
    <nav style={style.wide.navbar}>
      <ul style={style.wide.ul}>
        {renderNavElements("wide")}
        <li style={style.wide.socialButtons}>
          {props.links.facebook && <a href={props.links.facebook} style={style.wide.facebookButton} key="facebook"><i className="fa fa-facebook-square"></i></a>}
          {props.links.twitter && <a href={props.links.twitter} style={style.wide.twitterButton} key="twitter"><i className="fa fa-twitter-square"></i></a>}
        </li>
      </ul>
    </nav>
  );
};

class NavbarNarrow extends React.Component {
  constructor() {
    super();
    this.state = {
      showing: false,
    };
    this.toggleShowing = this.toggleShowing.bind(this);   
  }
  toggleShowing () {
    const currShowing = this.state.showing;
    this.setState({
      showing: !currShowing,
    });
  }
  render() {
    return (
      <nav style={style.narrow.navbar}>
        <div style={style.narrow.topBar}>
          {/* <img src={logo} alt="a phoenix with wings held out" style={style.narrow.logo} /> */}
          <h1 style={style.narrow.title}>Rising Phoenix</h1>
          <button onClick={this.toggleShowing} style={style.narrow.barsButton}>
            <i className="fa fa-bars">
            </i>
          </button>
        </div>
        <ul style={[style.narrow.ul, this.state.showing ? {width: "50%"} : {width: 0}]}>
          {renderNavElements("narrow")}
        </ul>
      </nav>
    );
  }  
}

class DropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showing: false,
    };
    this.toggleShowing = this.toggleShowing.bind(this);
    this.hide = this.hide.bind(this);
  }
  toggleShowing (e) {
    e.preventDefault();
    const currShowing = this.state.showing;
    this.setState({
      showing: !currShowing,
    });
  }
  hide(e) {
    if(e && e.relatedTarget){
      e.relatedTarget.click();
    }
    this.setState({
      showing: false,
    });
  }

  render () {
    const isCurrent = this.props.sublinks.map(sublink => sublink.link).includes(this.props.path);
    return (
      <div>
        <button 
          style={[
            style[this.props.styleType].dropdownToggle,
            isCurrent && style[this.props.styleType].current
          ]}
          type="button"
          onClick={this.toggleShowing}
          onBlur={this.hide} 
        >
          {this.props.label}
          <i className="fa fa-caret-down" aria-hidden="true" style={style.carat}></i>
        </button>
        <ul 
          key={this.props.label} 
          style={[
            style[this.props.styleType].dropdownMenu, 
            this.state.showing ? 
              {maxHeight: "20em", opacity: 1, visibility: "visible", transition: "all 0.5s ease, max-height 0.7s, opacity 0.4s, visibility 0s linear 0s",} : 
              {maxHeight: 0, opacity: 0, visibility: "hidden", transition: "all 0.5s ease, max-height 0.6s ease 0s, opacity 0.5s ease 0.1s, visibility 0s linear 1s"}
          ]}
        >
          { this.props.sublinks.map((sublink) => 
            <li key={sublink.label} style={style[this.props.styleType].dropdownLi}>
              <Link to={sublink.link} style={[style[this.props.styleType].Link, style[this.props.styleType].dropdownLink]}>
                {sublink.label}
              </Link>
            </li>
          ) }
        </ul>
      </div>
    );
  }
}

NavbarWide = Radium(NavbarWide);
NavbarNarrow = Radium(NavbarNarrow);
DropDown = Radium(DropDown);


const Navbar = (props) => {
  return (
    <div style={style.navbar}>
      <NavbarWide links={props.links} />
      <NavbarNarrow />
    </div>
  );
};

export default Radium(Navbar);

