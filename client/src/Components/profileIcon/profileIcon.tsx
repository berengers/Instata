import React from "react";
import { Link } from "react-router-dom";

import "./profileIcon.scss";

export interface IUser {
  id: number;
  username: string;
  profilePicture?: string;
}

function ProfileIcon({ user }: { user: IUser }) {
  return (
    <div className="ProfileIcon">
      <Link to={`/${user.username}`}>
        <div className="ProfileIcon-imageContainer">
          <img
            src={user.profilePicture}
            alt={user.username}
            className="ProfileIcon-image"
          />
        </div>
      </Link>
    </div>
  );
}
export default ProfileIcon;
