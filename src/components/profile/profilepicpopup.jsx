import React from "react";
import { useNavigate } from "react-router-dom";
import { logout, useAuth } from "../../firebase";

function Profilepicpopup({ cancelPopup }) {
  const currentUser = useAuth();
  //const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    //setLoading(true);
    try {
      await logout();
      navigate("/");
    } catch {
      alert("error");
    }
    //setLoading(false);
  };

  const handleProfileClick = () => {
    navigate("/profile/" + currentUser.uid);
  };
  return (
    <div onClick={cancelPopup} className="fixed top-0 left-0 w-screen h-screen">
      {/*<div
        className=""
        onClick={(e) => {
          e.stopPropagation();
        }}
      >*/}
      <div className="fixed w-[230px] h-[120px] left-[calc(100vw_/_2_+_150px)] top-[57px] bg-white ">
        <div className="absolute w-[100%] h-[100%] rounded-sm bg-black text-white flex overflow-hidden flex-col">
          <div
            onClick={handleLogout}
            className="cursor-pointer hover:bg-blue-300 px-4 py-2"
          >
            logout
          </div>
          <div className="cursor-pointer  hover:bg-blue-300 px-4 py-2">
            fuck
          </div>
          <div
            className="cursor-pointer hover:bg-blue-300 px-4 py-2"
            onClick={handleProfileClick}
          >
            {" "}
            Profile
          </div>
        </div>
      </div>
    </div>
    //</div>
  );
}

export default Profilepicpopup;
