import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { db, useAuth } from "../../firebase";
import Posts from "./posts";

function PostHome() {
  const currentUser = useAuth();

  const [posts, setPosts] = useState();

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
  };

  useEffect(() => {
    async function getPosts() {
      const allPosts = query(
        collection(db, "imageDta"),
        orderBy("timestamp", "desc")
      );
      onSnapshot(allPosts, (documents) => {
        const postDocs = [];
        documents.forEach((doc) => {
          postDocs.push(doc.data());
          setPosts(postDocs);
        });
      });
    }
    getPosts();
  }, []);

  return (
    <div>
      {posts?.map((post) => {
        return (
          <div key={post.postID}>
            <Posts
              profilePic={post.displayImage}
              profileName={post.displayName}
              imageURL={post.imageURL}
              likes={post.like}
              postID={post.postID}
              postLike={likeHandler}
              postUnlike={unlikeHandler}
              uid={post.uid}
              commentHandler={commentHandler}
              comments={post.comment}
            />
          </div>
        );
      })}
    </div>
  );
}

export default PostHome;
