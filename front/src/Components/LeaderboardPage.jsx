import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";


async function requestEgg(url, options = {}) {
  const authToken = Cookies.get("authToken"); // Retrieve auth token from cookies
  const urlWithAuth = authToken
    ? `${url}${url.includes("?") ? "&" : "?"}k=${authToken}`
    : url;

  try {
    const response = await axios({ url: urlWithAuth, ...options });
    return response.data;
  } catch (error) {
    console.error("Error in requestEgg:", error);
    throw error;
  }
}

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState([]);
  const navigate = useNavigate();

  // API URLs
  const wan = "https://egg.fractaldev.co/points";
  const lan = "http://127.0.0.1:5000/points"; // Local testing

  // Fetch leaderboard data from API
  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const data = await requestEgg(wan);
        console.log("Fetched leaderboard:", data);
        setLeaderboard(data);
      } catch (error) {
        console.error("Failed to fetch leaderboard:", error);
      }
    }

    fetchLeaderboard();
  }, []);

  return (
    <div className="container mx-auto px-6">
      {/* Hero Section */}
      <section className="text-center mt-16">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          Points <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-600">Leaderboard</span>
        </h1>
        <p className="text-lg font-medium text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          Compete and rank up! See where you stand among Norfolk's top community members.
        </p>
      </section>

      {/* Top 3 Players */}
      {leaderboard.length > 0 && (
        <section className="flex flex-col items-center mt-16">
          <div className="grid grid-cols-3 gap-6 w-full max-w-2xl">
            {leaderboard.slice(0, 3).map((player, index) => (
              <div
                key={index}
                className={`p-6 rounded-lg shadow-lg text-center ${
                  index === 0
                    ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
                    : index === 1
                    ? "bg-gray-300 text-gray-900"
                    : "bg-orange-400 text-white"
                }`}
              >
                <span className="text-5xl">{index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}</span>
                <h3 className="mt-4 text-xl font-semibold">{player.username}</h3>
                <p className="text-lg">{player.total_points} Points</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Ranked Players */}
      <section className="mt-16">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white">Ranked Players</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {leaderboard.slice(3).map((user, index) => (
            <div
              key={index}
              className="p-6 bg-white dark:bg-gray-900 shadow-lg rounded-lg text-center transform transition hover:scale-105"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                #{index + 4} {user.username}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{user.total_points} Points</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
