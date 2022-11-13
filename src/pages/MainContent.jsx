import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Inbox from "../components/Inbox";
import Profile from "../components/profile/profile";
import { useAuth } from "../firebase";
import HomeFeed from "./HomeFeed";
import LoginPage from "./LoginPage";

function MainContent() {
  const currentUser = useAuth();

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomeFeed />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/profile/:username" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default MainContent;
