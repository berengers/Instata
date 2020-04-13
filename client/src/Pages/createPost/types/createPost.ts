/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PostInput } from "./../../../Services/graphql/types/graphql-global-types";

// ====================================================
// GraphQL mutation operation: createPost
// ====================================================

export interface createPost_createPost_user {
  __typename: "PublicUser";
  id: string;
  username: string;
}

export interface createPost_createPost {
  __typename: "Post";
  id: string;
  media: string;
  description: string | null;
  user: createPost_createPost_user;
}

export interface createPost {
  createPost: createPost_createPost;
}

export interface createPostVariables {
  PostInput: PostInput;
}
