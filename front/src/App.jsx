import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import HomePage from "./Components/HomePage";
import LeaderboardPage from "./Components/LeaderboardPage";
import TasksPage from "./Components/TasksPage";
import ProgressPage from "./Components/ProgressPage";
import LoginPage from "./Components/LoginPage";
import Navbar from "./Components/Navbar"; // Import Navbar Component

function App() {
  return (
    <BrowserRouter>
      {/* Navbar Component */}
      <Navbar />

      {/* Main Page Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="leaderboard" element={<LeaderboardPage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
