import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout, useAuth } from "../firebase";

function HomePage() {
  const [loading, setLoading] = useState(false);
  const currentUser = useAuth();
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
      <button disabled={loading} onClick={handleLogout}>
        logout
      </button>
    </div>
  );
}

export default HomePage;
