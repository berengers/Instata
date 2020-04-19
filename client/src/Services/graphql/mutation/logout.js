import { gql } from 'apollo-boost'

export const LOGOUT = gql`
  mutation logout($token: String!) {
    logout(token: $token)
  }
`
