import { gql } from "apollo-boost";

export const TOGGLE_FOLLOW = gql`
  mutation toggleFollow($userId: ID!) {
    toggleFollow(userId: $userId) {
      id
      isFollowed
    }
  }
`;
