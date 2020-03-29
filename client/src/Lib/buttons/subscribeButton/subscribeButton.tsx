import React from "react";

import "./subscribeButton.scss";
import loader from "Static/loader.gif";

interface IProps {
  loading?: boolean;
  onClick: () => Promise<void>;
}

export default function SubscribeButton({
  loading = false,
  onClick: followUser
}: IProps) {
  const clickButton = () => {
    if (loading) return;

    followUser();
  };

  return (
    <div className="SubscribeButton">
      <div
        className={`SubscribeButton-button ${loading ? "loading" : ""}`}
        onClick={clickButton}
      >
        Follow
      </div>
      <img
        src={loader}
        alt="loader"
        className={`SubscribeButton-loader ${loading ? "visible" : ""}`}
      />
    </div>
  );
}
