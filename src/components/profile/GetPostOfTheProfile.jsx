import { collection, getDocs, query, where } from "firebase/firestore";
import React from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { db } from "../../firebase";

function GetPostOfTheProfile({ id }) {
  const [post, setPost] = useState([]);

  const fetchPosts = useCallback(async () => {
    const postRef = collection(db, "imageDta");
    const q = query(postRef, where("uid", "==", id));

    const posts = await getDocs(q);
    const letPost = [];
    posts.forEach((doc) => {
      letPost.push(doc.data());
      //  console.log(letPost);
    });
    setPost(letPost);
  }, [id]);
  //const fetchPosts = async () => {

  //};

  useEffect(() => {
    fetchPosts();
    //post.map((doc) => {
    //  console.log(doc);
    //});
  }, [fetchPosts]);
  console.log(post.length);
  return (
    <div>
      <div className="flex  flex-wrap gap-7">
        {post.map((images, index) => {
          return (
            <div key={index}>
              <img
                className="h-[293px] w-[293px] object-cover"
                src={images.imageURL}
                alt={images.imageURL}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default GetPostOfTheProfile;
