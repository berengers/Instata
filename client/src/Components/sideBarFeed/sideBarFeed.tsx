import React, { useContext } from "react";
import { UserContext } from "Components/context/userContext";

import ProfileIcon from "Components/profileIcon/profileIcon";
import "./sideBarFeed.scss";

export default function Sidebar() {
  const { userId, profilePicture, username, name } = useContext(UserContext);

  return (
    <div className="SideBarFeed">
      <div className="SideBarFeed-row">
        <ProfileIcon
          user={{ id: userId, username, profilePicture }}
          size="50px"
        />
        <div className="SideBarFeed-text">
          <div className="text-bold">{username}</div>
          <div>{name}</div>
        </div>
      </div>
    </div>
  );
}
