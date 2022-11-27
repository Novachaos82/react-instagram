import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";

import { db } from "../../firebase";
import comment from "../../images/comment.svg";
import like from "../../images/postLike.svg";
import share from "../../images/share.svg";
import { Link } from "react-router-dom";
import PostLikeButton from "./postLikeButton";
function Posts() {
  const [imgData, setImgData] = useState([]);
  const imageDataRef = collection(db, "imageDta");
  let postID;
  useEffect(() => {
    const getImage = async () => {
      const data = await getDocs(imageDataRef);
      setImgData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getImage();
  }, []);

  //get image url through this
  //useEffect(() => {
  //  imgData.map((img) => {
  //    //console.log(img.imageURL);
  //  });
  //}, []);
  const likeClick = (id) => {
    postID = id;
    console.log(postID);
  };

  return (
    <div className="flex flex-col gap-28">
      {imgData.map((datas) => {
        return (
          <div key={datas.id} className="flex justify-center">
            <div className="w-2/6 flex  flex-col border">
              <Link to={"/profile/" + datas.uid}>
                <div className="flex justify-start gap-10 items-center px-4 py-4">
                  <img
                    className="w-8 h-8 rounded-full"
                    src={datas.displayImage}
                    alt=""
                  />
                  <div className="font-semibold">{datas.displayName}</div>
                </div>
              </Link>

              <img src={datas.imageURL} alt="" />
              <div className="flex p-4 gap-4">
                <PostLikeButton
                  onClick={() => {
                    likeClick(datas.id);
                  }}
                  likeClickData={postID}
                  source={like}
                />

                <img src={comment} alt="" />
                <img src={share} alt="" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Posts;
