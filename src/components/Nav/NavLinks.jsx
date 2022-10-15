import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { AiFillHome, AiFillMessage, AiFillPlusCircle } from "react-icons/ai";
import Profilepicpopup from "../profile/profilepicpopup";
import { db, useAuth } from "../../firebase";
import instaText from "../../images/images.png";
import { collection, getDocs } from "firebase/firestore";

function NavLinks() {
  const currentUser = useAuth();
  const [profilePicPopup, setProfilePicPopup] = useState(false);
  const userCollectionRef = collection(db, "users");

  const handleProfilePopup = () => {
    setProfilePicPopup(!profilePicPopup);
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);
      console.log(data);
    };
    getUsers();
  }, [userCollectionRef]);

  return (
    <div className=" flex  flex-row justify-center items-center mt-2">
      <div className="text-center flex justify-center items-center gap-5 flex-row">
        <Link to="/home">
          <img src={instaText} alt="instatext" className="w-[100px]" />
        </Link>
        <input
          placeholder="search"
          className="outline outline-1 outline-gray-500 px-2 py-1 rounded-md"
        ></input>
        <Link to="/home">
          <AiFillHome size={28} />
        </Link>
        <Link to="/inbox">
          <AiFillMessage size={28} />
        </Link>
        <button>
          <AiFillPlusCircle size={28} />
        </button>
        <div>
          <div onClick={handleProfilePopup} className="relative cursor-pointer">
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
