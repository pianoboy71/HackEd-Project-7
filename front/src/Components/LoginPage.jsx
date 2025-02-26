import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(""); // New Email State
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

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

  async function handleAuth(e) {
    e.preventDefault();
    try {
      const hashedPassword = await hashPassword(password);

      if (isSignUp) {
        // Sign Up Request
        const response = await axios.post("https://egg.fractaldev.co/signup", {
          username,
          email, // Include email in signup
          password: hashedPassword,
        });

        if (response.data?.success) {
          alert("Account created! Please log in.");
          setIsSignUp(false); // Switch to login mode
        } else {
          alert(response.data?.message || "Signup failed!");
        }
      } else {
        // Login Request
        const response = await axios.post("https://egg.fractaldev.co/login", {
          username,
          password: hashedPassword,
        });

        if (response.data?.key) {
          Cookies.set("authToken", response.data.key, { expires: 7 });
          Cookies.set("username", response.data.username, { expires: 7 });
          alert("Sign-in successful!");
          navigate("/");
          window.location.reload(); // Refresh the page after clearing cookies
        } else {
          alert("Invalid credentials!");
        }
      }
    } catch (error) {
      console.error("Authentication error:", error);
      alert("Error during authentication. Please try again.");
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-800">
      <div className="bg-white dark:bg-gray-900 shadow-2xl rounded-lg p-8 w-full max-w-md">
        {/* Title */}
        <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          {isSignUp ? "Create an Account" : "Sign In"}
        </h2>

        {/* Form */}
        <form className="mt-6 space-y-4" onSubmit={handleAuth}>
          {isSignUp && (
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                required={isSignUp}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          )}

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Username
            </label>
            <input
              type="text"
              id="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-emerald-500 focus:border-emerald-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-4 flex items-center text-gray-500 dark:text-gray-400"
            >
              {showPassword ? "🙈" : "👁"}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 mt-4 bg-gradient-to-r from-sky-400 to-emerald-600 text-white font-bold rounded-lg hover:opacity-90 transition"
          >
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>

        {/* Toggle Between Login & Signup */}
        <p className="mt-6 text-center text-gray-600 dark:text-gray-300">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button className="text-emerald-500 hover:underline" onClick={toggleForm}>
            {isSignUp ? "Login" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}
