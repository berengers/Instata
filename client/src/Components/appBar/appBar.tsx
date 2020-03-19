import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import { Link } from "react-router-dom";

import "./appBar.scss";
import logo from "Static/instata-logo.png";

function AppBar() {
  return (
    <div className="AppBar">
      <div className="AppBar-content">
        <img src={logo} alt="instata logo" className="AppBar-logo" />
        <div className="AppBar-menu">
          <Link to="/">
            <HomeIcon />
          </Link>
          <Link to="/Toto">
            <span>my profile</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AppBar;
