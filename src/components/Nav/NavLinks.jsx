import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../firebase";

import { AiFillHome, AiFillMessage } from "react-icons/ai";
//import {instaText} from "../../assets";

function NavLinks() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      navigate("/");
    } catch {
      alert("error");
    }
    setLoading(false);
  };

  return (
    <div>
      <div>
        <Link to="/home">
          <img src="../../assets/instaText.png" alt="instatext" srcset="" />
        </Link>
      </div>
      <div>
        <Link to="/home">
          <AiFillHome />
        </Link>
        <Link to="/inbox">
          <AiFillMessage />
        </Link>
        <button disabled={loading} onClick={handleLogout}>
          logout
        </button>
      </div>
    </div>
  );
}

export default NavLinks;
