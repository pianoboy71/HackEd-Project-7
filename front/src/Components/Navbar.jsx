import { useState } from "react";
import { Link } from "react-router-dom";
import HamburgerMenu from "./HamburgerMenu";

export default function Navbar() {
  const [showModal, setShowModal] = useState(false);

  function toggleModal() {
    setShowModal(!showModal);
  }

  return (
    <nav className="w-full flex justify-between items-center px-6 py-5 bg-white dark:bg-gray-900 shadow-md mb-6 md:mb-10">
      {/* Logo */}
      <Link to="/" className="flex items-center space-x-3">
        <img src="./src/assets/easterneggslogo.png" alt="logo" className="w-12 h-12" />
        <span className="text-3xl font-extrabold bg-gradient-to-r from-sky-400 to-emerald-600 bg-clip-text text-transparent">
          Eastern Eggs
        </span>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-8">
        <Link to="/" className="text-xl font-medium text-gray-900 dark:text-white hover:text-sky-400 transition">
          Home
        </Link>
        <Link to="/leaderboard" className="text-xl font-medium text-gray-900 dark:text-white hover:text-sky-400 transition">
          Leaderboard
        </Link>
        <Link to="/tasks" className="text-xl font-medium text-gray-900 dark:text-white hover:text-sky-400 transition">
          Tasks
        </Link>
        <Link to="/progress" className="text-xl font-medium text-gray-900 dark:text-white hover:text-sky-400 transition">
          Progress
        </Link>
        <Link to="/login" className="text-xl font-medium text-gray-900 dark:text-white hover:text-sky-400 transition">
          Login
        </Link>
      </div>

      {/* Mobile Menu (Hamburger) */}
      <button
        onClick={toggleModal}
        className="md:hidden text-4xl text-gray-900 dark:text-white focus:outline-none"
      >
        ☰
      </button>

      {/* Mobile Menu (Modal) */}
      {showModal && <HamburgerMenu toggleModal={toggleModal} />}
    </nav>
  );
}
