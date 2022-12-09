import {
  arrayUnion,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { db, useAuth } from "../../firebase";
import GetPostOfTheProfile from "./GetPostOfTheProfile";

function Profile({ currentUser }) {
  const { username } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  const [follow, setFollow] = useState(false);
  const [userProfile, setUserProfile] = useState([]);
  const [meProfile, setMeProfile] = useState([]);
  //const currentUser = useAuth();

  //const documentCollection = collection(db, "users").where(
  //  "uid",
  //  "==",
  //  username
  //);

  //console.log(currentUser?.uid);
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
  //console.log(userDetails);

  const followHandler = () => {
    setFollow(!follow);
  };

  //console.log(follow);

  const fetchBothUserData = async () => {
    const userReference = collection(db, "users");
    const qForUser = query(userReference, where("uid", "==", username));
    const qForMe = query(userReference, where("uid", "==", currentUser?.uid));

    const getUserDocs = await getDocs(qForUser);

    getUserDocs.forEach((doc) => {
      setUserProfile(doc.data());
    });
    //const docs

    const getMeDocs = await getDocs(qForMe);
    getMeDocs.forEach((doc) => {
      setMeProfile(doc.data());
    });
  };
  const followingHandler = useCallback(() => {
    //if (!meProfile?.following.includes(userProfile.uid)) {
    //  followHandler();
    //}
    console.log(meProfile?.following.includes(meProfile.uid));
    //console.log(meProfile.uid)
    //await updateDoc(qForCurrentUser,{following:arrayUnion})
    //if(meProfile.following.includes(userProfile.uid))
    //{
    //  unfollowHandler();
    //}
  }, [userProfile, meProfile]);

  //console.log(userProfile.uid);
  //console.log(meProfile);
  useEffect(() => {
    fetchBothUserData();
  }, []);

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
              <button
                onClick={followingHandler}
                className="p-2 border  rounded-md"
              >
                {!follow ? <div>follow</div> : <div>unfollow</div>}
              </button>
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
