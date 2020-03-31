import React, { useContext } from "react";
import HomeIcon from "@material-ui/icons/Home";
import { Link } from "react-router-dom";

import "./appBar.scss";
import logo from "Static/instata-logo.png";
import { UserContext } from "Services/context/userContext";
import AvatarButton from "Lib/buttons/avatarButton/avatarButton";

interface PropsInterface {
  isPrivate: boolean;
}

function AppBar({ isPrivate }: PropsInterface) {
  const { username, profilePicture } = useContext(UserContext);

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
            <AvatarButton
              to={`/${username}`}
              pictureLink={profilePicture}
              pictureLabel={username}
            />
          </div>
        ) : (
          <div>Public bar</div>
        )}
      </div>
    </div>
  );
}

export default AppBar;
