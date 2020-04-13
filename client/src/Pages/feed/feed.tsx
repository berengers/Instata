import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

import PostDetails from "Modules/post/postDetails/postDetails";
import Sidebar from "Modules/feedSideBar/sideBarFeed";
import Loader from "Lib/loader/loader";
import useInfiniteScroll from "Lib/hooks/useInfiniteScroll";
import { feed } from "./types/feed";
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

function Feed() {
  const limit = 6;
  const { data, loading, error, fetchMore } = useQuery<feed>(GET_FEED, {
    variables: { limit },
    fetchPolicy: "cache-and-network"
  });

  async function loadMore() {
    if (!data || !data.feed.hasMore || !data.feed.cursor) return;

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

  if (!data || (!data.feed && loading)) return <Loader display={loading} />;
  if (error) return <div>Error</div>;

  const {
    feed: { hasMore, posts }
  } = data;

  if (posts.length === 0) {
    return (
      <p style={{ textAlign: "center" }}>
        You follow profiles with currently no posts
      </p>
    );
  }

  return (
    <div className="Feed" data-test="feed-page">
      <div className="Feed-posts">
        {posts.map(post => (
          <PostDetails post={post} user={post.user} key={post.id} />
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
