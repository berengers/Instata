/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PostCursorInput } from "./../../../Services/graphql/types/graphql-global-types";

// ====================================================
// GraphQL query operation: getUser
// ====================================================

export interface getUser_user_posts_cursor {
  __typename: "PostsCursor";
  postDate: any;
  postId: string;
}

export interface getUser_user_posts_posts {
  __typename: "Post";
  id: string;
  media: string;
  likesCount: number;
}

export interface getUser_user_posts {
  __typename: "PostsResponse";
  cursor: getUser_user_posts_cursor;
  hasMore: boolean;
  posts: getUser_user_posts_posts[];
}

export interface getUser_user {
  __typename: "PublicUser";
  id: string;
  username: string;
  name: string;
  description: string | null;
  profilePicture: string | null;
  isFollowed: boolean | null;
  followersCount: number;
  followsCount: number;
  postsCount: number;
  posts: getUser_user_posts;
}

export interface getUser {
  user: getUser_user;
}

export interface getUserVariables {
  id?: string | null;
  username?: string | null;
  cursor?: PostCursorInput | null;
  limit?: number | null;
}
