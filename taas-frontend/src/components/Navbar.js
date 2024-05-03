import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "../App.css";
import "./Navbar.css";
import "../parrot.jpg";

import logo from "../parrot.jpg"; // with import

class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/">
            <img src={logo} alt="TaaS Logo" />
            <span className="navbar-title">TaaS - Tuki as a Service</span>
          </Link>
        </div>
        <ul className="navbar-links">
          <li>
            <Link to="/get-tuki" className="navbar-link">
              Get Tuki
            </Link>
          </li>
          <li>
            <Link to="/upload-tuki" className="navbar-link">
              Upload Tuki
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
