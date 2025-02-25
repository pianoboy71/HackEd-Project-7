import { Link } from "react-router-dom"

export default function HamburgerMenu(toggleModal) {
    return (
        <>
            <section className="hamburgerMenuDisplay">
                <Link to="/tasks">
                <button onClick={toggleModal} className="menuButton">
                    <img src="./src/assets/checklist.png" alt="" />
                </button>
                </Link>
                
                <Link to="/leaderboard">
                <button className="menuButton" onClick={toggleModal}>
                    <img src="./src/assets/podium.png" alt="" />
                </button>
                </Link>
                
                <Link to="/progress">
                <button onClick={toggleModal} className="menuButton">
                    <img src="./src/assets/check.png" alt="" />
                </button>
                </Link>

                <Link to="/">
                <button onClick={toggleModal} className="menuButton">
                    <img src="./src/assets/home.png" alt="" />
                </button>
                </Link>
            </section>
        </>
    )
}