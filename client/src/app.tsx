import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import User from "Pages/user/user";
import "./app.scss";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="App-container">
          <Switch>
            <Route path="/:username">
              <User />
            </Route>
            <Route path="/">
              <h1>feed</h1>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
