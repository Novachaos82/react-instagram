import React from "react";
import postPopupImg from "../../images/postPopup.svg";

function NewPostPopup({ cancelPopup }) {
  return (
    <div
      className="absolute bg-black/70  flex justify-center items-center p-4 top-0 left-0 h-screen w-screen z-50"
      onClick={cancelPopup}
    >
      <div className="text-white absolute top-5 right-10 text-4xl cursor-pointer">
        X
      </div>
      <div
        className="bg-white rounded-md w-2/6 h-4/6"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="border-b border-gray-700 p-2">Create New Post</div>

        <div className="flex justify-center items-center h-full font-semibold flex-col gap-5">
          <img
            className="flex justify-center items-center"
            src={postPopupImg}
            alt="posrtpopupimg"
            srcset=""
          />
          <div className="text-2xl  font-normal">Add image From computer +</div>
          <button className="loginButton">New Post</button>
        </div>
      </div>
    </div>
  );
}

export default NewPostPopup;
