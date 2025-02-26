import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // For smooth animations

export default function HamburgerMenu({ toggleModal }) {
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed top-0 right-0 w-64 h-full bg-white/10 backdrop-blur-lg shadow-lg rounded-l-xl flex flex-col p-6 space-y-4 z-50"
    >
      {/* Close Button */}
      <button onClick={toggleModal} className="self-end text-white text-3xl">
        &times;
      </button>

      {/* Menu Items */}
      {[
        { name: "Home", icon: "🏠", link: "/" },
        { name: "Tasks", icon: "✅", link: "/tasks" },
        { name: "Leaderboard", icon: "🏆", link: "/leaderboard" },
        { name: "Progress", icon: "📈", link: "/progress" },
        { name: "Login", icon: "💻", link: "/login" },
      ].map((item, index) => (
        <Link key={index} to={item.link} onClick={toggleModal}>
          <button className="flex items-center space-x-3 w-full text-white p-3 rounded-lg hover:bg-white/20 transition">
            <span className="text-2xl">{item.icon}</span>
            <span className="text-lg font-medium">{item.name}</span>
          </button>
        </Link>
      ))}
    </motion.div>
  );
}
