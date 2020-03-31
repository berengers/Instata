import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

import PostDetails from "Modules/post/postFeed/postDetails";
import Sidebar from "Modules/feedSideBar/sideBarFeed";
import Loader from "Lib/loader/loader";
import "./feed.scss";

const GET_FEED = gql`
  query feed {
    feed {
      id
      media
      description
      liked
      likesCount
      createdAt
      user {
        id
        username
        profilePicture
      }
    }
  }
`;

export interface IFeedPostContract {
  id: number;
  media: string;
  description?: string;
  liked: boolean;
  likesCount: number;
  createdAt: string;
  user: IFeedUserContract;
}

export interface IFeedUserContract {
  id: number;
  username: string;
  profilePicture?: string;
}

function Feed() {
  const { loading, error, data } = useQuery(GET_FEED, {
    variables: { limit: 5 },
    fetchPolicy: "cache-and-network"
  });

  if (error) return <div>Error</div>;

  const posts: Array<IFeedPostContract> = (data && data.feed) || [];

  return (
    <div className="Feed">
      <div className="Feed-posts">
        <Loader display={loading} />
        {posts.map(post => (
          <PostDetails post={post} key={post.id} />
        ))}
      </div>
      <aside className="Feed-sidebar">
        <Sidebar />
      </aside>
    </div>
  );
}

export default Feed;
