import React, { useContext } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { UserContext } from 'Services/context/userContext'
import Feed from 'Pages/feed/feed'
import Login from 'Pages/login/login'
import Profile from 'Pages/profile/profile'
import AppBar from 'Modules/app/appBar/appBar'
import CreatePost from 'Pages/createPost/createPost'
import './app.scss'

function App() {
  const { isLogged } = useContext(UserContext)

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
            <Route exact path="/newPost">
              <CreatePost />
            </Route>
            <Route exact path="/:username">
              <Profile />
            </Route>
            <Route path="/">{isLogged ? <Feed /> : <Login />}</Route>
          </Switch>
        </div>
      </Router>
    </div>
  )
}

export default App
