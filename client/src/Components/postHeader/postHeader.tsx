import React from "react";

import ProfileIcon from "Components/profileIcon/profileIcon";
import "./postHeader.scss";
import { IUser } from "Components/profileIcon/profileIcon";

function PostHeader({ user }: { user: IUser }) {
  return (
    <div className="PostHeader">
      <ProfileIcon user={user} />
      <div>
        <strong>{user.username}</strong>
      </div>
    </div>
  );
}

export default PostHeader;
