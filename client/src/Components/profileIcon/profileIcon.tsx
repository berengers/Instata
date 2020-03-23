import React from "react";
import { Link } from "react-router-dom";

import "./profileIcon.scss";

interface IProps {
  user: IUser;
  size?: string;
}

export interface IUser {
  id: number;
  username: string;
  profilePicture?: string;
}

function ProfileIcon({ user, size = "32px" }: IProps) {
  return (
    <div className="ProfileIcon">
      <Link to={`/${user.username}`}>
        <div
          className="ProfileIcon-imageContainer"
          style={{ width: size, height: size }}
        >
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
