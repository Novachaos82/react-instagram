import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, logout, useAuth } from "../firebase";
import Posts from "../components/post/posts";
import { collection, getDocs } from "firebase/firestore";
function HomeFeed() {
  return (
    <div>
      homefeed
      <Posts />
    </div>
  );
}

export default HomeFeed;
