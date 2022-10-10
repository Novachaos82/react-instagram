import React from "react";
import { signInWithGoogle, logout, useAuth } from "../firebase";

function LoginPage() {
  const currentUser = useAuth();
  if (currentUser) {
    console.log(currentUser.email);
  }

  return (
    <div>
      <button onClick={signInWithGoogle}>sign in with google</button>
      <button onClick={logout}>logout</button>
    </div>
  );
}

export default LoginPage;
