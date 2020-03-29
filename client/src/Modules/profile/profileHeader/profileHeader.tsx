import React from "react";

import "./profileHeader.scss";
import { IUserContract } from "Pages/profile/profile";
import ProfileHeaderButtons from "Modules/profile/profilHeaderButtons/profileHeaderButtons";

function ProfileHeader({ user }: { user: IUserContract }) {
  return (
    <header className="ProfileHeader">
      <div className="ProfileHeader-profilPictureContainer">
        <img
          className="ProfileHeader-profilPicture"
          src={user.profilePicture}
          alt="profile"
        />
      </div>
      <div className="ProfileHeader-information">
        <div className="ProfileHeader-information-header">
          <div className="ProfileHeader-username">{user.username}</div>
          <ProfileHeaderButtons user={user} />
        </div>

        <div className="ProfileHeader-information-data">
          <div>
            <span className="text-bold">{user.postsCount} </span>
            <span>posts</span>
          </div>
          <div>
            <span className="text-bold">{user.followersCount} </span>
            <span>followers</span>
          </div>
          <div>
            <span className="text-bold">{user.followsCount} </span>
            <span>following</span>
          </div>
        </div>

        <div className="ProfileHeader-information-name text-bold">
          {user.name}
        </div>
        <div className="ProfileHeader-information-description">
          {user.description}
        </div>
      </div>
    </header>
  );
}

export default ProfileHeader;
