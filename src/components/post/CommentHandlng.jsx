import React from "react";
import { useState } from "react";

function CommentHandlng({ commentHandler, postID, comments }) {
  const [comment, setComment] = useState();
  const handleSubmit = () => {
    console.log(comment);
    commentHandler(postID, comment);

    comments.map((comm) => {
      console.log(comm.author);
      console.log(comm.comments);
    });
  };
  return (
    <div>
      <input onChange={(e) => setComment(e.target.value)}></input>
      <div onClick={handleSubmit}>post</div>
    </div>
  );
}

export default CommentHandlng;
