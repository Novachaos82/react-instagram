import React from "react";

import { Route, Routes } from "react-router-dom";
import Inbox from "../components/Inbox";

import PostPopup from "../components/post/PostPopup";
import Profile from "../components/profile/profile";

import HomeFeed from "./HomeFeed";
import LoginPage from "./LoginPage";

function MainContent() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomeFeed />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/comments" element={<PostPopup />} />
      </Routes>
    </div>
  );
}

export default MainContent;
