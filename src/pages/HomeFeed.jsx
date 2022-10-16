import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout, useAuth } from "../firebase";
import Posts from "../components/post/posts";
function HomeFeed() {
  return (
    <div>
      homefeed
      <Posts />
    </div>
  );
}

export default HomeFeed;
