import React, { useEffect, useRef } from "react";
import {
  signInWithGoogle,
  logout,
  useAuth,
  registerWithEmailAndPassword,
  logInWithEmailAndPassword,
} from "../firebase";

import images from "../images/images.png";

import { useNavigate } from "react-router-dom";

function LoginPage() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();
  const currentUser = useAuth();

  const navigate = useNavigate();
  //if (currentUser) {
  //  console.log(currentUser.email);
  //}

  //useEffect(() => {
  //  console.log(emailRef.current.value);
  //}, [emailRef]);

  useEffect(() => {
    if (currentUser) {
      navigate("/home");
    }
    //console.log(currentUser);
  }, [currentUser, navigate]);

  const handleLogin = async () => {
    try {
      await logInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      );
    } catch {}
  };

  const handleRegister = async () => {
    try {
      await registerWithEmailAndPassword(
        nameRef.current.value,
        emailRef.current.value,
        passwordRef.current.value
      );
    } catch {}
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch {
      alert("error");
    }
  };

  return (
    <div className="justify-center flex items-center h-screen bg-loginBg w-screen flex-col gap-8">
      <div className="bg-loginContainer border border-gray-400 p-8 flex  flex-col gap-2 w-[350px] justify-center">
        <div className="  flex justify-center items-center p-8">
          <img src={images} alt="nothing" className="w-[200px]" />
        </div>

        <div className="flex flex-col gap-2">
          <input
            className="inputs"
            ref={nameRef}
            placeholder="Name"
            type="text"
          ></input>
          <input
            className="inputs"
            ref={emailRef}
            placeholder="email"
            type="text"
          ></input>
          <input
            className="inputs"
            ref={passwordRef}
            placeholder="password"
          ></input>
        </div>

        <div className="flex flex-col gap-2">
          <button className="loginButton" onClick={handleLogin}>
            Login
          </button>
          <button className="loginButton" onClick={signInWithGoogle}>
            login(google)
          </button>

          <button className="loginButton" onClick={handleLogout}>
            logout
          </button>
        </div>
      </div>
      <div className="bg-loginContainer border border-gray-400 p-4 flex  flex-col gap-2 w-[350px] justify-center items-center ">
        <p className="text-gray-600 tracking-wide">
          Don't have an account?
          <button className="text-blue-500" onClick={handleRegister}>
            Register
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
