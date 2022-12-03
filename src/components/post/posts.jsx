import React, { useState } from "react";

import { useAuth } from "../../firebase";
import Comment from "../../images/comment.svg";
import like from "../../images/postLike.svg";
import Unlike from "../../images/postUnlike.svg";

import share from "../../images/share.svg";
import { Link } from "react-router-dom";

function Posts({
  postUnlike,
  postLike,
  postID,
  likes,
  imageURL,
  profileName,
  profilePic,
  uid,
  commentHandler,
}) {
  const [comment, setComment] = useState();
  const currentUser = useAuth();
  //const [postId, setPostID] = useState(null);

  const handleSubmit = () => {
    console.log(comment);
    commentHandler(postID, comment);
  };

  return (
    <div className="flex flex-col gap-28">
      <div className="flex justify-center ">
        <div className="w-2/6 flex  flex-col border">
          <Link to={"/profile/" + uid}>
            <div className="flex justify-start gap-10 items-center px-4 py-4">
              <img className="w-8 h-8 rounded-full" src={profilePic} alt="" />
              <div className="font-semibold">{profileName}</div>
            </div>
          </Link>

          <img src={imageURL} alt="" />

          <div className="flex p-4 gap-4">
            {!likes.includes(currentUser?.displayName) && (
              <img
                className="h-6 w-6 flex justify-center"
                src={like}
                alt="love-outline"
                onClick={() => postLike(postID)}
              />
            )}

            {likes.includes(currentUser?.displayName) && (
              <img
                className="h-6 w-6 flex justify-center"
                src={Unlike}
                alt="love-outline"
                onClick={() => postUnlike(postID)}
              />
            )}

            <img src={Comment} alt="" />
            <img src={share} alt="" />
          </div>

          <div className="flex justify-start ml-4 mb-4">
            {likes.length} likes
          </div>
          <div>view all comments</div>
          <div>
            <input onChange={(e) => setComment(e.target.value)}></input>
            <div onClick={handleSubmit}>post</div>
          </div>
        </div>
      </div>
      .
    </div>
  );
}

export default Posts;
