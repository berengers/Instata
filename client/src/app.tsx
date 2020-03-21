import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { UserContext } from "Components/context/userContext";
import Feed from "Pages/feed/feed";
import Login from "Pages/login/login";
import User from "Pages/user/user";
import AppBar from "Components/appBar/appBar";
import "./app.scss";

function App() {
  const { isLogged } = useContext(UserContext);

  useEffect(() => {
    if (!isLogged) {
      localStorage.removeItem("token");
    }
  }, [isLogged]);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            {isLogged && <AppBar isPrivate={true} />}
          </Route>
          <Route path="">
            <AppBar isPrivate={isLogged} />
          </Route>
        </Switch>
        <div className="App-container">
          <Switch>
            <Route exact path="/:username">
              <User />
            </Route>
            <Route path="/">{isLogged ? <Feed /> : <Login />}</Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
