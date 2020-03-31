import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/react-hooks";

import "./profileHeaderButtons.scss";
import svgSettings from "Static/settings.svg";
import SubscribeButton from "Lib/buttons/subscribeButton/subscribeButton";
import UnsubscribeButton from "Lib/buttons/unsubscribeButton/unsubscribeButton";
import UnsubscribeModal from "Lib/modal/unsubscribeModal/unsubscribeModal";
import { UserContext } from "Services/context/userContext";
import { IUserContract } from "Pages/profile/profile";
import { TOGGLE_FOLLOW } from "Services/graphql/mutation/toggleFollow";

export default function ProfileHeaderButtons({
  user
}: {
  user: IUserContract;
}) {
  const { isLogged, username } = useContext(UserContext);
  const [unsubscribeModal, setUnsubscribeModal] = useState(false);
  const [subscribeData, { loading: loadingSubscribe }] = useMutation(
    TOGGLE_FOLLOW
  );
  const isUserConnected = username === user.username;

  const toggleFollow = async () => {
    if (!isLogged) return; // TODO - Add modal to login

    await subscribeData({ variables: { userId: user.id } });
  };

  const openUnsubscribeModal = () => setUnsubscribeModal(true);

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

  if (user.isFollowed)
    return (
      <React.Fragment>
        <UnsubscribeButton
          loading={loadingSubscribe}
          onClick={openUnsubscribeModal}
        />

        <UnsubscribeModal
          display={unsubscribeModal}
          profilePicture={user.profilePicture}
          unsubscribe={toggleFollow}
          setDisplay={setUnsubscribeModal}
          username={user.username}
        />
      </React.Fragment>
    );

  return <SubscribeButton loading={loadingSubscribe} onClick={toggleFollow} />;
}
