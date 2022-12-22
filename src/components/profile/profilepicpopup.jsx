import React from "react";
import { useNavigate } from "react-router-dom";
import { logout, useAuth } from "../../firebase";
import { CgProfile } from "react-icons/cg";

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
      <div className="fixed w-[230px] h-[80px] left-[calc(100vw_/_2_+_150px)] top-[57px] bg-white rounded-md drop-shadow-lg">
        <div className="absolute w-[100%] h-[100%] rounded-md bg-white text-black flex overflow-hidden flex-col ">
          <div
            className="cursor-pointer  px-4 py-2 flex items-center gap-4 border-b hover:bg-[#fafafa]"
            onClick={handleProfileClick}
          >
            <CgProfile size={18} />
            Profile
          </div>

          <div
            onClick={handleLogout}
            className="cursor-pointer  px-4 py-2 flex items-center gap-4 border-b hover:bg-[#fafafa]"
          >
            logout
          </div>
        </div>
      </div>
    </div>
    //</div>
  );
}

export default Profilepicpopup;
