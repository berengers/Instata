import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

import PostFeed from "Components/postFeed/postFeed";
import { IPost } from "Components/postFeed/postFeed";
import "./feed.scss";

const GET_FEED = gql`
  {
    feed {
      id
      media
      description
      createdAt
      user {
        id
        username
        profilePicture
      }
    }
  }
`;

function Feed() {
  const { loading, error, data } = useQuery(GET_FEED, {
    variables: { limit: 5 }
  });

  if (loading) return <div>Loading ...</div>;
  if (error) return <div>Error</div>;

  const posts: IPost[] = data.feed;

  return (
    <div className="Feed">
      <div className="Feed-posts">
        {posts.map(post => (
          <PostFeed post={post} key={post.id} />
        ))}
      </div>
      <aside className="Feed-sidebar">
        <div>Some user data</div>
      </aside>
    </div>
  );
}

export default Feed;
