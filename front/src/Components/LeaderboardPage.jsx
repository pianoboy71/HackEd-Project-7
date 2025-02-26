import { useState, useEffect } from "react";
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

    const wan = "https://egg.fractaldev.co/points";
    const lan = "http://127.0.0.1:5000/points";

    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
    async function fetchleaderboard() {
        const data = await requestEgg(wan);
        console.log(data);
        setLeaderboard(data);
    }

    fetchleaderboard();
    }, []);

    return (
        <>
            <h1>Leaderboard</h1>
            <section>
                {leaderboard.map((user) => (
                    <p>{user.username} - {user.total_points} points</p>
                ))}
            </section>
        </>
    )
}