import React, { useState } from "react";

interface IUserContext {
  isLogged: boolean;
  username: string;
  setUserContext: (isLogged: boolean, username?: string) => void;
}

export const CreateUserContext = (): IUserContext => {
  const tokenExist = Boolean(localStorage.getItem("token"));
  const [isLogged, setIsLogged] = useState(tokenExist);
  const [username, setUsername] = useState("");

  const setUserContext = (isLogged: boolean, username?: string) => {
    setIsLogged(isLogged);
    if (username) setUsername(username);

    if (isLogged) {
      localStorage.setItem(
        "userContext",
        JSON.stringify({ isLogged, username })
      );
    } else {
      localStorage.removeItem("userContext");
      localStorage.removeItem("token");
    }
  };

  return {
    isLogged,
    username,
    setUserContext
  };
};

export const UserContext = React.createContext({} as IUserContext);
