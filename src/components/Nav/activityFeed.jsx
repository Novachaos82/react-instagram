import { getAuth } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";

import { useState } from "react";
import { db } from "../../firebase";
import ActivityFeedPopup from "./ActivityFeedPopup";

function ActivityFeed({ cancelPopup }) {
  const [profileData, setProfileData] = useState([]);

  const user = getAuth();
  const currentUser = user.currentUser;
  const gettingFeed = async () => {
    const userReference = collection(db, "users");
    const q = query(userReference, where("uid", "==", currentUser?.uid));

    onSnapshot(q, (documents) => {
      let postDocs = [];
      documents.forEach((doc) => {
        postDocs.push(doc.data());

        setProfileData(postDocs);
      });
    });
  };

  useEffect(() => {
    gettingFeed();
  }, []);

  return (
    <div onClick={cancelPopup} className="fixed top-0 left-0 w-screen h-screen">
      <div className="fixed w-[230px] h-[120px] left-[calc(100vw_/_2_+_150px)] top-[57px] bg-white ">
        <div className="absolute w-[100%] h-[100%] rounded-sm bg-black text-white flex overflow-hidden flex-col">
          {profileData?.map((doc, index) => {
            return (
              <div key={index}>
                <ActivityFeedPopup activityFeed={doc.activityFeed} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ActivityFeed;
