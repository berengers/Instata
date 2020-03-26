import React from "react";

import AvatarButton from "Lib/buttons/avatarButton/avatarButton";
import "./postHeader.scss";
import { IFeedUserContract } from "Pages/feed/feed";

function PostHeader({ user }: { user: IFeedUserContract }) {
  return (
    <div className="PostHeader">
      <AvatarButton
        to={`/${user.username}`}
        pictureLink={user.profilePicture}
        pictureLabel={user.username}
      />
      <div className="PostHeader-content">
        <strong>{user.username}</strong>
      </div>
    </div>
  );
}

export default PostHeader;
