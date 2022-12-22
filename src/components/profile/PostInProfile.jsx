import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import PostPopup from "../post/PostPopup";

function PostInProfile({
  profilePic,
  profileName,
  imageURL,
  likes,
  postID,
  uid,
  comments,
  timestamp,
}) {
  const [commentPopupShown, setCommentPopupShown] = useState(false);

  const commentPopupHandler = () => {
    setCommentPopupShown(!commentPopupShown);
    document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    if (!commentPopupShown) {
      document.body.style.overflow = "unset";
    }
  }, [commentPopupShown]);
  //console.log(likes.length);

  return (
    <div>
      <div onClick={commentPopupHandler}>
        <img
          //onMouseEnter={hoverHandler}
          className="h-[293px] w-[293px] object-cover"
          src={imageURL}
          alt={imageURL}
        />
      </div>

      <PostPopup
        commentPopupHandler={commentPopupHandler}
        commentPopupShown={commentPopupShown}
        comments={comments}
        postID={postID}
        likes={likes}
        imageURL={imageURL}
        profileName={profileName}
        profilePic={profilePic}
        uid={uid}
        timestamp={timestamp}
      />
    </div>
  );
}

export default PostInProfile;
