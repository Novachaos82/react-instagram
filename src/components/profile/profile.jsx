import { collection, getDocs, query, where } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import GetPostOfTheProfile from "./GetPostOfTheProfile";

function Profile() {
  const { username } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  //const documentCollection = collection(db, "users").where(
  //  "uid",
  //  "==",
  //  username
  //);

  const fun1 = async () => {
    const q = query(collection(db, "imageDta"), where("uid", "==", username));

    const docs = await getDocs(q);
    docs.forEach((doc) => {
      setUserDetails({ ...doc.data(), id: doc.id });
    });
  };

  useEffect(() => {
    fun1();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);
  console.log(userDetails);

  return (
    <div>
      <div className="flex">
        <img
          className="rounded-full"
          src={userDetails?.displayImage}
          alt="nothing"
        />

        <div>{userDetails?.displayName}</div>
      </div>
      <GetPostOfTheProfile id={username} />
    </div>
  );
}

export default Profile;
