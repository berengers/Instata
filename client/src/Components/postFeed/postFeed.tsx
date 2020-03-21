import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { format } from "timeago.js";

import PostHeader from "Components/postHeader/postHeader";
import "./postFeed.scss";
import { IUser } from "Components/profileIcon/profileIcon";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

const TOGGLE_POST_LIKE = gql`
  mutation togglePostLike($postId: ID!) {
    togglePostLike(postId: $postId) {
      id
      liked
      likesCount
    }
  }
`;

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
  const [liked, setLiked] = useState(post.liked);
  const [togglePostLike] = useMutation(TOGGLE_POST_LIKE);

  const toggleLike = async () => {
    setLiked(!liked);
    await togglePostLike({ variables: { postId: post.id } });
  };

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
        {liked ? (
          <FavoriteIcon color="error" onClick={toggleLike} />
        ) : (
          <FavoriteBorderIcon onClick={toggleLike} />
        )}
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
