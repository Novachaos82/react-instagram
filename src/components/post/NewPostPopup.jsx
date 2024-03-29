import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
//import { v4 } from "uuid";
import { db, storage, useAuth } from "../../firebase";
import postPopupImg from "../../images/postPopup.svg";
import { uuidv4 } from "@firebase/util";

import DotLoader from "react-spinners/DotLoader";

function NewPostPopup({ cancelPopup }) {
  const currentUser = useAuth();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  //const [imageList, setImageList] = useState([]);
  const [url, setUrl] = useState(null);
  //const imageListRef = ref(storage, `images/${currentUser?.email}/`);
  const imageDataRef = collection(db, "imageDta");
  //const uploadTask = ref(storage, `images/${currentUser?.email}/${image.name}`);

  const handleImageUpload = () => {
    if (image == null) return;
    const imageRef = ref(storage, `images/${currentUser.email}/${image.name}`);

    //const uploadTask = ref(
    //  storage,
    //  `images/${currentUser.email}/${image.name}`
    //).put(image);
    setLoading(true);
    uploadBytes(imageRef, image).then(() => {
      getDownloadURL(imageRef).then((urlll) => {
        setUrl(urlll);
      });
      setImage(null);
      setLoading(false);
    });

    //console.log(url + ">>>>>url");
  };

  useEffect(() => {
    //listAll(imageListRef).then((response) => {
    //  response.items.forEach((item) => {
    //    getDownloadURL(item).then((url) => {
    //      setImageList((prev) => [...prev, url]);
    //      setUrl(url);
    //    });
    //  });
    //});
    const addData = async () => {
      await addDoc(imageDataRef, {
        displayName: currentUser?.displayName,
        displayImage: currentUser?.photoURL,
        uid: currentUser?.uid,
        like: [],
        comment: [],
        imageURL: url,
        postID: uuidv4(),
        timestamp: serverTimestamp(),
      });
    };
    addData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const fileUploader = (e) => {
    setImage(e.target.files[0]);
    //const file = e.target.files[0];
    //setUrl(URL.createObjectURL(file));
  };

  return (
    <div
      className="absolute bg-black/70  flex justify-center items-center p-4 top-0 left-0 h-screen w-screen z-50"
      onClick={!loading ? cancelPopup : ""}
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
          />
          <div className="text-2xl  font-normal">Add image From computer +</div>
          <input type="file" onChange={fileUploader}></input>
          <button className="loginButton" onClick={handleImageUpload}>
            New Post
          </button>
          <div className="flex items-center flex-col">
            <DotLoader loading={loading} color="black" />
            {loading ? "wait while uploading" : ""}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewPostPopup;
