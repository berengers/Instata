/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: togglePostLike
// ====================================================

export interface togglePostLike_togglePostLike {
  __typename: "Post";
  id: string;
  liked: boolean;
  likesCount: number;
}

export interface togglePostLike {
  togglePostLike: togglePostLike_togglePostLike;
}

export interface togglePostLikeVariables {
  postId: string;
}
