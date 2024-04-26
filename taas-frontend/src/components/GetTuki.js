import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "../App.css";

class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {" "}
        Get Tuki
        <img
          src="https://taas-cool-bucket.s3.amazonaws.com/zxc.png"
          alt="Girl in a jacket"
          width="500"
          height="600"
        />
      </div>
    );
  }
}

export default Navbar;
