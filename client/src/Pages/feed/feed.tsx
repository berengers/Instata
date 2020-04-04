import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

import PostDetails from "Modules/post/postFeed/postDetails";
import Sidebar from "Modules/feedSideBar/sideBarFeed";
import Loader from "Lib/loader/loader";
import useInfiniteScroll from "Lib/hooks/useInfiniteScroll";
import "./feed.scss";

const GET_FEED = gql`
  query feed($limit: Int, $cursor: FeedCursorInput) {
    feed(limit: $limit, cursor: $cursor) {
      cursor {
        postDate
        postId
      }
      hasMore
      posts {
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
  }
`;

interface IFetchMore {
  feed: IFeedQueryContract;
}

export interface IFeedQueryContract {
  cursor: number;
  hasMore: boolean;
  posts: [IFeedPostContract];
}

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
  const limit = 6;
  const { data, loading, error, fetchMore } = useQuery(GET_FEED, {
    variables: { limit },
    fetchPolicy: "cache-and-network"
  });

  async function loadMore() {
    if (!data.feed.hasMore) return;

    await fetchMore({
      variables: {
        cursor: {
          postDate: data.feed.cursor.postDate,
          postId: data.feed.cursor.postId
        },
        limit
      },
      updateQuery: (previousResult: any, { fetchMoreResult }: any) => {
        return {
          feed: {
            cursor: Object.assign(
              data.feed.cursor,
              fetchMoreResult.feed.cursor
            ),
            hasMore: fetchMoreResult.feed.hasMore,
            posts: [
              ...previousResult.feed.posts,
              ...fetchMoreResult.feed.posts
            ],
            __typename: fetchMoreResult.feed.__typename
          }
        };
      }
    });
  }

  const [ref] = useInfiniteScroll({
    cb: loadMore,
    observerOptions: { rootMargin: "1500px" }
  });

  if (error) return <div>Error</div>;

  const initData = { feed: { hasMore: false, cursor: {}, posts: [] } };
  const {
    feed: { hasMore, posts }
  }: IFetchMore = data || initData;

  return (
    <div className="Feed">
      <div className="Feed-posts">
        {posts.map(post => (
          <PostDetails post={post} key={post.id} />
        ))}
        {posts.length > 0 && hasMore && (
          <div ref={ref}>
            <Loader display={loading} />
          </div>
        )}
      </div>
      <aside className="Feed-sidebar">
        <Sidebar />
      </aside>
    </div>
  );
}

export default Feed;
