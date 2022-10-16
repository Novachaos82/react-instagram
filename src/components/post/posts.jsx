import { map } from "@firebase/util";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";

function Posts() {
  const [imgData, setImgData] = useState([]);
  const imageDataRef = collection(db, "imageDta");

  useEffect(() => {
    const getImage = async () => {
      const data = await getDocs(imageDataRef);
      setImgData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getImage();
  }, [imageDataRef]);

  useEffect(() => {
    imgData.map((img) => {
      console.log(img.imageURL);
    });
  }, []);

  useEffect(() => {}, [imgData]);
  return (
    <div>
      {imgData.map((datas) => {
        return (
          <div key={datas.id}>
            <div>
              <div>{datas.displayName}</div>
              <img src={datas.displayImage} alt="" srcset="" />
              <img src={datas.imageURL} alt="" srcset="" />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Posts;
