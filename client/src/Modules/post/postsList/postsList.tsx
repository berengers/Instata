import React from "react";
import _chunk from "lodash/chunk";

import PostPreview from "Modules/post/postPreview/postPreview";
import { getUser_user_posts_posts } from "Pages/profile/types/getUser";
import "./postsList.scss";

interface PropsInterface {
  posts: (getUser_user_posts_posts | null)[];
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
