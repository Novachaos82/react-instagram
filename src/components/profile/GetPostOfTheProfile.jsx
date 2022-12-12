import { collection, onSnapshot, query, where } from "firebase/firestore";
import React from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { db } from "../../firebase";
import PostInProfile from "./PostInProfile";

function GetPostOfTheProfile({ id, onUpdate }) {
  const [post, setPost] = useState([]);

  const fetchPosts = useCallback(async () => {
    const postRef = collection(db, "imageDta");

    const allPosts = query(
      postRef,

      where("uid", "==", id)
    );
    onSnapshot(allPosts, (documents) => {
      const postDocs = [];
      documents.forEach((doc) => {
        postDocs.push(doc.data());
        setPost(postDocs);
      });
    });
  }, [id]);
  //const fetchPosts = async () => {

  //};

  useEffect(() => {
    fetchPosts();
    //post.map((doc) => {
    //  console.log(doc);
    //});
  }, [fetchPosts]);

  useEffect(() => {
    // Fetch the posts for the user with the given username
    // When the posts are fetched, call the onUpdate prop with the number of posts
    onUpdate(post.length);
  }, [post.length, onUpdate]);

  return (
    <div>
      <div className="flex  flex-wrap gap-7">
        {post?.map((post) => {
          return (
            <div key={post.postID}>
              <PostInProfile
                profilePic={post.displayImage}
                profileName={post.displayName}
                imageURL={post.imageURL}
                likes={post.like}
                postID={post.postID}
                uid={post.uid}
                comments={post.comment}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default GetPostOfTheProfile;
