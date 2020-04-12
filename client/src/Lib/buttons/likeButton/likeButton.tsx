import React, { FunctionComponent, useState } from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { SwitchTransition, Transition } from "react-transition-group";

import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import "./likeButton.scss";

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
  postId: string;
  liked: boolean;
  onClick: (postId: string) => void;
}

function LikeButton({
  postId,
  liked: initLiked,
  onClick: toggleLike
}: ILikeButton) {
  const [liked, setLiked] = useState(initLiked);

  const toggle = () => {
    setLiked(!liked);
    toggleLike(postId);
  };

  return (
    <div className="LikeButton">
      <SwitchLike liked={liked}>
        {liked ? (
          <FavoriteIcon color="error" onClick={toggle} />
        ) : (
          <FavoriteBorderIcon onClick={toggle} />
        )}
      </SwitchLike>
    </div>
  );
}
export default LikeButton;
