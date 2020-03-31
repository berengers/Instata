import React from "react";

import Loader from "Lib/loader/loader";
import "./subscribeButton.scss";

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
      <div className="SubscribeButton-button" onClick={clickButton}>
        Follow
      </div>
      <Loader display={loading} button />
    </div>
  );
}
