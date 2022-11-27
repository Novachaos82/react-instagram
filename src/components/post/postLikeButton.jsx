import React from "react";

function PostLikeButton({ onClick, source, likeClickData }) {
  console.log(likeClickData);
  return (
    <div>
      <img onClick={onClick} src={source} alt="" className="hover:scale-125" />
      <div>{likeClickData}</div>
    </div>
  );
}

export default PostLikeButton;
