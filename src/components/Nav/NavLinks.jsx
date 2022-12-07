import React, { useState } from "react";
import { Link } from "react-router-dom";

import { AiFillHome, AiFillMessage, AiFillPlusCircle } from "react-icons/ai";
import Profilepicpopup from "../profile/profilepicpopup";
import { useAuth } from "../../firebase";
import instaText from "../../images/images.png";
import {} from "firebase/firestore";
import NewPostPopup from "../post/NewPostPopup";
import Searchbar from "./Searchbar";
import { useEffect } from "react";

function NavLinks() {
  const currentUser = useAuth();
  const [profilePicPopup, setProfilePicPopup] = useState(false);
  const [postPopup, setPostPopup] = useState(false);
  //const userCollectionRef = collection(db, "users");

  const handleProfilePopup = () => {
    setProfilePicPopup(!profilePicPopup);
  };

  const handlePostPopup = () => {
    setPostPopup(!postPopup);
    document.body.style.overflow = "hidden";
  };

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
    <div className=" flex  flex-row justify-center items-center  sticky top-0 w-[100%] bg-white p-2 shadow-md">
      <div className="text-center flex justify-center items-center gap-5 flex-row">
        <Link to="/home">
          <img src={instaText} alt="instatext" className="w-[100px]" />
        </Link>
        <Searchbar />
        <Link to="/home">
          <AiFillHome size={28} />
        </Link>
        <Link to="/inbox">
          <AiFillMessage size={28} />
        </Link>
        <div className="flex justify-center">
          <button onClick={handlePostPopup}>
            <AiFillPlusCircle size={28} />
          </button>
          {postPopup ? (
            <NewPostPopup cancelPopup={() => setPostPopup(false)} />
          ) : null}
        </div>

        <div>
          <div onClick={handleProfilePopup} className="relative cursor-pointer">
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
      </div>
    </div>
  );
}

export default NavLinks;
