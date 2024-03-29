import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'

import './index.scss'
import App from './app'
import * as serviceWorker from './serviceWorker'
import { UserContext, CreateUserContext } from './Services/context/userContext'

export const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  request: operation => {
    operation.setContext({
      headers: { authorization: localStorage.getItem('token') }
    })
  }
})

const Root = () => {
  const userContext = CreateUserContext()

  return (
    <ApolloProvider client={client}>
      <UserContext.Provider value={userContext}>
        <App />
      </UserContext.Provider>
    </ApolloProvider>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
