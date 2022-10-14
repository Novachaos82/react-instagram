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
    <div onClick={() => cancelPopup()} className="z-50">
      <div className=" bg-black text-white  rounded-lg p-4 ">
        <div onClick={handleLogout} className="cursor-pointer">
          logout
        </div>
        <div className="cursor-pointer">fuck</div>
      </div>
    </div>
  );
}

export default Profilepicpopup;
