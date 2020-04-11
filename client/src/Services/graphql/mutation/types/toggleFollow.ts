/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: toggleFollow
// ====================================================

export interface toggleFollow_toggleFollow {
  __typename: "PublicUser";
  id: string;
  isFollowed: boolean | null;
  followersCount: number;
}

export interface toggleFollow {
  toggleFollow: toggleFollow_toggleFollow;
}

export interface toggleFollowVariables {
  userId: string;
}
