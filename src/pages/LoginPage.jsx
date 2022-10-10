import React, { useEffect, useRef } from "react";
import {
  signInWithGoogle,
  logout,
  useAuth,
  registerWithEmailAndPassword,
  logInWithEmailAndPassword,
} from "../firebase";

function LoginPage() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const currentUser = useAuth();
  if (currentUser) {
    console.log(currentUser.email);
  }

  useEffect(() => {
    console.log(emailRef.current.value);
  }, [emailRef]);

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

  return (
    <div>
      <input ref={emailRef} placeholder="email" type="text"></input>
      <input ref={passwordRef} placeholder="password"></input>

      <button onClick={handleLogin}>Login</button>
      <button onClick={signInWithGoogle}>sign in with google</button>
      <button onClick={handleRegister}>Register</button>
      <button onClick={logout}>logout</button>
    </div>
  );
}

export default LoginPage;
