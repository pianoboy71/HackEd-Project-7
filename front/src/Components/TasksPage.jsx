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

export default function TasksPage() {

  const wan = "https://egg.fractaldev.co/tasks/top3";
  const lan = "http://127.0.0.1:5000/tasks/top3";

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchTasks() {
      const data = await requestEgg(lan);
      console.log("Fetched tasks:", data);
      setTasks(data);
    }

    fetchTasks();
  }, []);

  
  const groupedTasks = tasks?.reduce((acc, task) => {
    if (!acc[task.category]) {
      acc[task.category] = [];
    }
    acc[task.category].push(task);
    return acc;
  }, {}) || {};
   

  return (
    <>
      <div className="tasksPage">
        <div className="tasksTitle">
          <h1>All Tasks</h1>
        </div>
        <section className="tasksSection virtueTasks">
          <img src="./src/assets/sharing.png" alt="virtue" />
          <div className="tasksContainer virtueContainer">
            {groupedTasks["Virtue"]?.length > 0 ? (
              groupedTasks["Virtue"].map((task) => (
                <p key={task.id} className="eachTask">{task.name}</p>
              ))
            ) : (
              <p>No Virtue tasks available</p>
            )}
          </div>
        </section>
        <section className="tasksSection selflessTasks">
          <img src="./src/assets/selfless.png" alt="selfless" />
          <div className="tasksContainer selflessContainer">
            {groupedTasks["Selfless"]?.length > 0 ? (
              groupedTasks["Selfless"].map((task) => (
                <p key={task.id} className="eachTask">{task.name}</p>
              ))
            ) : (
              <p>No Selfless tasks available</p>
            )}
          </div>
        </section>
        <section className="tasksSection adventureTasks">
          <img src="./src/assets/hiking.png" alt="adventure" />
          <div className="tasksContainer adventureContainer">
            {groupedTasks["Adventure"]?.length > 0 ? (
              groupedTasks["Adventure"].map((task) => (
                <p key={task.id} className="eachTask">{task.name}</p>
              ))
            ) : (
              <p>No Adventure tasks available</p>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
