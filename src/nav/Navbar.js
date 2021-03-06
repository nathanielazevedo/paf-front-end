import React, {useState, useContext} from "react";
import {Link, NavLink} from "react-router-dom";
import UserContext from ".././UserContext";
import "./Navbar.css";

//Context is consumed here to determine login status.

function NavBar({logoutFunc, loginFunc}) {
  const {currentUser} = useContext(UserContext);

  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  const closeMobileMenu = () => setClick(false);

  const closeMobileGuest = () => {
    setClick(false);
    loginFunc({username: "guest", password: "guest55"});
  };

  //Generate nav for logged in users.
  function loggedInNav() {
    return (
      <nav className="nav-container">
        <div className="nav-inner-left">
          <NavLink to="/" exact className="nav-logo" onClick={closeMobileMenu}>
            Spanish Speaking{" "}
            <div
              style={{display: "inline"}}
              className={`accent ${currentUser.color}`}
            >
              Robot
            </div>
          </NavLink>
          <div className="nav-hamburger" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
        </div>
        <div className={click ? "nav-links active" : "nav-links"}>
          <NavLink
            to="/friends"
            className={`nav-link ${currentUser.color}`}
            onClick={closeMobileMenu}
          >
            Friends
          </NavLink>
          <NavLink
            to="/"
            className={`nav-link ${currentUser.color}`}
            onClick={logoutFunc}
            style={{borderBottom: 'none'}}
          >
            Logout
          </NavLink>
          <NavLink to="/settings" className={`nav-link ${currentUser.color}`}>
            <i className="fas fa-cog" style={{color: "white"}}></i>
          </NavLink>
        </div>
      </nav>
    );
  }

  //Generate nav for logged out users.
  function loggedOutNav() {
    return (
      <nav className="nav-container out">
        <div className="nav-inner-left">
          <Link
            to="/"
            className="nav-logo"
            onClick={closeMobileMenu}
          >
            Spanish Speaking{" "}
            <div style={{color: "#1fa58a", display: "inline"}}>Robot</div>
          </Link>
          <div className="nav-hamburger">
            <i
              className={click ? "fas fa-times" : "fas fa-bars"}
              onClick={handleClick}
            />
          </div>
        </div>
        <div className={click ? "nav-links active" : "nav-links"}>
          <div className="nav-link out-link" onClick={closeMobileGuest}>
            Try as guest
          </div>
          <Link
            to="/login"
            className="nav-link out-link"
            onClick={closeMobileMenu}
          >
            Login
          </Link>
          <Link
            to="/sign-up"
            className="nav-link out-link"
            onClick={closeMobileMenu}
          >
            Sign Up
          </Link>
        </div>
      </nav>
    );
  }
  //Check if logged in or not from context.
  return currentUser ? loggedInNav() : loggedOutNav();
}

export default NavBar;
