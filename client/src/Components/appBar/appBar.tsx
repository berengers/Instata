import React, { useContext } from "react";
import HomeIcon from "@material-ui/icons/Home";
import { Link } from "react-router-dom";

import "./appBar.scss";
import logo from "Static/instata-logo.png";
import { UserContext } from "Components/context/userContext";

interface PropsInterface {
  isPrivate: boolean;
}

function AppBar({ isPrivate }: PropsInterface) {
  const { setUserContext } = useContext(UserContext);

  return (
    <div className="AppBar">
      <div className="AppBar-content">
        <Link to="/">
          <img src={logo} alt="instata logo" className="AppBar-logo" />
        </Link>
        {isPrivate ? (
          <div className="AppBar-menu">
            <Link to="/">
              <HomeIcon />
            </Link>
            <Link to="/Toto">
              <span>my profile</span>
            </Link>
            <button onClick={() => setUserContext(false)}>
              delete userContext
            </button>
          </div>
        ) : (
          <div>Public bar</div>
        )}
      </div>
    </div>
  );
}

export default AppBar;
