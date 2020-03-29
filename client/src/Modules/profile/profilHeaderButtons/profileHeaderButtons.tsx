import React, { useContext } from "react";
import { useMutation } from "@apollo/react-hooks";

import "./profileHeaderButtons.scss";
import svgSettings from "Static/settings.svg";
import SubscribeButton from "Lib/buttons/subscribeButton/subscribeButton";
import { UserContext } from "Services/context/userContext";
import { IUserContract } from "Pages/profile/profile";
import { TOGGLE_FOLLOW } from "Services/graphql/mutation/toggleFollow";

export default function ProfileHeaderButtons({
  user
}: {
  user: IUserContract;
}) {
  const { username } = useContext(UserContext);
  const [addFollow, { loading: loadingSubscribe }] = useMutation(TOGGLE_FOLLOW);
  const isUserConnected = username === user.username;

  const toggleFollow = async () => {
    await addFollow({ variables: { userId: user.id } });
  };

  if (isUserConnected)
    return (
      <React.Fragment>
        <div className="ProfileHeader-setProfile text-bold">
          Modifier le profile
        </div>
        <img
          src={svgSettings}
          alt="settings"
          className="ProfileHeader-settings"
        />
      </React.Fragment>
    );

  if (user.isFollowed) return <div onClick={toggleFollow}>followed</div>;

  return <SubscribeButton loading={loadingSubscribe} onClick={toggleFollow} />;
}
