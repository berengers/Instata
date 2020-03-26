import React from "react";

import svgSettings from "Static/settings.svg";
import "./profileHeader.scss";

interface Props {
  user: UserInformation;
}

interface UserInformation {
  id: number;
  username: string;
  name: string;
  description?: string;
  profilePicture?: string;
  followersCount: number;
  followsCount: number;
  postsCount: number;
}

function ProfileHeader({ user }: Props) {
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
        <div className="display-row">
          <div className="ProfileHeader-username">{user.username}</div>
          <div className="ProfileHeader-setProfile text-bold">
            Modifier le profile
          </div>
          <img
            src={svgSettings}
            alt="settings"
            className="ProfileHeader-settings"
          />
        </div>

        <div className="ProfileHeader-information-data">
          <div>
            <span className="text-bold">{user.postsCount} </span>
            <span>publications</span>
          </div>
          <div>
            <span className="text-bold">{user.followersCount} </span>
            <span>abonnés</span>
          </div>
          <div>
            <span className="text-bold">{user.followsCount} </span>
            <span>abonnements</span>
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
