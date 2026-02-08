import React, {  useEffect, useRef, useState } from 'react';

export default function TaskComponent() {
  const [status, setStatus] = useState('In Progress');
//   const [progress, setProgress] = useState(65);
  const progress = 65; // Example progress percentage
  const [notes, setNotes] = useState('');
  const [editMode, setEditMode] = useState(false);
  const reportSectionRef = useRef(null);
  const taskCardRef = useRef(null);
  useEffect(() => {
    const element = reportSectionRef.current;
    const taskElement = taskCardRef.current;
    if (element) {
      if (editMode) {
        element.style.transform = 'translateX(55%)';
      } else {
        element.style.transform = 'translateX(0%)';
      }
    }
    if (taskElement) {
      if (editMode) {
        taskElement.style.transform = 'translateX(-55%)';
      } else {
        taskElement.style.transform = 'translateX(0%)';
      }
    }
     
  }, [editMode]);
  return (
    <div  style={styles.container}>

      <div ref={taskCardRef}  style={{...styles.taskCard,...styles.Section}}>   
   
        <div style={styles.taskHeader}>
          <div>
            <h2 style={styles.taskTitle}>Task #5592</h2>
            <p style={styles.taskLocation}>5th Ave & Main (High Priority)</p>
          </div>
          <span style={styles.priorityBadge}>High Priority</span>
        </div>

        <div style={styles.mapContainer}>
          <img 
            src="/potholemain.jpg" 
            alt="Location Map" 
            style={styles.mapImage}
          />
        </div>

        <div style={styles.statusSection}>
          <div style={styles.statusBadge}>In Progress</div>
        </div>

        <div style={styles.progressBar}>
          <div style={{ ...styles.progressFill, width: `${progress}%` }}></div>
        </div>

        <div style={styles.statusInfo}>
          <p>Status</p>
          <p>Time Elapsed: 2h</p>
        </div>

        <button 
            style={{
        ...styles.submitBtn,
        width: '100%',
        }}

         onClick={() => setEditMode(editMode => !editMode)}
         > 
         edit
       </button>
     
      </div>
        {
            // editMode ?  null   :
            <div ref={reportSectionRef} style={{...styles.reportSection,...styles.Section}}>
            <h3 style={styles.reportTitle}>Report Status</h3>
            
            <div style={styles.updateStatusSection}>
                <label style={styles.label}>Update Status</label>
                <div style={styles.dropdownContainer}>
                <select 
                    value={status} 
                    onChange={(e) => setStatus(e.target.value)}
                    style={styles.dropdown}
                >
                    <option>In Progress</option>
                    <option>Completed</option>
                    <option>Blocked</option>
                    <option>Pending Review</option>
                </select>
                </div>

                <label style={styles.label}>Notes (Optional)</label>
                <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any notes here..."
                style={styles.notesField}
                />
            </div>

            <button style={styles.submitBtn}>Submit Update</button>
            </div>
        }

    </div>
  );
}
// const submitBtnHover = {
//   backgroundColor: '#1f3660',
// };
const EditStyle={
   transform: 'translateX(-50%)',
}
const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
    display: 'flex',
    width: '90%',
    gap: '5%',
    justifyContent: 'center',
    postion: 'relative'
  },
  pageTitle: {
    marginBottom: '30px',
  },
  taskCard: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '20px',
    maxWidth: '700px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
     zIndex: 10,

  },
  Section:{
    width:'30%',
    position: 'absolute',
    transition: '1s ease 0s',
    height: '70%',
  }
  ,
  taskHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '20px',
    borderBottom: '1px solid #e0e0e0',
    paddingBottom: '15px',
  },
  taskTitle: {
    margin: '0 0 5px 0',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  taskLocation: {
    margin: '0',
    fontSize: '16px',
    color: '#333',
  },
  priorityBadge: {
    backgroundColor: '#e8d4c4',
    color: '#8b6f47',
    padding: '6px 14px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: '600',
    whiteSpace: 'nowrap',
  },
  mapContainer: {
    width: '100%',
    marginBottom: '20px',
    borderRadius: '8px',
    overflow: 'hidden',
    height: '250px',
  },
  mapImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  statusSection: {
    marginBottom: '15px',
  },
  statusBadge: {
    backgroundColor: '#b3cce5',
    color: '#1a3a52',
    padding: '8px 16px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '600',
    display: 'inline-block',
  },
  progressBar: {
    width: '100%',
    height: '8px',
    backgroundColor: '#e0e0e0',
    borderRadius: '4px',
    overflow: 'hidden',
    marginBottom: '10px',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2e5090',
    transition: 'width 0.3s ease',
  },
  statusInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '14px',
    color: '#555',
    marginBottom: '20px',
  },
  divider: {
    height: '1px',
    backgroundColor: '#e0e0e0',
    margin: '20px 0',
  },
  reportSection: {

    margin: 0,
    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius: '12px',
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 8px',
    zIndex: 5,
// The transition settings (Duration: 2s, Ease: ease-in-out, Delay: 1s)

      // THE FIX: Switch between Start (0%) and End (50%) positions


  },
  reportTitle: {
    margin: '100px 0 15px 0',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  updateStatusSection: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#333',
  },
  dropdownContainer: {
    marginBottom: '20px',
  },
  dropdown: {
    width: '80%',
    padding: '10px 12px',
    border: '2px solid #2e5090',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    backgroundColor: '#ffffff',
    color: '#333',
    cursor: 'pointer',
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 10px center',
    backgroundSize: '20px',
    paddingRight: '35px',
  },
  notesField: {
    width: '80%',
    minHeight: '100px',
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '14px',
    fontFamily: 'inherit',
    resize: 'vertical',
    marginBottom: '20px',
    boxSizing: 'border-box',
  },
  submitBtn: {
    width: '80%',
    padding: '12px',
    backgroundColor: '#2e5090',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

// Add hover effect to button
