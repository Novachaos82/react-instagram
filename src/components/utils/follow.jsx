import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

async function follow(meUsername, username, meDisplayName) {
  const meRef = doc(db, "users", meUsername);
  const userRef = doc(db, "users", username);
  await updateDoc(meRef, {
    following: arrayUnion(username),
  });
  await updateDoc(userRef, {
    followers: arrayUnion(meUsername),
  });
  await updateDoc(userRef, {
    activityFeed: arrayUnion({ category: "follow", username: meDisplayName }),
  });
}

async function unfollow(meUsername, username, meDisplayName) {
  const meRef = doc(db, "users", meUsername);
  const userRef = doc(db, "users", username);
  await updateDoc(meRef, {
    following: arrayRemove(username),
  });
  await updateDoc(userRef, {
    followers: arrayRemove(meUsername),
  });
  await updateDoc(userRef, {
    activityFeed: arrayRemove({ category: "follow", username: meDisplayName }),
  });
}

export { follow, unfollow };
