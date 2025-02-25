import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function toggleForm() {
    setIsSignUp((prev) => !prev);
  }

  async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");
  }

  async function handleSignIn(e) {
    e.preventDefault(); // Prevent form reload

    //try {
    const hashedPassword = await hashPassword(password); // Hash the password

    const response = await axios.post("http://egg.fractaldev.co/sign", {
      username,
      password: hashedPassword, // Send the hashed password
    });

    if (response.data?.key) {
      Cookies.set("authToken", response.data.key, { expires: 7 });
      alert("Sign-in successful!");
    } else {
      alert("Invalid credentials!");
    }
    //} catch (error) {
    //console.error("Sign-in error:", error);
    //alert("Error signing in. Please try again.");
    //}
  }

  return (
<<<<<<< Updated upstream
    <>
      <div class="container">
        <h1 id="form-title">Login</h1>
        <form id="auth-form">
          <div id="name-field" class="input-group" style="display: none">
            <label for="full-name">Full Name</label>
            <input type="text" id="full-name" name="full-name" />
          </div>
          <div class="input-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div class="input-group">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit">Submit</button>
        </form>
        <p id="toggle-form">
          Don't have an account?{" "}
          <a href="#" onclick="toggleForm()">
            Sign Up
          </a>
        </p>
      </div>
    </>
=======
    <div className="container">
      <h1>{isSignUp ? "Sign Up" : "Login"}</h1>
      <form id="auth-form" onSubmit={handleSignIn}>
        {isSignUp && (
          <div className="input-group">
            <label htmlFor="full-name">Full Name</label>
            <input type="text" id="full-name" name="full-name" />
          </div>
        )}
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">{isSignUp ? "Sign Up" : "Login"}</button>
      </form>
      <p id="toggle-form">
        {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
        <a href="#" onClick={toggleForm}>
          {isSignUp ? "Login" : "Sign Up"}
        </a>
      </p>
    </div>
>>>>>>> Stashed changes
  );
}
