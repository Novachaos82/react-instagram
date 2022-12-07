import { collection, getDocs, query, where } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { db } from "../../firebase";

function GetPostOfTheProfile({ id }) {
  const [post, setPost] = useState([]);
  const fetchPosts = async () => {
    const postRef = collection(db, "imageDta");
    const q = query(postRef, where("uid", "==", id));

    const posts = await getDocs(q);
    const letPost = [];
    posts.forEach((doc) => {
      letPost.push(doc.data());
      //  console.log(letPost);
    });
    setPost(letPost);
  };

  useEffect(() => {
    fetchPosts();
    //post.map((doc) => {
    //  console.log(doc);
    //});
  }, []);
  post.map((doc) => {
    console.log(doc.imageURL);
  });
  return (
    <div>
      <div className="flex  flex-wrap gap-7">
        {post.map((images) => {
          return (
            <div>
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
