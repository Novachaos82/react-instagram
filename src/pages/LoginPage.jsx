import React, { useEffect } from "react";
import { signInWithGoogle, useAuth } from "../firebase";

import images from "../images/images.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

function LoginPage() {
  const currentUser = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/home");
    }
  }, [currentUser, navigate]);

  let containerVariant = {
    hidden: {
      y: 200,
      opacity: 0,
      borderRadius: 100,
    },
    visible: {
      opacity: 1,
      y: 0,
      borderRadius: 10,
      transition: {
        delay: 0.25,
        duration: 0.5,
        type: "tween",
        damping: 25,
      },
    },
  };

  return (
    <div className="justify-center flex items-center h-screen bg-loginBg w-screen flex-col gap-8 ">
      <motion.div
        className="bg-loginContainer border border-gray-400 p-8 flex  flex-col gap-2 w-[350px] justify-center"
        variants={containerVariant}
        initial="hidden"
        animate="visible"
      >
        <div className="  flex justify-center items-center p-8">
          <img src={images} alt="nothing" className="w-[200px]" />
        </div>

        <div className="flex flex-col gap-2"></div>

        <div className="flex flex-col gap-2">
          <button
            className="loginButton flex items-center gap-10 "
            onClick={signInWithGoogle}
          >
            <FcGoogle size={22} />
            Sign in with google
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default LoginPage;
