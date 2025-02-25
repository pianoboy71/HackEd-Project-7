import {BrowserRouter, Route, Routes} from "react-router-dom"
import './App.css'
import HomePage from "./Components/HomePage"
import LeaderboardPage from "./Components/LeaderboardPage"
import TasksPage from "./Components/TasksPage"
import ProgressPage from "./Components/ProgressPage"

function App() {

  return (
    <>
     <BrowserRouter>
      <nav></nav>
      <Routes>
        <Route for="/" element={<HomePage />} />
        <Route for="leaderboard" element={<LeaderboardPage />}/>
        <Route for="/tasks" element={<TasksPage />}/>
        <Route for="/progress" element={<ProgressPage />}/>
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
