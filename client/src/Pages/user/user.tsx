import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import UserHeader from "Components/user/userHeader/userHeader";
import PostsList from "Components/postsList/postsList";
import "./user.scss";

const GET_USER_HEADER = gql`
  {
    user {
      id
      username
      name
      description
      profilPicture
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

function User() {
  const { loading, error, data } = useQuery(GET_USER_HEADER);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR: {error.message}</p>;
  if (data === undefined) return <p>ERROR</p>;

  const { user } = data;

  return (
    <div className="User">
      <div className="User-userHeader">
        <UserHeader user={user} />
      </div>
      <PostsList posts={user.posts} />
    </div>
  );
}

export default User;
