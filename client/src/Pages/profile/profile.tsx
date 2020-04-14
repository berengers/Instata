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
  query getUser(
    $id: ID
    $username: String
    $cursor: PostCursorInput
    $limit: Int
  ) {
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

      posts(cursor: $cursor, limit: $limit) {
        cursor {
          postDate
          postId
        }
        hasMore
        posts {
          id
          media
          likesCount
        }
      }
    }
  }
`;

function Profile() {
  const limit = 9;
  const { username } = useParams();
  const { loading, error, data, fetchMore } = useQuery<getUser>(
    GET_USER_HEADER,
    {
      variables: { username, limit }
    }
  );

  async function loadMore() {
    if (!user.posts.hasMore) return;

    await fetchMore({
      variables: {
        cursor: {
          postDate: user.posts.cursor.postDate,
          postId: user.posts.cursor.postId
        },
        limit
      },
      updateQuery: (previousResult: any, { fetchMoreResult }: any) => {
        return {
          user: {
            ...user,
            posts: {
              cursor: Object.assign(
                user.posts.cursor,
                fetchMoreResult.user.posts.cursor
              ),
              hasMore: fetchMoreResult.user.posts.hasMore,
              posts: [
                ...previousResult.user.posts.posts,
                ...fetchMoreResult.user.posts.posts
              ],
              __typename: fetchMoreResult.user.posts.__typename
            },
            __typename: fetchMoreResult.user.__typename
          }
        };
      }
    });
  }

  const [ref] = useInfiniteScroll({
    cb: loadMore,
    observerOptions: { rootMargin: "500px" }
  });

  if (loading) return <Loader style={{ marginTop: "20px" }} />;

  if (error) return <p>ERROR: {error.message}</p>;
  if (data === undefined) return <p>ERROR</p>;

  const { user } = data;

  return (
    <div className="Profile" data-test="profile-page">
      <div className="Profile-profileHeader">
        <ProfileHeader user={user} />
      </div>
      <PostsList posts={user.posts.posts} />
      {user.posts.hasMore && (
        <div ref={ref}>
          <Loader style={{ marginTop: "20px" }} />
        </div>
      )}
    </div>
  );
}

export default Profile;
