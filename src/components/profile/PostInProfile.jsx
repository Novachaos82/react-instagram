import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import PostPopup from "../post/PostPopup";
import Comments from "../post/PostPopup";

function PostInProfile({
  profilePic,
  profileName,
  imageURL,
  likes,
  postID,
  uid,
  comments,
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
  return (
    <div>
      <div onClick={commentPopupHandler}>
        <img
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
      />
    </div>
  );
}

export default PostInProfile;
