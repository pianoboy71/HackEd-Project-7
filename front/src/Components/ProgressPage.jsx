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

export default function ProgressPage() {
  return (
    <>
      <div className="container">
        <section>
          <div className="progress-bar"></div>
          <div className="points">
            <div className="virtue-points">
              <h2>25</h2>
              <p>Virtue</p>
            </div>
            <div className="selfless-points">
              <h2>25</h2>
              <p>Selfless</p>
            </div>
            <div className="adventure-points">
              <h2>25</h2>
              <p>Adventure</p>
            </div>
          </div>
        </section>
        <div className="in-progress">
          <h1>In Progress...</h1>
          <div className="task">
            <p>Task 1 - Virtue</p>
            <p>49%</p>
          </div>
          <div className="task">
            <p>Task 2 - Adventure</p>
            <p>15%</p>
          </div>
        </div>
        <div className="completed">
          <h1>Completed</h1>
          <div className="task">
            <p>Task 3</p>
            <p>100%</p>
          </div>
          <div className="task">
            <p>Task 4</p>
            <p>100%</p>
          </div>
        </div>
      </div>
    </>
  );
}
