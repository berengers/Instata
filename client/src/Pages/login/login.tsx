import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import { UserContext } from "Components/context/userContext";
import "./login.scss";
import illustration from "Static/login-image.png";
import logo from "Static/instata-logo.png";

const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        username
        name
        profilePicture
      }
    }
  }
`;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserContext } = useContext(UserContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await login({ variables: { email, password } });
    } catch (e) {
      console.error(e);
    }
  };

  const [login, { loading, error }] = useMutation(LOGIN_USER, {
    onCompleted({ login }) {
      localStorage.setItem("token", login.token as string);
      setUserContext(
        true,
        login.user.id as number,
        login.user.username as string,
        login.user.name as string,
        login.user.profilePicture as string
      );
    }
  });

  return (
    <div className="Login">
      <img src={illustration} alt="illustration" />
      <div className="Login-formContainer">
        <img src={logo} alt="logo" className="Login-logo" />
        {loading ? (
          <div className="Login-loading">Loading...</div>
        ) : (
          <form className="Login-form" onSubmit={submit}>
            <label>email</label>
            <input type="text" name="email" onChange={handleChange} />
            <label>password</label>
            <input type="password" name="password" onChange={handleChange} />
            <button type="submit" className="Login-form-submit">
              Login
            </button>
            {error && (
              <div className="Login-error">Wrong email or password</div>
            )}
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;
