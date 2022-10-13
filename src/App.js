import "./App.css";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter } from "react-router-dom";
//import HomePage from "./pages/HomeFeed";
import MainContent from "./pages/MainContent";
import Navbar from "./components/Nav/Navbar";
import { useAuth } from "./firebase";

function App() {
  const currentUser = useAuth();
  return (
    <BrowserRouter>
      {currentUser ? (
        <div>
          <Navbar />
          <MainContent />
        </div>
      ) : (
        <div>
          <LoginPage />
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
