import React from "react";

import svgSettings from "Static/settings.svg";
import "./userHeader.scss";

function UserHeader() {
  return (
    <header className="UserHeader">
      <div className="UserHeader-profil_picture_container">
        <img
          className="UserHeader-profil_picture"
          src="https://picsum.photos/id/1062/320/120"
          alt="profile"
        />
      </div>
      <div className="UserHeader-informations">
        <div className="display-row">
          <div className="UserHeader-informations-nickname">berengerprod</div>
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
            <span className="text-bold">153 </span>
            <span>publications</span>
          </div>
          <div>
            <span className="text-bold">383 </span>
            <span>abonnés</span>
          </div>
          <div>
            <span className="text-bold">1 008 </span>
            <span>abonnements</span>
          </div>
        </div>

        <div className="UserHeader-informations-name text-bold">
          Berenger Salmon
        </div>
        <div className="UserHeader-informations-description">
          Photographe & Retoucheur Photo. Paris - Tours Fb : Bérenger
          <br />
          Photographie
        </div>
      </div>
    </header>
  );
}

export default UserHeader;
