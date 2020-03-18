import React from "react";

import { PostInterface } from "Components/postsList/postsList";
import "./post.scss";

interface PropsInterface {
  post: PostInterface;
}

function Post({ post }: PropsInterface) {
  return (
    <div className="Post">
      <div className="Post-container">
        <img src={post.media} alt="post" className="Post-thumb" />
      </div>
    </div>
  );
}

export default Post;
