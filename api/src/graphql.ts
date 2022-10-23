
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface PostCursorInput {
    postId: string;
    postDate: Date;
}

export interface PostInput {
    description?: Nullable<string>;
    media: string;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
}

export interface FeedCursorInput {
    postDate: Date;
    postId: string;
}

export interface FeedCursor {
    postDate: Date;
    postId: string;
}

export interface FeedResponse {
    cursor?: Nullable<FeedCursor>;
    hasMore?: Nullable<boolean>;
    posts: Post[];
}

export interface Like {
    id: string;
    user: PublicUser;
    post: Post;
    createdAt: Date;
    updatedAt: Date;
}

export interface Login {
    token: string;
    user: PublicUser;
}

export interface Post {
    id: string;
    description?: Nullable<string>;
    media: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface PostsCursor {
    postId: string;
    postDate: Date;
}

export interface PostsResponse {
    cursor: PostsCursor;
    hasMore: boolean;
    posts: Post[];
}

export interface PublicUser {
    id: string;
    username: string;
    name: string;
    description?: Nullable<string>;
    profilePicture?: Nullable<string>;
    isFollowed?: Nullable<boolean>;
    follows: PublicUser[];
    followsCount: number;
    followers: PublicUser[];
    followersCount: number;
    posts: PostsResponse;
    postsCount: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface IQuery {
    user: PublicUser;
    post: Post;
    posts: PostsResponse;
    feed: FeedResponse;
}

export interface IMutation {
    toggleFollow: PublicUser;
    createPost: Post;
    togglePostLike: Post;
    login: Login;
    logout?: Nullable<boolean>;
}

type Nullable<T> = T | null;
