import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

// Helper function to fetch API data
async function requestEgg(url, options = {}) {
  const authToken = Cookies.get("authToken");
  const urlWithAuth = authToken ? `${url}${url.includes("?") ? "&" : "?"}k=${authToken}` : url;

  try {
    const response = await axios({ url: urlWithAuth, ...options });
    return response.data;
  } catch (error) {
    console.error("Error in requestEgg:", error);
    throw error;
  }
}

// Task category styles
const categoryStyles = {
  Virtue: "bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 border-blue-500",
  Selfless: "bg-pink-100 dark:bg-pink-800 text-pink-700 dark:text-pink-300 border-pink-500",
  Adventure: "bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-300 border-red-500",
};

export default function ProgressPage() {
  // API URLs
  const wan = "https://egg.fractaldev.co/tasks/status";
  const lan = "http://127.0.0.1:5000/tasks/status";

  // State variables
  const [progress, setProgress] = useState({ Done: [], "In Progress": [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProgress() {
      try {
        const data = await requestEgg(wan);
        console.log("Fetched Progress:", data);
        setProgress(data || { Done: [], "In Progress": [] });
      } catch (error) {
        console.error("Failed to fetch progress:", error);
        setProgress({ Done: [], "In Progress": [] });
      } finally {
        setLoading(false);
      }
    }

    fetchProgress();
  }, []);

  return (
    <div className="container mx-auto px-6 py-10 bg-gray-100 dark:bg-gray-800">
      {/* Header */}
      <section className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
          Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-600">Progress</span>
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mt-2">
          Track your completed and in-progress tasks by category.
        </p>
      </section>

      {/* Loading State */}
      {loading ? (
        <p className="text-center text-lg font-semibold text-gray-500">Loading progress...</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {/* In Progress Section */}
          <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">In Progress</h2>
            {progress["In Progress"].length > 0 ? (
              progress["In Progress"].map((task) => (
                <div
                  key={task.id}
                  className={`mt-4 p-4 border-l-4 rounded-md shadow ${
                    categoryStyles[task.category] || "border-gray-500"
                  }`}
                >
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{task.name}</h3>
                  <p className="text-gray-700 dark:text-gray-300">{task.description}</p>
                  <span
                    className={`mt-2 inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                      categoryStyles[task.category] || "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
                    }`}
                  >
                    {task.category || "Uncategorized"}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic mt-2">No tasks in progress.</p>
            )}
          </div>

          {/* Completed Section */}
          <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-green-600 dark:text-green-400">Completed</h2>
            {progress["Done"].length > 0 ? (
              progress["Done"].map((task) => (
                <div
                  key={task.id}
                  className={`mt-4 p-4 border-l-4 rounded-md shadow ${
                    categoryStyles[task.category] || "border-gray-500"
                  }`}
                >
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{task.name}</h3>
                  <p className="text-gray-700 dark:text-gray-300">{task.description}</p>
                  <span
                    className={`mt-2 inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                      categoryStyles[task.category] || "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
                    }`}
                  >
                    {task.category || "Uncategorized"}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic mt-2">No completed tasks yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
