// import { useEffect, useState } from "react"

export default function HomePage() {    
    
    // const [hometasks, setHomeTasks] = useState('')

    // useEffect(() => {
    //     async function fetchHomeTasks() {
    //         const response = await fetch('https://egg.fractaldev.co/tasks/top3')
    //         const data = await response.json()
    //         setHomeTasks(data)
    //     }

    //     fetchHomeTasks()
    // }, [])

    return (
        <>
            <div className="homePage">
                <section className="homePointsContainer">
                    <p>Your points..</p>
                    <h3>106</h3>
                    {/* points display goes here */}
                </section>
                    <h2 className="tagline">Lets get cracking!</h2>
                <section className="homeTaskContainer">
                    <div className="homeTask virtueTask">
                        <p>Virtue Task</p>
                        <p>0/1</p>
                    </div>
                    <div className="homeTask selflessTask"> 
                        <p>Selfless Task</p>
                        <p>0/1</p>
                    </div>
                    <div className="homeTask adventureTask">
                        <p>Adventure Task</p>
                        <p>0/1</p>
                    </div>
                </section>
            </div>
        </>
    )
}