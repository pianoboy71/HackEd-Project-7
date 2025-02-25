import {BrowserRouter, Route, Routes, Link} from "react-router-dom"
import './App.css'
import HomePage from "./Components/HomePage"
import LeaderboardPage from "./Components/LeaderboardPage"
import TasksPage from "./Components/TasksPage"
import ProgressPage from "./Components/ProgressPage"

function App() {

  return (
    <>
     <BrowserRouter>
      <nav>
        <Link to="/"><img src="https://cdn-icons-png.flaticon.com/128/4337/4337076.png" alt="logo" /></Link>
        <Link to="/">Home</Link>
        <button>☰</button>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="leaderboard" element={<LeaderboardPage />}/>
        <Route path="/tasks" element={<TasksPage />}/>
        <Route path="/progress" element={<ProgressPage />}/>
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
