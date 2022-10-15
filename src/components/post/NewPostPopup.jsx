import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import { db, storage, useAuth } from "../../firebase";
import postPopupImg from "../../images/postPopup.svg";

function NewPostPopup({ cancelPopup }) {
  const currentUser = useAuth();
  const [image, setImage] = useState(null);
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, `images/${currentUser?.email}/`);
  //const uploadTask = ref(storage, `images/${currentUser?.email}/${image.name}`);

  const handleImageUpload = () => {
    if (image == null) return;
    const imageRef = ref(storage, `images/${currentUser.email}/${image.name}`);
    //const uploadTask = ref(
    //  storage,
    //  `images/${currentUser.email}/${image.name}`
    //).put(image);
    uploadBytes(imageRef, image).then(() => {
      alert("image uplaoded");
    });

    //const imageDataRef = collection(db, "imageDta");
    //addDoc(imageDataRef, {
    //  displayName: currentUser.displayName,
    //  displayImage: currentUser.photoURL,
    //  uid: currentUser.uid,
    //  like: [],
    //  comment: [],
    //  image: imageList,
    //});
  };

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    });
  }, [imageListRef]);
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
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          ></input>
          <button className="loginButton" onClick={handleImageUpload}>
            New Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewPostPopup;
