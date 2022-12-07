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
    <div className="mt-8 flex justify-center">
      <div className="w-[935px]  flex flex-col justify-center">
        <div className="flex  pb-20 border-b border-[#d3d3d3] mb-14">
          <img
            className="rounded-full w-[150px] h-[150px] mr-28 ml-28"
            src={userDetails?.displayImage}
            alt="nothing"
          />

          <div className="">
            <div className="flex gap-5 items-center mb-5">
              <div className="font-semibold text-xl">
                {userDetails?.displayName}
              </div>
              <button className="p-2 border  rounded-md">follow</button>
            </div>
            <div className="flex gap-10 text-md capitalize">
              <div>posts</div>
              <div>follower</div>
              <div>following</div>
            </div>
          </div>
        </div>
        <GetPostOfTheProfile id={username} />
      </div>
    </div>
  );
}

export default Profile;
