import React from "react";

function Comments({ comments }) {
  return (
    <div>
      {comments.map((comm) => {
        return (
          <div>
            <div>{comm.author}</div>
            <img src={comm.photo} alt="profile pic" />
            <div>{comm.comments}</div>
          </div>
        );
      })}
    </div>
  );
}

export default Comments;
