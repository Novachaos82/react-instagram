import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { AiFillHome, AiFillMessage } from "react-icons/ai";
import Profilepicpopup from "../profile/profilepicpopup";
import { useAuth } from "../../firebase";
//import {instaText} from "../../assets";

function NavLinks() {
  const currentUser = useAuth();
  const [profilePicPopup, setProfilePicPopup] = useState(false);

  const handleProfilePopup = () => {
    setProfilePicPopup(true);
  };
  if (currentUser) {
  }

  return (
    <div className=" flex  flex-row justify-center items-center mt-2">
      <div className="text-center flex justify-center items-center gap-5 flex-row">
        <Link to="/home">
          <img src="../../assets/instaText.png" alt="instatext" />
        </Link>
        <Link to="/home">
          <AiFillHome />
        </Link>
        <Link to="/inbox">
          <AiFillMessage />
        </Link>
        <div>
          <div onClick={handleProfilePopup} className="relative">
            <img
              className="rounded-full h-8 w-8"
              src={currentUser?.photoURL}
              alt="profile"
            ></img>
          </div>
          {profilePicPopup ? (
            <Profilepicpopup
              className="flex"
              cancelPopup={() => setProfilePicPopup(false)}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default NavLinks;
