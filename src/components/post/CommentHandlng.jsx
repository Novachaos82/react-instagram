import React from "react";

import { useState } from "react";

function CommentHandlng({ commentHandler, postID, comments }) {
  const [comment, setComment] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(comment);
    commentHandler(postID, comment);

    setComment("");
  };
  //useEffect(() => {
  //  if (comment.length > 0) {
  //    setDisabled(false);
  //  }
  //}, []);
  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-between w-full border-t px-4 py-2 mt-4"
    >
      <input
        className="w-full outline-none text-sm"
        onChange={(e) => setComment(e.target.value)}
        value={comment}
        placeholder="Add a Comment..."
      ></input>
      <button
        disabled={!comment}
        className="text-blue-600 cursor-pointer disabled:text-gray-500 disabled:cursor-auto"
      >
        post
      </button>
    </form>
  );
}

export default CommentHandlng;
