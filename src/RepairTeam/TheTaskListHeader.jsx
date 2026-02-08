import React from 'react'
import { Eye, Edit2, Trash2, TrendingUp, TrendingDown, Bell, Settings } from 'lucide-react';

// export default function TheTaskListHeader(props) {
//   const stats = [
//     { label: 'Total Tasks', value: '4,342', change: '44.2%', trend: 'up', icon: 'users', color: '#fef3c7' },
//     { label: 'Job Applicants', value: '2,638', change: '-21.7%', trend: 'down', icon: 'briefcase', color: '#dbeafe' },
//     { label: 'Active Jobs', value: '3,682', change: '33.6%', trend: 'up', icon: 'plus', color: '#dcfce7' },
//   ];

//   const getIconComponent = (iconType) => {
//     switch(iconType) {
//       case 'checkmark': return (
//         <i class="bi bi-check-square-fill"></i>
//       );
//       case 'alert': return (
//       <i class="bi bi-exclamation-triangle-fill"></i>
//       );
//       case 'users': return (
//         <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
//           <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
//         </svg>
//       );
//       case 'briefcase': return (
//         <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
//           <path d="M20 7h-4V5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm-6-2h-4v2h4V5z"></path>
//         </svg>
//       );
//       case 'plus': return (
//         <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
//           <path d="M12 5v14M5 12h14"></path>
//         </svg>
//       );
//       default: return null;
//     }
//   };

//   const getIconColor = (iconType) => {
//     switch(iconType) {
//       case 'checkmark': return '#15803d';
//       case 'alert': return '#b45309';
//       case 'users': return '#1e40af';
//       case 'briefcase': return '#1e40af';
//       case 'plus': return '#15803d';
//       default: return '#1e293b';
//     }
//   };

//   return (
//     <>
//    <div className='TheSwitchOfTaskListBtn' style={{position:'fixed', top:'80px', right:'20px', zIndex:'1000',height:'50px', width:'50px'}}>
//     <button
//       className="btn btn-primary m-3"
//       size="lg"
//       color='black'
//       onClick={() => props.setTaskListMode(props.TaskListMode === 'short' ? 'detailed' : 'short')}
//     >
//       <i className="bi bi-list"></i>
//     </button>
//    </div>
   
//   <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '25px',padding:'30px 40px' }}>
//         {stats.map((stat, idx) => (
//           <div key={idx} style={{ 
//             background: 'white', 
//             padding: '24px', 
//             borderRadius: '12px', 
//             border: '1px solid #e2e8f0',
//             boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
//             position: 'relative',
//             display: 'flex',
//             flexDirection: 'column'
//           }}>
//             {/* Header with Title and Menu */}
//             <div style={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               marginBottom: '24px'
//             }}>
//               <p style={{ fontSize: '14px', color: '#1e293b', fontWeight: '600', margin: 0 }}>
//                 {stat.label}
//               </p>
//               <div style={{
//                 cursor: 'pointer',
//                 color: '#cbd5e1',
//                 fontSize: '18px',
//                 fontWeight: 'bold',
//                 padding: '0 4px'
//               }}>
//                 •••
//               </div>
//             </div>

//             {/* Main Content */}
//             <div style={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               gap: '20px',
//               flex: 1
//             }}>
//               {/* Left - Value and Change */}
//               <div>
//                 <p style={{ fontSize: '42px', fontWeight: 'bold', color: '#1e293b', margin: '0 0 12px 0' }}>
//                   {stat.value}
//                 </p>

//                 {/* Change Badge */}
//                 <div style={{
//                   display: 'inline-flex',
//                   alignItems: 'center',
//                   gap: '6px',
//                   padding: '6px 12px',
//                   borderRadius: '20px',
//                   backgroundColor: stat.trend === 'up' ? '#f0fdf4' : '#fef2f2',
//                   color: stat.trend === 'up' ? '#166534' : '#991b1b'
//                 }}>
//                   {stat.trend === 'up' ? (
//                     <TrendingUp size={16} />
//                   ) : (
//                     <TrendingDown size={16} />
//                   )}
//                   <span style={{ fontSize: '13px', fontWeight: '600' }}>
//                     {stat.change}
//                   </span>
//                 </div>
//               </div>

