<<<<<<< Updated upstream
import {BrowserRouter, Route, Routes} from "react-router-dom"
import './App.css'
import HomePage from "./Components/HomePage"
import LeaderboardPage from "./Components/LeaderboardPage"
import TasksPage from "./Components/TasksPage"
import ProgressPage from "./Components/ProgressPage"
=======
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import HomePage from "./Components/HomePage";
import LeaderboardPage from "./Components/LeaderboardPage";
import TasksPage from "./Components/TasksPage";
import ProgressPage from "./Components/ProgressPage";
import LoginPage from "./Components/LoginPage";
>>>>>>> Stashed changes

function App() {
  return (
    <>
<<<<<<< Updated upstream
     <BrowserRouter>
      <nav></nav>
      <Routes>
        <Route for="/" element={<HomePage />} />
        <Route for="leaderboard" element={<LeaderboardPage />}/>
        <Route for="/tasks" element={<TasksPage />}/>
        <Route for="/progress" element={<ProgressPage />}/>
      </Routes>
     </BrowserRouter>
=======
      <BrowserRouter>
        <nav>
          <Link to="/">
            <img
              src="https://cdn-icons-png.flaticon.com/128/4337/4337076.png"
              alt="logo"
            />
          </Link>
          <Link to="/">Home</Link>
          <button>☰</button>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="leaderboard" element={<LeaderboardPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
>>>>>>> Stashed changes
    </>
  );
}

export default App;
