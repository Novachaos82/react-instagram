import { getAuth } from "firebase/auth";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import { follow, unfollow } from "../utils/follow";
import GetPostOfTheProfile from "./GetPostOfTheProfile";

function Profile() {
  const auth = getAuth();
  const { username } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  //const [following, setFollowing] = useState(false);
  const [userProfile, setUserProfile] = useState();
  const [meProfile, setMeProfile] = useState();
  const [meId, setMeId] = useState();
  const [userId, setUserId] = useState();
  const [postCount, setPostCount] = useState();
  const userDisplayImage = userDetails?.displayImage;
  //const [currentUser, setCurrentUser] = useState();

  const currentUser = auth.currentUser;

  const UserDetailFetcher = async () => {
    const q = query(collection(db, "imageDta"), where("uid", "==", username));

    const docs = await getDocs(q);
    docs.forEach((doc) => {
      setUserDetails({ ...doc.data(), id: doc.id });
    });
  };

  useEffect(() => {
    UserDetailFetcher();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  useEffect(() => {
    followingChecker();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchBothUserData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  const fetchBothUserData = async () => {
    const userReference = collection(db, "users");
    const qForUser = query(userReference, where("uid", "==", username));
    const qForMe = query(userReference, where("uid", "==", currentUser.uid));

    onSnapshot(qForUser, (document) => {
      document.forEach((doc) => {
        setUserProfile(doc.data());
        setUserId(doc.id);
      });
    });

    onSnapshot(qForMe, (document) => {
      document.forEach((doc) => {
        setMeProfile(doc.data());
        setMeId(doc.id);
      });
    });
  };

  const followingChecker = () => {
    if (meProfile?.following.includes(userId)) {
      console.log("yes following");
      //setFollowing(true);
    }
    if (!meProfile?.following.includes(userId)) {
      console.log("not following");
      //setFollowing(false);
    }
  };
  const followingHandler = async () => {
    if (!meProfile?.following.includes(userId)) {
      follow(meId, userId);
    }

    if (meProfile?.following.includes(userId)) {
      unfollow(meId, userId);
    }
  };

  const followerPopup = () => {
    console.log(userProfile?.followers);
  };

  const updatePostCount = useCallback((newPostCount) => {
    // Update the state with the new post count
    setPostCount(newPostCount);
  }, []);

  return (
    <div className="mt-8 flex justify-center">
      <div className="w-[935px]  flex flex-col justify-center">
        <div className="flex  pb-20 border-b border-[#d3d3d3] mb-14">
          <img
            className="rounded-full w-[150px] h-[150px] mr-28 ml-28"
            src={userDisplayImage}
            alt="nothing"
          />

          <div className="">
            <div className="flex gap-5 items-center mb-5">
              <div className="font-semibold text-xl">
                {userDetails?.displayName}
              </div>
              <div>
                <button
                  onClick={followingHandler}
                  className="p-2 border  rounded-md"
                >
                  <div>
                    {meProfile?.following.includes(userId) ? (
                      <button onClick={followingHandler}>Unfollow</button>
                    ) : (
                      <button onClick={followingHandler}>Follow</button>
                    )}
                  </div>
                </button>
              </div>
            </div>
            <div className="flex gap-10 text-md capitalize">
              <div>{postCount}posts</div>
              <div onClick={followerPopup}>
                {userProfile?.followers.length}follower
              </div>
              <div>{userProfile?.following.length}following</div>
            </div>
          </div>
        </div>
        <GetPostOfTheProfile id={username} onUpdate={updatePostCount} />
      </div>
    </div>
  );
}

export default Profile;
