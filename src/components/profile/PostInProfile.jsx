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
  const [isHovering, setIsHovering] = useState(false);

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

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <div>
      <div
        onClick={commentPopupHandler}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        className="h-[293px] w-[293px] relative "
      >
        <img
          //onMouseEnter={hoverHandler}
          className="h-full w-full object-cover "
          src={imageURL}
          alt={imageURL}
        />
        {isHovering && (
          <div className="absolute bg-black/30 w-full h-full top-0 left-0 text-white flex items-center justify-center gap-6 cursor-pointer">
            <div className="imageHover">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#FFFFFF"
                viewBox="0 0 256 256"
              >
                <rect width="256" height="256" fill="none"></rect>
                <path
                  d="M128,216S28,160,28,92A52,52,0,0,1,128,72h0A52,52,0,0,1,228,92C228,160,128,216,128,216Z"
                  fill="none"
                  stroke="#FFFFFF"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="16"
                ></path>
              </svg>
              <span>{likes.length}</span>
            </div>
            <div className="imageHover">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#FFFFFF"
                viewBox="0 0 256 256"
              >
                <rect width="256" height="256" fill="none"></rect>
                <path
                  d="M45.4,177A95.9,95.9,0,1,1,79,210.6h0L45.8,220a7.9,7.9,0,0,1-9.8-9.8L45.4,177Z"
                  fill="none"
                  stroke="#FFFFFF"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="16"
                ></path>
              </svg>
              <span>{comments.length}</span>
            </div>
          </div>
        )}
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
