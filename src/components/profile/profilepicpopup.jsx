import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../firebase";

function Profilepicpopup({ cancelPopup }) {
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
    <div onClick={() => cancelPopup()} className=" bg-yellow-200">
      <div className=" bg-black text-white  rounded-lg p-4 z-50 fixed top-10">
        <div onClick={handleLogout} className="cursor-pointer">
          logout
        </div>
        <div className="cursor-pointer">fuck</div>
      </div>
    </div>
  );
}

export default Profilepicpopup;
