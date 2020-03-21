import React, { useContext } from "react";
import HomeIcon from "@material-ui/icons/Home";
import { Link } from "react-router-dom";

import "./appBar.scss";
import logo from "Static/instata-logo.png";
import { UserContext } from "Components/context/userContext";
import ProfileIcon from "Components/profileIcon/profileIcon";

interface PropsInterface {
  isPrivate: boolean;
}

function AppBar({ isPrivate }: PropsInterface) {
  const { userId, username, profilePicture, setUserContext } = useContext(
    UserContext
  );

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
            <ProfileIcon user={{ id: userId, profilePicture, username }} />
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
