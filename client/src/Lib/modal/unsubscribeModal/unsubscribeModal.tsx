import React from "react";

import Modal from "../modal/modal";
import "./unsubscribeModal.scss";

interface IProps {
  profilePicture: string | null;
  unsubscribe: () => void;
  username: string;
  display: boolean;
  setDisplay: (value: boolean) => void;
}

export default function UnsubscribeModal({
  profilePicture,
  unsubscribe,
  username,
  display,
  setDisplay
}: IProps) {
  const clickCancel = () => setDisplay(false);

  const clickUnsubscribe = async () => {
    setDisplay(false);
    unsubscribe();
  };

  return (
    <div className="UnsubscribeModal">
      <Modal display={display} setDisplay={setDisplay}>
        <div className="UnsubscribeModal-card">
          <div className="UnsubscribeModal-imageContainer">
            {profilePicture && (
              <img
                src={profilePicture}
                alt="profilePicture"
                className="UnsubscribeModal-image"
              />
            )}
          </div>
          <div className="UnsubscribeModal-subtitle">
            Unsubscribe to @{username} ?
          </div>
          <div
            className="UnsubscribeModal-validatedButton"
            onClick={clickUnsubscribe}
          >
            Unsubscribe
          </div>
          <div className="UnsubscribeModal-cancelButton" onClick={clickCancel}>
            Cancel
          </div>
        </div>
      </Modal>
    </div>
  );
}
