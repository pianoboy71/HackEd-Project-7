// import { useEffect, useState } from "react"
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

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
                    <div className="homeTask">
                    <Accordion  sx={{ backgroundColor: "#C4E0F9", boxShadow: 'none', borderRadius: 2 }}>
                        <AccordionSummary>
                            <p>Virtue Task</p>
                            <p>0/1</p>
                        </AccordionSummary>
                        <AccordionDetails>
                            <p>More information about the virtue task</p>
                        </AccordionDetails>
                    </Accordion >                    
                    </div>
                    <div className="homeTask">
                    <Accordion sx={{ backgroundColor: "#D99AC5", boxShadow: 'none', borderRadius: 2 }}>
                        <AccordionSummary>
                            <p>Selfless Task</p>
                            <p>0/1</p>
                        </AccordionSummary>
                        <AccordionDetails>
                            <p>More information about the virtue task</p>
                        </AccordionDetails>
                    </Accordion>                    
                    </div>
                    <div className="homeTask">
                    <Accordion sx={{ backgroundColor: "#EF5D60", boxShadow: 'none', borderRadius: 2 }}>
                        <AccordionSummary>
                            <p>Adventure Task</p>
                            <p>0/1</p>
                        </AccordionSummary>
                        <AccordionDetails>
                            <p>More information about the virtue task</p>
                        </AccordionDetails>
                    </Accordion>                    
                    </div>
                </section>
            </div>
        </>
    )
}