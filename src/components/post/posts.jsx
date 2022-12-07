import React, { useState } from "react";

import { db, useAuth } from "../../firebase";
import Comment from "../../images/comment.svg";
import like from "../../images/postLike.svg";
import Unlike from "../../images/postUnlike.svg";

import share from "../../images/share.svg";
import { Link } from "react-router-dom";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect } from "react";
import Comments from "./Comments";
import CommentHandlng from "./CommentHandlng";

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
  comments,
}) {
  const [comment, setComment] = useState();
  const [commendData, setCommentData] = useState();
  const currentUser = useAuth();
  const [commentPopupShown, setCommentPopupShown] = useState(false);
  //const [postId, setPostID] = useState(null);

  const handleSubmit = () => {
    console.log(comment);
    commentHandler(postID, comment);

    comments.map((comm) => {
      console.log(comm.author);
      console.log(comm.comments);
    });
  };

  const commentPopupHandler = () => {
    setCommentPopupShown(!commentPopupShown);
  };

  return (
    <div className="flex flex-col gap-28">
      <div className="flex justify-center ">
        <div className="w-2/6 flex  flex-col border bg-[#ffffff]">
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
                className="h-6 w-6 flex justify-center cursor-pointer"
                src={like}
                alt="love-outline"
                onClick={() => postLike(postID)}
              />
            )}

            {likes.includes(currentUser?.displayName) && (
              <img
                className="h-6 w-6 flex justify-center cursor-pointer"
                src={Unlike}
                alt="love-outline"
                onClick={() => postUnlike(postID)}
              />
            )}

            <img
              onClick={commentPopupHandler}
              src={Comment}
              alt=""
              className="cursor-pointer"
            />
            <img src={share} alt="" />
          </div>

          <div className="flex justify-start ml-4 mb-4">
            {likes.length} likes
          </div>
          {/*<Link to="/comments">*/}
          <div onClick={commentPopupHandler} className="cursor-pointer">
            view all comments
          </div>
          {/*</Link>*/}

          <CommentHandlng
            commentHandler={commentHandler}
            postID={postID}
            comments={comments}
          />

          <Comments
            commentPopupHandler={commentPopupHandler}
            className="absolute"
            commentPopupShown={commentPopupShown}
            comments={comments}
            postUnlike={postUnlike}
            postLike={postLike}
            postID={postID}
            likes={likes}
            imageURL={imageURL}
            profileName={profileName}
            profilePic={profilePic}
            uid={uid}
            commentHandler={commentHandler}
            setComment={setComment}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
      .
    </div>
  );
}

export default Posts;
