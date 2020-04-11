import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useParams } from "react-router-dom";

import ProfileHeader from "Modules/profile/profileHeader/profileHeader";
import PostsList from "Modules/post/postsList/postsList";
import Loader from "Lib/loader/loader";
import useInfiniteScroll from "Lib/hooks/useInfiniteScroll";
import { getUser } from "./types/getUser";
import "./profile.scss";

const GET_USER_HEADER = gql`
  query getUser($username: String, $id: ID, $limit: Int) {
    user(username: $username, id: $id) {
      id
      username
      name
      description
      profilePicture
      isFollowed
      followersCount
      followsCount
      postsCount

      posts(limit: $limit) {
        cursor {
          postDate
          postId
        }
        hasMore
        posts {
          id
          media
        }
      }
    }
  }
`;

function Profile() {
  const limit = 1;
  const { username } = useParams();
  const { loading, error, data } = useQuery<getUser>(GET_USER_HEADER, {
    variables: { username, limit }
  });
  const [ref] = useInfiniteScroll({ cb: () => console.log(45) });

  if (loading) return <Loader style={{ marginTop: "20px" }} />;

  if (error) return <p>ERROR: {error.message}</p>;
  if (data === undefined) return <p>ERROR</p>;

  const { user } = data;

  return (
    <div className="Profile">
      <div className="Profile-profileHeader">
        <ProfileHeader user={user} />
      </div>
      <PostsList posts={user.posts.posts} />
      <div ref={ref}>
        <Loader style={{ marginTop: "20px" }} />
      </div>
    </div>
  );
}

export default Profile;
