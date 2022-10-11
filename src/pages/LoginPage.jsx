import React, { useEffect, useRef } from "react";
import {
  signInWithGoogle,
  logout,
  useAuth,
  registerWithEmailAndPassword,
  logInWithEmailAndPassword,
} from "../firebase";

import { useNavigate } from "react-router-dom";

function LoginPage() {
  const emailRef = useRef();
  const passwordRef = useRef();
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
    console.log(currentUser);
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
    <div>
      <input ref={emailRef} placeholder="email" type="text"></input>
      <input ref={passwordRef} placeholder="password"></input>

      <button onClick={handleLogin}>Login</button>
      <button onClick={signInWithGoogle}>sign in with google</button>
      <button onClick={handleRegister}>Register</button>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
}

export default LoginPage;
