import React, { useState } from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";

import "./postPreview.scss";

interface PropsInterface {
  post: PostInterface;
}

export interface PostInterface {
  id: string;
  media: string;
  likesCount: number;
}

function PostPreview({ post }: PropsInterface) {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="PostPreview"
      data-test="PostPreview-component"
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={console.log}
    >
      <div className="PostPreview-container">
        <img src={post.media} alt="post" className="PostPreview-thumb" />
        {hover && (
          <div className="PostPreview-overData">
            <FavoriteIcon /> {post.likesCount}
          </div>
        )}
      </div>
    </div>
  );
}

export default PostPreview;
