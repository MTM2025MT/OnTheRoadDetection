import React from 'react';
 import { useState } from 'react';
import './TheTaskList.css'; // Make sure to import the CSS file here
import ShortTaskList from './ShortTaskList.jsx';
 import TheTaskListHeader from './TheTaskListHeader.jsx';
function TheTaskList() {
  const progress = 65; // Example progress percentage
  const arr = [1, 2, 3, 4, 5];
   const [TaskListMode, setTaskListMode] = useState('short'); // 'short' or 'detailed'



 
    return (
      <>

  <TheTaskListHeader setTaskListMode={setTaskListMode}  TaskListMode={TaskListMode} />
    {
      TaskListMode === 'short' ? <ShortTaskList /> :
    <section className="task-list-container">
      {arr.map((a) => {
        return (
          // Combined styles.taskCard and styles.Section into one class: .task-card
          <div key={a * 10} className="task-card">
            
            <div className="task-header">
              <div>
                <h2 className="task-title">Task #{a}</h2>
                <p className="task-location">5th Ave & Main (High Priority)</p>
              </div>
              <span className="priority-badge">High Priority</span>
            </div>

            <div className="map-container">
              <img
                src="../../public/potholemain.jpg"
                alt="Location Map"
                className="map-image"
              />
            </div>

            <div className="status-section">
              <div className="status-badge">In Progress</div>
            </div>

            <div className="progress-bar">
              {/* We keep inline style here for dynamic width */}
              <div 
                className="progress-fill" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <div className="status-info">
              <p>Status</p>
              <p>Time Elapsed: 2h</p>
            </div>
            
          </div>
        );
      })}
    </section> 
    }
      </>
    )

   
}

export default TheTaskList;