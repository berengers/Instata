import React from "react";
import { format } from "timeago.js";

import PostHeader from "Modules/post/postHeader/postHeader";
import LikeButton from "Lib/buttons/likeButton/likeButton";
import "./postDetails.scss";
import { feed_feed_posts } from "Pages/feed/types/feed";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const TOGGLE_POST_LIKE = gql`
  mutation togglePostLike($postId: ID!) {
    togglePostLike(postId: $postId) {
      id
      liked
      likesCount
    }
  }
`;

function PostDetails({ post }: { post: feed_feed_posts }) {
  const { user } = post;
  const [togglePostLike] = useMutation(TOGGLE_POST_LIKE);

  const toggleLike = async (postId: string) => {
    await togglePostLike({ variables: { postId: postId } });
  };

  return (
    <div className="PostDetails">
      <PostHeader
        pictureLabel={user.username}
        pictureLink={user.profilePicture}
        to={`/${user.username}`}
        username={user.username}
      />
      <div className="PostDetails-imageContainer">
        <img
          src={post.media}
          alt={post.description || undefined}
          className="PostDetails-image"
        />
      </div>
      <div className="PostDetails-actions">
        <LikeButton postId={post.id} liked={post.liked} onClick={toggleLike} />
      </div>
      <div className="PostDetails-countLikes text-bold">
        {post.likesCount} {post.likesCount > 1 ? "likes" : "like"}
      </div>
      <div className="PostDetails-description">
        <span className="text-bold">{user.username}</span> {post.description}
      </div>
      <div className="PostDetails-createdAt">{format(post.createdAt)}</div>
    </div>
  );
}

export default PostDetails;
