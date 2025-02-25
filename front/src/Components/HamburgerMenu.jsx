import { Link } from "react-router-dom"

export default function HamburgerMenu(toggleModal) {
    return (
        <>
            <section className="hamburgerMenuDisplay">
                <Link to="/tasks">
                <button onClick={toggleModal}>Tasks</button>
                </Link>
                
                <Link to="/leaderboard">
                <button className="leaderboardButton" onClick={toggleModal}>
                    <img src="./src/assets/podium.png" alt="" />
                </button>
                </Link>
                
                <Link to="/progress">
                <button onClick={toggleModal}>Progress</button>
                </Link>

                <Link to="/">
                <button onClick={toggleModal}>Home</button>
                </Link>
            </section>
        </>
    )
}