import React from "react";

import svgSettings from "Static/settings.svg";
import "./userHeader.scss";

interface Props {
  user: UserInformations;
}

interface UserInformations {
  id: number;
  username: string;
  name: string;
  description?: string;
  profilePicture?: string;
  followersCount: number;
  followsCount: number;
  postsCount: number;
}

function UserHeader({ user }: Props) {
  return (
    <header className="UserHeader">
      <div className="UserHeader-profil_picture_container">
        <img
          className="UserHeader-profil_picture"
          src={user.profilePicture}
          alt="profile"
        />
      </div>
      <div className="UserHeader-informations">
        <div className="display-row">
          <div className="UserHeader-informations-nickname">
            {user.username}
          </div>
          <div className="UserHeader-informations-set_profil text-bold">
            Modifier le profile
          </div>
          <img
            src={svgSettings}
            alt="settings"
            className="UserHeader-informations-settings"
          />
        </div>

        <div className="UserHeader-informations-data">
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

        <div className="UserHeader-informations-name text-bold">
          {user.name}
        </div>
        <div className="UserHeader-informations-description">
          {user.description}
        </div>
      </div>
    </header>
  );
}

export default UserHeader;
