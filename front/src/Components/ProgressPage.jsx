export default function ProgressPage() {
  return (
    <>
      <div className="container">
        <section>
          <div className="progress-bar"></div>
          <div className="points">
            <div className="virtue-points">
              <h2>25</h2>
              <p>Virtue</p>
            </div>
            <div className="selfless-points">
              <h2>25</h2>
              <p>Selfless</p>
            </div>
            <div className="adventure-points">
              <h2>25</h2>
              <p>Adventure</p>
            </div>
          </div>
        </section>
        <div className="in-progress">
          <h1>In Progress...</h1>
          <div className="task">
            <p>Task 1 - Virtue</p>
            <p>49%</p>
          </div>
          <div className="task">
            <p>Task 2 - Adventure</p>
            <p>15%</p>
          </div>
        </div>
        <div className="completed">
          <h1>Completed</h1>
          <div className="task">
            <p>Task 3</p>
            <p>100%</p>
          </div>
          <div className="task">
            <p>Task 4</p>
            <p>100%</p>
          </div>
        </div>
      </div>
    </>
  );
}
