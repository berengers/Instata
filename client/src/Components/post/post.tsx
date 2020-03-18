import React, { useState } from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";

import "./post.scss";

interface PropsInterface {
  post: PostInterface;
}

export interface PostInterface {
  id: number;
  media: string;
  likesCount: number;
}

function Post({ post }: PropsInterface) {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="Post"
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={console.log}
    >
      <div className="Post-container">
        <img src={post.media} alt="post" className="Post-thumb" />
        {hover && (
          <div className="Post-overData">
            <FavoriteIcon /> {post.likesCount}
          </div>
        )}
      </div>
    </div>
  );
}

export default Post;
