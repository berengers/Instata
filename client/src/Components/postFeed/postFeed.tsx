import React from "react";

import PostHeader from "Components/postHeader/postHeader";
import "./postFeed.scss";
import { IUser } from "Components/profileIcon/profileIcon";

export interface IPost {
  id: number;
  media: string;
  description: string;
  createdAt: string;
  user: IUser;
}

function PostFeed({ post }: { post: IPost }) {
  const { user } = post;

  return (
    <div className="PostFeed">
      <PostHeader user={user} />
      <div className="PostFeed-imageContainer">
        <img
          src={post.media}
          alt={post.description}
          className="PostFeed-image"
        />
      </div>
      <div className="PostFeed-description">{post.description}</div>
    </div>
  );
}

export default PostFeed;
