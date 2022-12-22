import React, { useState } from "react";
import { Link } from "react-router-dom";

import Profilepicpopup from "../profile/profilepicpopup";
import { useAuth } from "../../firebase";
import instaText from "../../images/images.png";
import {} from "firebase/firestore";
import NewPostPopup from "../post/NewPostPopup";
import Searchbar from "./Searchbar";
import { useEffect } from "react";
//import ActivityFeed from "./activityFeed";

import addPost from "../../images/addPost.svg";
import home from "../../images/home.svg";
import message from "../../images/message.svg";

function NavLinks() {
  const currentUser = useAuth();
  const [profilePicPopup, setProfilePicPopup] = useState(false);
  const [postPopup, setPostPopup] = useState(false);
  //const [activityPopup, setActivityPopup] = useState(false);
  //const userCollectionRef = collection(db, "users");

  const handleProfilePopup = () => {
    setProfilePicPopup(!profilePicPopup);
  };

  const handlePostPopup = () => {
    setPostPopup(!postPopup);
    document.body.style.overflow = "hidden";
  };

  //const handleActivityPopup = () => {
  //  setActivityPopup(!activityPopup);
  //};

  useEffect(() => {
    if (!postPopup) document.body.style.overflow = "unset";
  }, [postPopup]);

  //useEffect(() => {
  //  const getUsers = async () => {
  //    const data = await getDocs(userCollectionRef);
  //    data.docs.map((doc) => {
  //      //console.log({ ...doc.data(), id: doc.id });
  //    });
  //  };
  //  getUsers();
  //}, [userCollectionRef]);

  return (
    <div className="     sticky top-0 w-[100%] bg-white p-2 shadow-sm h-[59px] items-center flex justify-center">
      <div className="text-center flex justify-center items-center  flex-row">
        <div className="w-[300px]">
          <Link to="/home">
            <img src={instaText} alt="instatext" className="w-[100px]" />
          </Link>
        </div>
        <div className="flex gap-6 flex-row justify-center items-center">
          <Searchbar />
          <Link to="/home">
            <img src={home} alt="" />
          </Link>
          <Link to="/inbox">
            <img src={message} alt="" />
          </Link>
          <div className="flex justify-center">
            <button onClick={handlePostPopup}>
              <img src={addPost} alt="" />
            </button>
            {postPopup ? (
              <NewPostPopup cancelPopup={() => setPostPopup(false)} />
            ) : null}
          </div>

          <div>
            <div
              onClick={handleProfilePopup}
              className="relative cursor-pointer"
            >
              <img
                className="rounded-full h-8 w-8"
                src={currentUser?.photoURL}
                alt="profile"
              ></img>
            </div>
            {profilePicPopup ? (
              <Profilepicpopup cancelPopup={() => setProfilePicPopup(false)} />
            ) : null}
          </div>
          {/*<div onClick={handleActivityPopup}>
          <MdOutlineNotifications size={28} />
        </div>*/}
          {/*{activityPopup ? (
          <ActivityFeed cancelPopup={() => setActivityPopup(false)} />
        ) : null}*/}
        </div>
      </div>
    </div>
  );
}

export default NavLinks;
