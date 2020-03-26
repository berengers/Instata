import React, { useContext } from "react";
import { UserContext } from "Services/context/userContext";

import AvatarButton from "Lib/avatarButton/avatarButton";
import "./sideBarFeed.scss";

export default function Sidebar() {
  const { userId, profilePicture, username, name } = useContext(UserContext);

  return (
    <div className="SideBarFeed">
      <div className="SideBarFeed-row">
        <AvatarButton
          to={`/${username}`}
          pictureLink={profilePicture}
          pictureLabel={username}
        />
        <div className="SideBarFeed-text">
          <div className="text-bold">{username}</div>
          <div>{name}</div>
        </div>
      </div>
    </div>
  );
}
