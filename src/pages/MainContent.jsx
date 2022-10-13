import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Inbox from "../components/Inbox";
import HomeFeed from "./HomeFeed";
import LoginPage from "./LoginPage";

function MainContent() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomeFeed />} />
        <Route path="/inbox" element={<Inbox />} />
      </Routes>
    </div>
  );
}

export default MainContent;
