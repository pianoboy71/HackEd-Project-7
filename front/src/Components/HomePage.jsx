import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

// Helper function to fetch API data
async function requestEgg(url, options = {}) {
  const authToken = Cookies.get("authToken");
  const urlWithAuth = authToken ? `${url}?k=${authToken}` : url;

  try {
    const response = await axios({ url: urlWithAuth, ...options });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export default function HomePage() {
  const [openTask, setOpenTask] = useState(null);
  const [points, setPoints] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPoints() {
      try {
        const data = await requestEgg("https://egg.fractaldev.co/points");
        setPoints(data.points || 0);
      } catch (error) {
        setPoints(0);
      } finally {
        setLoading(false);
      }
    }

    fetchPoints();
  }, []);

  const toggleTask = (index) => {
    setOpenTask(openTask === index ? null : index);
  };

  return (
    <div className="container mx-auto px-6">
      {/* Hero Section */}
      <section className="text-center mt-16">
        <h1 className="mb-4 text-4xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          Let's get <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-600">cracking!</span>
        </h1>
        <p className="text-lg font-medium text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          Make a positive impact in the Norfolk community by completing tasks that will get you out and about, helping those in need, and volunteering!
        </p>
        <Link to="/tasks" className="mt-6 inline-block bg-gradient-to-r from-sky-400 to-emerald-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition">
          Get Started
        </Link>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-16">
        {[
          { title: "Track Your Progress", desc: "Monitor your progress and make waves in the community!", icon: "📊" },
          { title: "Compete in Leaderboards", desc: "Compete against others to become an integral part of Norfolk and rank up on our leaderboards!", icon: "🏆" },
          { title: "Complete Exciting Tasks", desc: "Challenge yourself with various tasks to earn points and rewards.", icon: "🎯" },
        ].map((feature, index) => (
          <div key={index} className="p-6 bg-white dark:bg-gray-900 shadow-lg rounded-lg text-center">
            <span className="text-5xl">{feature.icon}</span>
            <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* Points Section */}
      <section className="flex flex-col items-center justify-center mt-16">
        <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-6 w-full max-w-sm text-center">
          <div className="flex items-center justify-center space-x-3">
            <span className="text-4xl">🏅</span>
            <p className="text-lg font-medium text-gray-700 dark:text-white">Your Points</p>
          </div>
          <h3 className="mt-3 text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-600">
            {loading ? "..." : points}
          </h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Keep going! Earn more by completing tasks.</p>
        </div>
      </section>

      {/* Quick Links */}
      <section className="mt-16">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white">Quick Links</h2>
        <div className="grid grid-cols-3 gap-4 mt-6">
          {[
            { title: "Leaderboard", link: "/leaderboard", bg: "bg-indigo-500" },
            { title: "Tasks", link: "/tasks", bg: "bg-green-500" },
            { title: "Progress", link: "/progress", bg: "bg-orange-500" },
          ].map((item, index) => (
            <Link key={index} to={item.link} className={`${item.bg} text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition text-center`}>
              {item.title}
            </Link>
          ))}
        </div>
      </section>

      {/* Tasks Section */}
      <section className="mt-16 space-y-6">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white">Your Tasks</h2>
        {[
          { title: "Virtue Task", bg: "bg-blue-200", details: "More information about the virtue task" },
          { title: "Selfless Task", bg: "bg-pink-300", details: "More information about the selfless task" },
          { title: "Adventure Task", bg: "bg-red-400", details: "More information about the adventure task" },
        ].map((task, index) => (
          <div
            key={index}
            className={`p-6 ${task.bg} rounded-lg cursor-pointer transition-transform transform hover:scale-105 shadow-lg`}
            onClick={() => toggleTask(index)}
          >
            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold">{task.title}</p>
              <p className="text-sm">0/1</p>
            </div>
            {openTask === index && (
              <div className="mt-2 text-gray-700 dark:text-gray-300">
                <p>{task.details}</p>
              </div>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}
