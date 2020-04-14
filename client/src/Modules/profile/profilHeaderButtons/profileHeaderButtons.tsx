import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";

import "./profileHeaderButtons.scss";
import svgSettings from "Static/settings.svg";
import SubscribeButton from "Lib/buttons/subscribeButton/subscribeButton";
import UnsubscribeButton from "Lib/buttons/unsubscribeButton/unsubscribeButton";
import UnsubscribeModal from "Lib/modal/unsubscribeModal/unsubscribeModal";
import UserSettingsModal from "Lib/modal/userSettingsModal/userSettingsModal";
import { client } from "index";
import { UserContext } from "Services/context/userContext";
import { TOGGLE_FOLLOW } from "Services/graphql/mutation/toggleFollow";
import { LOGOUT } from "Services/graphql/mutation/logout";
import { getUser_user } from "Pages/profile/types/getUser";

export default function ProfileHeaderButtons({ user }: { user: getUser_user }) {
  const { isLogged, username, setUserContext } = useContext(UserContext);
  const [unsubscribeModal, setUnsubscribeModal] = useState(false);
  const [userSettingsModal, setUserSettingsModal] = useState(false);
  const [subscribeData, { loading: loadingSubscribe }] = useMutation(
    TOGGLE_FOLLOW
  );
  const [logout] = useMutation(LOGOUT);
  const history = useHistory();
  const isUserConnected = username === user.username;

  const clickLogout = async () => {
    const token = localStorage.getItem("token");
    setUserSettingsModal(false);
    setUserContext(false);
    localStorage.removeItem("token");
    history.push("/");
    await client.clearStore();
    await logout({ variables: { token } });
  };

  const toggleFollow = async () => {
    if (!isLogged) return; // TODO - Add modal to login

    await subscribeData({ variables: { userId: user.id } });
  };

  const openUnsubscribeModal = () => setUnsubscribeModal(true);
  const openUserSettingsModal = () => setUserSettingsModal(true);

  if (isUserConnected)
    return (
      <div className="ProfileHeaderButtons">
        <img
          src={svgSettings}
          alt="settings"
          className="ProfileHeaderButtons-settings"
          data-test="settings-button"
          onClick={openUserSettingsModal}
        />
        <UserSettingsModal
          display={userSettingsModal}
          logout={clickLogout}
          setDisplay={setUserSettingsModal}
        />
      </div>
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
