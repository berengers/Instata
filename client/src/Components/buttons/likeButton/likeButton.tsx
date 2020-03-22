import React, { FunctionComponent, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { SwitchTransition, Transition } from "react-transition-group";

import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import "./likeButton.scss";

const TOGGLE_POST_LIKE = gql`
  mutation togglePostLike($postId: ID!) {
    togglePostLike(postId: $postId) {
      id
      liked
      likesCount
    }
  }
`;

const SwitchLike: FunctionComponent<{ liked: boolean }> = ({
  children,
  liked
}) => {
  return (
    <SwitchTransition mode="out-in">
      <Transition
        key={liked.toString()}
        in={liked}
        timeout={20}
        unmountOnExit
        mountOnEnter
      >
        {(state: any) => (
          <div className={`LikeButton-transition-container ${state}`}>
            {children}
          </div>
        )}
      </Transition>
    </SwitchTransition>
  );
};

interface ILikeButton {
  postId: number;
  liked: boolean;
}

function LikeButton({ postId, liked: initLiked }: ILikeButton) {
  const [liked, setLiked] = useState(initLiked);
  const [togglePostLike] = useMutation(TOGGLE_POST_LIKE);

  const toggleLike = async () => {
    setLiked(!liked);
    await togglePostLike({ variables: { postId: postId } });
  };

  return (
    <div className="LikeButton">
      <SwitchLike liked={liked}>
        {liked ? (
          <FavoriteIcon color="error" onClick={toggleLike} />
        ) : (
          <FavoriteBorderIcon onClick={toggleLike} />
        )}
      </SwitchLike>
    </div>
  );
}
export default LikeButton;
