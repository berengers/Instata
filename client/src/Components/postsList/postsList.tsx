import React from "react";
import _chunk from "lodash/chunk";

import Post from "Components/post/post";
import "./postsList.scss";

interface PropsInterface {
  posts: [PostInterface];
}

export interface PostInterface {
  id: number;
  media: string;
}

function PostsList({ posts }: PropsInterface) {
  const emptyPosts = new Array(posts.length % 3).fill({});

  return (
    <div className="PostsList">
      {_chunk([...posts, ...emptyPosts], 3).map(line => (
        <div key={line[0].id} className="PostsList-line">
          {line.map(post => {
            return post.id ? <Post key={post.id} post={post} /> : <div />;
          })}
        </div>
      ))}
    </div>
  );
}

export default PostsList;
