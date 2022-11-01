
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
    cursor?: Nullable<PostsCursor>;
    posts: Post[];
}

export interface IQuery {
    posts: PostsResponse;
    getUser?: Nullable<PublicUser>;
}

export interface User {
    id: string;
    email: string;
    username: string;
    name?: Nullable<string>;
    description?: Nullable<string>;
    password: string;
    profilePicture?: Nullable<string>;
    createdAt: Date;
    updatedAt: Date;
    posts: Nullable<Post>[];
}

export interface PublicUser {
    id: string;
    username: string;
    name: string;
    description?: Nullable<string>;
    profilePicture?: Nullable<string>;
    createdAt: Date;
    updatedAt: Date;
}

type Nullable<T> = T | null;
