import { getAuth } from "firebase/auth";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase";

import like from "../../images/postLike.svg";
import Unlike from "../../images/postUnlike.svg";
import CommentHandlng from "./CommentHandlng";
import { motion } from "framer-motion";

function PostPopup({
  comments,
  commentPopupShown,
  commentPopupHandler,
  postUnlike,
  postLike,
  postID,
  likes,
  imageURL,
  profileName,
  profilePic,
  uid,

  setComment,
  handleSubmit,
  timestamp,
}) {
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const [userID, setUserID] = useState();

  const likeHandler = async (postID) => {
    let id;
    const selectedPost = query(
      collection(db, "imageDta"),
      where("postID", "==", postID)
    );

    const postSnapshot = await getDocs(selectedPost);
    postSnapshot.forEach((doc) => {
      id = doc.id;
    });

    const postReference = doc(db, "imageDta", id);
    await updateDoc(postReference, {
      like: arrayUnion(currentUser?.displayName),
    });

    if (currentUser.uid !== uid) {
      const postUser = collection(db, "users");

      const userQ = query(postUser, where("uid", "==", uid));

      const getUser = await getDocs(userQ);

      getUser.forEach((doc) => {
        setUserID(doc.id);
      });

      const userReference = doc(db, "users", userID);

      await updateDoc(userReference, {
        activityFeed: arrayUnion({
          category: "like",
          postID: postID,
          username: currentUser?.displayName,
        }),
      });
    }
  };

  const unlikeHandler = async (postID) => {
    let id;
    const selectedPost = query(
      collection(db, "imageDta"),
      where("postID", "==", postID)
    );

    const postSnapshot = await getDocs(selectedPost);
    postSnapshot.forEach((doc) => {
      id = doc.id;
    });

    const postReference = doc(db, "imageDta", id);
    await updateDoc(postReference, {
      like: arrayRemove(currentUser?.displayName),
    });

    if (currentUser.uid !== uid) {
      const userReference = doc(db, "users", userID);

      await updateDoc(userReference, {
        activityFeed: arrayRemove({
          category: "like",
          postID: postID,
          username: currentUser?.displayName,
        }),
      });
    }
  };

  const commentHandler = async (postId, comments) => {
    let commentObj = {
      author: currentUser.displayName,
      comments,
      photo: currentUser.photoURL,
    };

    let id;
    const selectedPost = query(
      collection(db, "imageDta"),
      where("postID", "==", postId)
    );

    const postSnapshot = await getDocs(selectedPost);
    postSnapshot.forEach((doc) => {
      id = doc.id;
    });

    const postReference = doc(db, "imageDta", id);

    await updateDoc(postReference, {
      comment: arrayUnion(commentObj),
    });

    if (currentUser.uid !== uid) {
      const userReference = doc(db, "users", userID);

      await updateDoc(userReference, {
        activityFeed: arrayUnion({
          category: "comment",
          postID: postID,
          username: currentUser?.displayName,
          comment: comments,
        }),
      });
    }
  };

  let popupVariant = {
    hidden: {
      x: 0,
      opacity: 0,
    },
    visible: {
      opacity: 1,
      y: "0",
      borderRadius: 10,
      transition: {
        delay: 0.1,
        duration: 0.8,
        type: "tween",
        damping: 100,
        stiffness: 500,
      },
    },

    exit: {
      y: "100vh",
      opacity: 0,
    },
  };
  return (
    <div key={postID}>
      {commentPopupShown ? (
        <div
          className="fixed top-0 left-0 w-screen h-screen bg-[#595959] z-10"
          onClick={commentPopupHandler}
        >
          <motion.div
            className="fixed w-5/6 h-5/6 left-[calc(20vw-200px)]  top-[57px] bg-white rounded-xl"
            onClick={(e) => {
              e.stopPropagation();
            }}
            variants={popupVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="absolute w-[100%] h-[100%]  bg-[#fff]  flex overflow-hidden flex-row rounded-xl">
              <img
                src={imageURL}
                alt=""
                className=" w-4/6 object-contain bg-black"
              />
              <div className="w-2/6 ">
                <Link to={"/profile/" + uid}>
                  <div className="flex items-center p-4 gap-3 border-b border-[#ccc] w-full h-[10%]">
                    <img
                      src={profilePic}
                      alt={profileName}
                      className="h-10 w-10 rounded-full"
                    />

                    <div className="font-bold">{profileName}</div>
                  </div>
                </Link>
                <div className="h-2/3 overflow-auto ">
                  {comments.map((comm) => {
                    return (
                      <div className="flex justify-start gap-5 p-4 ">
                        <div className="flex gap-4 items-start">
                          <img
                            className="h-8 w-8 rounded-full"
                            src={comm.photo}
                            alt="profile pic"
                          />
                          <div className="font-semibold">{comm.author}</div>
                        </div>
                        <div className="font-extralight">{comm.comments}</div>
                      </div>
                    );
                  })}
                </div>
                <div className="h-fit p-2">
                  <div className="flex p-4 gap-4 items-center">
                    <div>
                      {!likes.includes(currentUser?.displayName) && (
                        <img
                          className="h-6 w-6 flex justify-center cursor-pointer"
                          src={like}
                          alt="love-outline"
                          onClick={() => likeHandler(postID)}
                        />
                      )}
                      {likes.includes(currentUser?.displayName) && (
                        <img
                          className="h-6 w-6 flex justify-center cursor-pointer"
                          src={Unlike}
                          alt="love-outline"
                          onClick={() => unlikeHandler(postID)}
                        />
                      )}
                    </div>
                    <div className="font-semibold">{likes.length} likes</div>
                  </div>
                  <div className="font-extralight text-gray-500 text-xs px-5 text-left">
                    {timestamp?.toDate().toDateString()}
                  </div>
                  <CommentHandlng
                    commentHandler={commentHandler}
                    postID={postID}
                    comments={comments}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default PostPopup;
