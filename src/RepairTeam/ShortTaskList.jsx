import React from 'react';
import { Eye, Edit2, Trash2, CheckCircle, Zap } from 'lucide-react';

export default function ShortTaskList() {
  const tasks= [
    { id: 1, name: 'Zone 1 Delivery', team: 'Alpha Crew', status: 'available', progress: 40, priority: 'high', dueDate: 'Today' },
    { id: 2, name: 'Zone 2 Pickup', team: 'Alpha Crew', status: 'available', progress: 60, priority: 'medium', dueDate: 'Tomorrow' },
    { id: 3, name: 'Zone 3 Inspection', team: 'Alpha Crew', status: 'off-shift', progress: 20, priority: 'high', dueDate: 'Today' },
    { id: 4, name: 'Zone 5 Assembly', team: 'Alpha Crew', status: 'available', progress: 80, priority: 'low', dueDate: 'Next Week' },
    { id: 5, name: 'Zone 6 Maintenance', team: 'Alpha Crew', status: 'available', progress: 50, priority: 'medium', dueDate: 'Today' },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', padding: '20px' }}>
      {/* Filter */}
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#1e293b', margin: 0 }}>Active Tasks</h2>
        <select style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '14px', backgroundColor: 'white', cursor: 'pointer' }}>
          <option>All Zones</option>
          <option>Zone 1</option>
          <option>Zone 2</option>
          <option>Zone 3</option>
        </select>
      </div>

      {/* Tasks List */}
      <div style={{ background: 'white', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        {tasks.map((task, index) => (
          <div
            key={task.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '16px 20px',
              borderBottom: index < tasks.length - 1 ? '1px solid #e2e8f0' : 'none',
              gap: '20px',
              backgroundColor: '#ffffff',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
          >
            {/* Task Name */}
            <div style={{ flex: 1, minWidth: '200px' }}>
              <p style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b', margin: 0 }}>{task.name}</p>
              <p style={{ fontSize: '12px', color: '#64748b', marginTop: '4px', margin: 0 }}>{task.team}</p>
            </div>

            {/* Status Badge */}
            <div style={{ minWidth: '100px' }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 10px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '600',
                backgroundColor: task.status === 'available' ? '#d1fae5' : '#fed7aa',
                color: task.status === 'available' ? '#065f46' : '#92400e',
                border: `1px solid ${task.status === 'available' ? '#a7f3d0' : '#fcd34d'}`
              }}>
                <span style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: task.status === 'available' ? '#10b981' : '#f59e0b'
                }}></span>
                {task.status === 'available' ? 'Available' : 'Off-Shift'}
              </span>
            </div>

            {/* Progress Bar */}
            <div style={{ flex: 1, minWidth: '150px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  flex: 1,
                  height: '6px',
                  backgroundColor: '#e2e8f0',
                  borderRadius: '3px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    height: '100%',
                    width: `${task.progress}%`,
                    background: 'linear-gradient(90deg, #3b82f6, #1d4ed8)',
                    borderRadius: '3px',
                    transition: 'width 0.3s'
                  }}></div>
                </div>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b', minWidth: '35px', textAlign: 'right' }}>{task.progress}%</span>
              </div>
            </div>

            {/* Due Date */}
            <div style={{ minWidth: '100px', textAlign: 'center' }}>
              <p style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b', margin: 0 }}>{task.dueDate}</p>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '8px', minWidth: '120px', justifyContent: 'flex-end' }}>
              <button style={{
                padding: '6px 10px',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: '#64748b',
                transition: 'color 0.2s',
                display: 'flex',
                alignItems: 'center'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#1e293b'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}
              title="View">
                <Eye size={18} />
              </button>
              <button style={{
                padding: '6px 10px',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: '#64748b',
                transition: 'color 0.2s',
                display: 'flex',
                alignItems: 'center'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#1e293b'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}
              title="Edit">
                <Edit2 size={18} />
              </button>
              <button style={{
                padding: '6px 10px',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: '#64748b',
                transition: 'color 0.2s',
                display: 'flex',
                alignItems: 'center'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#ef4444'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}
              title="Delete">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}