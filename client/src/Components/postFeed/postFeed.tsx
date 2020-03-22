import React from "react";
import { format } from "timeago.js";

import PostHeader from "Components/postHeader/postHeader";
import "./postFeed.scss";
import { IUser } from "Components/profileIcon/profileIcon";
import LikeButton from "Components/buttons/likeButton/likeButton";

export interface IPost {
  id: number;
  media: string;
  description: string;
  liked: boolean;
  likesCount: number;
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
      <div className="PostFeed-actions">
        <LikeButton postId={post.id} liked={post.liked} />
      </div>
      <div className="PostFeed-countLikes text-bold">
        {post.likesCount} {post.likesCount > 1 ? "likes" : "like"}
      </div>
      <div className="PostFeed-description">
        <span className="text-bold">{user.username}</span> {post.description}
      </div>
      <div className="PostFeed-createdAt">{format(post.createdAt)}</div>
    </div>
  );
}

export default PostFeed;
