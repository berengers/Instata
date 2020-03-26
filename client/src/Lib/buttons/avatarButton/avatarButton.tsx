import React from "react";
import { Link } from "react-router-dom";

import "./avatarButton.scss";

interface IProps {
  to: string;
  size?: string;
  pictureLink?: string;
  pictureLabel?: string;
}

function AvatarButton({
  to,
  size = "32px",
  pictureLink,
  pictureLabel
}: IProps) {
  return (
    <div className="AvatarButton">
      <Link to={to}>
        <div
          className="AvatarButton-imageContainer"
          style={{ width: size, height: size }}
        >
          <img
            src={pictureLink}
            alt={pictureLabel}
            className="AvatarButton-image"
          />
        </div>
      </Link>
    </div>
  );
}
export default AvatarButton;
