export default function TasksPage() {
  return (
    <>
      <div className="tasksPage">
        <div className="tasksTitle">
          <h1>All Tasks</h1>
        </div>
        <section className="tasksSection virtueTasks">
          <img src="./src/assets/sharing.png" alt="virtue" />
          <div className="tasksContainer virtueContainer">
            <p className="eachTask">task 1</p>
            <p className="eachTask">task 2</p>
            <p className="eachTask">task 3</p>
          </div>
        </section>
        <section className="tasksSection selflessTasks">
          <img src="./src/assets/selfless.png" alt="selfless" />
          <div className=" tasksContainer selflessContainer">
            <p className="eachTask">task 1</p>
            <p className="eachTask">task 2</p>
            <p className="eachTask">task 3</p>
          </div>
        </section>
        <section className="tasksSection adventureTasks">
          <img src="./src/assets/hiking.png" alt="adventure" />
          <div className="tasksContainer adventureContainer">
            <p className="eachTask">task 1</p>
            <p className="eachTask">task 2</p>
            <p className="eachTask">task 3</p>
          </div>
        </section>
      </div>
    </>
  )
}
