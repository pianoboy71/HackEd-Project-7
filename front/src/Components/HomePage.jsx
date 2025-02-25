export default function HomePage() {
    return (
        <>
            <div className="homePage">
                <section className="homePointsContainer">
                    <p>Your points..</p>
                    {/* points display goes here */}
                </section>
                    <p>Lets get cracking!</p>
                <section className="homeTaskContainer">
                    <div className="homeTask">
                        <p>Task 1</p>
                    </div>
                    <div className="homeTask"> 
                        <p>Task 2</p>
                    </div>
                    <div className="homeTask">
                        <p>Task 3</p>
                    </div>
                </section>
            </div>
        </>
    )
}