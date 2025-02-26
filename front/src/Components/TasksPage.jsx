import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

// Import images
import virtueImage from "../assets/sharing.png";
import selflessImage from "../assets/selfless.png";
import adventureImage from "../assets/hiking.png";

// Function to make API requests
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

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [openCategory, setOpenCategory] = useState(null);
  const navigate = useNavigate();

  // API URLs
  const wan = "https://egg.fractaldev.co/tasks/top3";
  const lan = "http://127.0.0.1:5000/tasks/top3";

  // Fetch tasks from API
  useEffect(() => {
    async function fetchTasks() {
      const data = await requestEgg(wan);
      console.log("Fetched tasks:", data);
      setTasks(data);
    }

    fetchTasks();
  }, []);

  // Group tasks by category
  const groupedTasks = tasks?.reduce((acc, task) => {
    if (!acc[task.category]) acc[task.category] = [];
    acc[task.category].push(task);
    return acc;
  }, {}) || {};

  // Define categories with images
  const taskCategories = [
    { title: "Virtue Tasks", key: "Virtue", imageSrc: virtueImage, bg: "bg-blue-600 dark:bg-blue-800" },
    { title: "Selfless Tasks", key: "Selfless", imageSrc: selflessImage, bg: "bg-pink-600 dark:bg-pink-700" },
    { title: "Adventure Tasks", key: "Adventure", imageSrc: adventureImage, bg: "bg-red-600 dark:bg-red-700" },
  ];

  const toggleCategory = (index) => {
    setOpenCategory(openCategory === index ? null : index);
  };

  const handleTaskClick = (taskName) => {
    navigate(`/tasks/${taskName.toLowerCase().replace(/\s+/g, "-")}`);
  };

  return (
    <div className="container mx-auto px-6 py-10 bg-gray-100 dark:bg-gray-800">
      {/* Header */}
      <section className="text-center">
        <h1 className="mb-6 text-4xl font-extrabold text-gray-900 dark:text-white md:text-5xl">
          Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-600">Challenge</span>
        </h1>
        <p className="text-lg font-medium text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          Take on meaningful tasks that make an impact. Complete them to earn points and rise on the leaderboard!
        </p>
      </section>

      {/* Task Categories */}
      <section className="mt-10 space-y-6">
        {taskCategories.map((category, index) => (
          <div key={index} className="w-full">
            {/* Category Header */}
            <button
              className={`flex items-center justify-between w-full p-5 rounded-lg shadow-lg transition-transform transform hover:scale-105 ${category.bg} text-white`}
              onClick={() => toggleCategory(index)}
            >
              <div className="flex items-center space-x-3">
                <img src={category.imageSrc} alt={category.title} className="w-10 h-10 object-cover rounded-full" />
                <h3 className="text-xl font-semibold">{category.title}</h3>
              </div>
              <span className="text-xl">{openCategory === index ? "▲" : "▼"}</span>
            </button>

            {/* Task Cards */}
            {openCategory === index && (
              <div className="mt-4 space-y-4 pl-6 overflow-hidden">
                {groupedTasks[category.key]?.length > 0 ? (
                  groupedTasks[category.key].map((task) => (
                    <div
                      key={task.id}
                      className="p-5 bg-white dark:bg-gray-900 rounded-lg shadow-md border-l-4 border-blue-500 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                      onClick={() => handleTaskClick(task.name)}
                    >
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-600">{task.name}</span>
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300">{task.description}</p>
                      <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        <p className="font-bold text-xl text-gray-700 dark:text-white">
                          <strong>Points:</strong>
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-600"> {task.points}</span>
                        </p>
                        <p className="font-bold text-xl text-gray-700 dark:text-white">
                          <strong>Distance:</strong>
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-600"> 5 miles</span>
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-lg italic">No tasks available</p>
                )}
              </div>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}