//               {/* Right - Icon Circle */}
//               <div style={{
//                 width: '80px',
//                 height: '80px',
//                 borderRadius: '12px',
//                 backgroundColor: stat.color,
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 color: getIconColor(stat.icon),
//                 flexShrink: 0
//               }}>
//                 {getIconComponent(stat.icon)}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//     </>
//   )
// }


export default function TheTaskListHeader(props) {
  const stats = [
    { label: 'Completed Potholes', value: '1,245', change: '12.5%', trend: 'up', icon: 'checkmark', color: '#dcfce7', iconColor: '#15803d' },
    { label: 'Active Potholes', value: '892', change: '8.3%', trend: 'up', icon: 'alert', color: '#fed7aa', iconColor: '#b45309' },
    { label: 'Available Teams', value: '24', change: '5.2%', trend: 'up', icon: 'users', color: '#dbeafe', iconColor: '#1e40af' },
  ];

  const renderIcon = (iconType, color) => {
    if (iconType === 'checkmark') {
      return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      );
    } else if (iconType === 'alert') {
      return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3.05h16.94a2 2 0 0 0 1.71-3.05L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
          <line x1="12" y1="9" x2="12" y2="13"></line>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      );
    } else if (iconType === 'users') {
      return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      );
    }
    return null;
  };

  return (
    <>
       <div className='TheSwitchOfTaskListBtn' style={{position:'fixed', top:'80px', right:'20px', zIndex:'1000',height:'50px', width:'50px'}}>
    <button
      className="btn btn-primary m-3"
      size="lg"
      color='black'
      onClick={() => props.setTaskListMode(props.TaskListMode === 'short' ? 'detailed' : 'short')}
    >
      <i className="bi bi-list"></i>
    </button>
   </div>
   
    
   
      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '25px',padding: '40px 30px' }}>
        {stats.map((stat, idx) => (
          <div key={idx} style={{ 
            background: 'white', 
            padding: '24px', 
            borderRadius: '12px', 
            border: '1px solid #e2e8f0',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Header with Title and Menu */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px'
            }}>
              <p style={{ fontSize: '14px', color: '#1e293b', fontWeight: '600', margin: 0 }}>
                {stat.label}
              </p>
              <div style={{
                cursor: 'pointer',
                color: '#cbd5e1',
                fontSize: '18px',
                fontWeight: 'bold',
                padding: '0 4px'
              }}>
                •••
              </div>
            </div>

            {/* Main Content */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '20px',
              flex: 1
            }}>
              {/* Left - Value and Change */}
              <div>
                <p style={{ fontSize: '42px', fontWeight: 'bold', color: '#1e293b', margin: '0 0 12px 0' }}>
                  {stat.value}
                </p>

                {/* Change Badge */}
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  backgroundColor: stat.trend === 'up' ? '#f0fdf4' : '#fef2f2',
                  color: stat.trend === 'up' ? '#166534' : '#991b1b'
                }}>
                  {stat.trend === 'up' ? (
                    <TrendingUp size={16} />
                  ) : (
                    <TrendingDown size={16} />
                  )}
                  <span style={{ fontSize: '13px', fontWeight: '600' }}>
                    {stat.change}
                  </span>
                </div>
              </div>

              {/* Right - Icon Circle */}
              <div style={{
                width: '90px',
                height: '90px',
                borderRadius: '12px',
                backgroundColor: stat.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                {renderIcon(stat.icon, stat.iconColor)}
              </div>
            </div>
          </div>
        ))}
      </div>

    </>
  );
}
