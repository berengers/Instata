/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FeedCursorInput } from "./../../../Services/graphql/types/graphql-global-types";

// ====================================================
// GraphQL query operation: feed
// ====================================================

export interface feed_feed_cursor {
  __typename: "FeedCursor";
  postDate: any;
  postId: string;
}

export interface feed_feed_posts_user {
  __typename: "PublicUser";
  id: string;
  username: string;
  profilePicture: string | null;
}

export interface feed_feed_posts {
  __typename: "Post";
  id: string;
  media: string;
  description: string | null;
  liked: boolean;
  likesCount: number;
  createdAt: any;
  user: feed_feed_posts_user;
}

export interface feed_feed {
  __typename: "FeedResponse";
  cursor: feed_feed_cursor | null;
  hasMore: boolean | null;
  posts: (feed_feed_posts | null)[];
}

export interface feed {
  feed: feed_feed;
}

export interface feedVariables {
  limit?: number | null;
  cursor?: FeedCursorInput | null;
}
