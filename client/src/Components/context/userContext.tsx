import React, { useState } from "react";

interface IUserContext {
  isLogged: boolean;
  userId: number;
  username: string;
  profilePicture?: string;
  setUserContext: (
    isLogged: boolean,
    userId?: number,
    username?: string,
    profilePicture?: string
  ) => void;
}

export const CreateUserContext = (): IUserContext => {
  const tokenExist = Boolean(localStorage.getItem("token"));
  const contextLocal = JSON.parse(
    localStorage.getItem("userContext") as string
  );
  const [isLogged, setIsLogged] = useState(tokenExist);
  const [userId, setUserId] = useState(
    contextLocal ? contextLocal.userId : null
  );
  const [username, setUsername] = useState(
    contextLocal ? contextLocal.username : ""
  );
  const [profilePicture, setProfilePicture] = useState(
    contextLocal ? contextLocal.profilePicture : ""
  );

  const setUserContext = (
    isLogged: boolean,
    userId?: number,
    username?: string,
    profilePicture?: string
  ) => {
    setIsLogged(isLogged);

    if (isLogged) {
      if (userId) setUserId(userId);
      if (username) setUsername(username);
      if (profilePicture) setProfilePicture(profilePicture);

      localStorage.setItem(
        "userContext",
        JSON.stringify({ isLogged, userId, username, profilePicture })
      );
    } else {
      setUserId(null);
      setUsername("");
      setProfilePicture("");
      localStorage.removeItem("userContext");
    }
  };

  return {
    isLogged,
    userId,
    username,
    profilePicture,
    setUserContext
  };
};

export const UserContext = React.createContext({} as IUserContext);
