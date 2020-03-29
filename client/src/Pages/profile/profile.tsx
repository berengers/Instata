import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useParams } from "react-router-dom";

import ProfileHeader from "Modules/profile/profileHeader/profileHeader";
import PostsList from "Modules/post/postsList/postsList";
import "./profile.scss";

const GET_USER_HEADER = gql`
  query getUser($username: String) {
    user(username: $username) {
      id
      username
      name
      description
      profilePicture
      isFollowed
      followersCount
      followsCount
      postsCount

      posts {
        id
        media
        likesCount
      }
    }
  }
`;

export interface IUserContract {
  readonly id: number;
  readonly username: string;
  readonly name: string;
  readonly description: string;
  readonly profilePicture: string;
  readonly isFollowed?: boolean;
  readonly followersCount: number;
  readonly followsCount: number;
  readonly postsCount: number;
  readonly posts: [IUserPostContract];
}

export interface IUserPostContract {
  readonly id: number;
  readonly media: string;
  readonly likesCount: number;
}

function Profile() {
  const { username } = useParams();
  const { loading, error, data } = useQuery(GET_USER_HEADER, {
    variables: { username }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR: {error.message}</p>;
  if (data === undefined) return <p>ERROR</p>;

  const { user }: { user: IUserContract } = data;

  return (
    <div className="Profile">
      <div className="Profile-profileHeader">
        <ProfileHeader user={user} />
      </div>
      <PostsList posts={user.posts} />
    </div>
  );
}

export default Profile;
