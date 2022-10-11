import "./App.css";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
