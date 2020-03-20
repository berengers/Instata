import React from "react";
import _chunk from "lodash/chunk";

import PostPreview, { PostInterface } from "Components/postPreview/postPreview";
import "./postsList.scss";

interface PropsInterface {
  posts: [PostInterface];
}

function PostsList({ posts }: PropsInterface) {
  const emptyPosts = new Array(3 - (posts.length % 3)).fill({});

  return (
    <div className="PostsList">
      {_chunk([...posts, ...emptyPosts], 3).map(line => (
        <div key={`line-${line[0].id}`} className="PostsList-line">
          {line.map((post, i) => {
            return post.id ? (
              <PostPreview key={post.id} post={post} />
            ) : (
              <div key={`empty-${i}`} />
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default PostsList;
