import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import HomePage from "./Components/HomePage";
import LeaderboardPage from "./Components/LeaderboardPage";
import TasksPage from "./Components/TasksPage";
import ProgressPage from "./Components/ProgressPage";
import LoginPage from "./Components/LoginPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <nav className="mainNav">
          <Link to="/">
            <img
              src="./src/assets/easterneggslogo.png"
              alt="logo"
            />
          </Link>
          <Link to="/">Eastern Eggs</Link>
          <button className="hamburgerMenu">☰</button>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="leaderboard" element={<LeaderboardPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
