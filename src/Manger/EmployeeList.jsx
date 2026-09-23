import React, { useState, useMemo } from 'react';
import { ChevronDown, Search, Settings } from 'lucide-react';
import './EmployeeList.css';
import { useGetAllUsers } from './ManagerHooks'; // Update path as needed

export default function EmployeeList() {
  const [activeTab, setActiveTab] = useState('View all');
  const [searchTerm, setSearchTerm] = useState('');

  // Get data from hook
  const { users: usersData = [], refetch: refetchUsers } = useGetAllUsers();

  // Transform API data to match component structure
  const transformedEmployees = useMemo(() => {
    if (!usersData || usersData.length === 0) return [];

    return usersData.map((user) => ({
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      handle: `@${user.userName.toLowerCase()}`,
      email: user.email,
      role: user.roles?.[0] || 'General',
      status: 'Active',
    }));
  }, [usersData]);

  // Calculate stats from transformed data
  const stats = useMemo(() => {
    const generalCount = transformedEmployees.filter(e => e.role === 'General').length;
    const managerCount = transformedEmployees.filter(e => e.role === 'Manager').length;
    const repairCount = transformedEmployees.filter(e => e.role === 'Repair').length;

    return [
      { 
        label: 'General employees', 
        value: generalCount.toLocaleString(),
        change: '+2.15%', 
        positive: true 
      },
      { 
        label: 'Managers', 
        value: managerCount.toLocaleString(),
        change: '-0.34%', 
        positive: false 
      },
      { 
        label: 'Repair employees', 
        value: repairCount.toLocaleString(),
        change: '+1.18%', 
        positive: true 
      },
    ];
  }, [transformedEmployees]);

  // Filter employees based on active tab and search term
  const filteredEmployees = useMemo(() => {
    let filtered = transformedEmployees;

    // Filter by role tab
    if (activeTab !== 'View all') {
      filtered = filtered.filter(emp => emp.role === activeTab);
    }

    // Filter by search term
    if (searchTerm.trim()) {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(emp =>
        emp.name.toLowerCase().includes(lowerSearch) ||
        emp.handle.toLowerCase().includes(lowerSearch) ||
        emp.email.toLowerCase().includes(lowerSearch)
      );
    }

    return filtered;
  }, [transformedEmployees, activeTab, searchTerm]);

  const getRoleColor = (role) => {
    switch (role) {
      case 'General':
        return 'role-general';
      case 'Manager':
        return 'role-manager';
      case 'Repair':
        return 'role-repair';
      default:
        return 'role-default';
    }
  };

  const handleRefresh = () => {
    refetchUsers();
  };

  return (
    <div className="container">
      <div className="max-width">
        {/* Stats Cards */}
        <div className="stats-grid">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-card">
              <p className="stat-label">{stat.label}</p>
              <div className="stat-value-container">
                <h3 className="stat-value">{stat.value}</h3>
                <span className={`stat-change ${stat.positive ? 'change-positive' : 'change-negative'}`}>
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Employees Table Section */}
        <div className="employees-section">
          {/* Header */}
          <div className="section-header">
            <h2 className="section-title">All employees ({transformedEmployees.length})</h2>

            {/* Controls */}
            <div className="header-controls">
              <div className="tabs-container">
                {['View all', 'General', 'Manager', 'Repair'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`tab-button ${activeTab === tab ? 'active' : 'inactive'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Search and Filters */}
              <div className="search-filters">
                <div className="search-container">
                  <Search className="search-icon" size={20} />
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                </div>
                <button className="filters-button" onClick={handleRefresh}>
                  <Settings size={16} />
                  Filters
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="table-wrapper">
            {filteredEmployees.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th><input type="checkbox" /></th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th style={{ textAlign: 'center' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.map((employee) => (
                    <tr key={employee.id}>
                      <td><input type="checkbox" /></td>
                      <td>
                        <div className="employee-cell">
                          <div className="avatar"></div>
                          <div className="employee-info">
                            <h4>{employee.name}</h4>
                            <p>{employee.email}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`role-badge ${getRoleColor(employee.role)}`}>
                          {employee.role}
                        </span>
                      </td>
                      <td>
                        <span className="status-badge">{employee.status}</span>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <button className="action-button">
                          <ChevronDown size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
                No employees found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// import React, { useState } from 'react';
// import { ChevronDown, Search, Settings } from 'lucide-react';
// import './EmployeeList.css';
// export default function EmployeeList() {
//   const [activeTab, setActiveTab] = useState('View all');
//   const [searchTerm, setSearchTerm] = useState('');


//   const stats = [
//     { label: 'General employees', value: '11,450', change: '+2.15%', positive: true },
//     { label: 'Managers', value: '812', change: '-0.34%', positive: false },
//     { label: 'Repair employees', value: '83', change: '+1.18%', positive: true },
//   ];

//   const employees = [
//     { name: 'Ahmed Hassan', handle: '@ahmedh', role: 'General', projects: '12/25', status: 'Active', enrolled: 'May 12, 2019' },
//     { name: 'MOhamed hadi', handle: '@mohamedh', role: 'Manager', projects: '18/50', status: 'Active', enrolled: 'August 7, 2017' },
//     { name: 'nadir ahmed', handle: '@nadirahmed', role: 'General', projects: '7/25', status: 'Active', enrolled: 'May 9, 2014' },
//     { name: 'Cody Fisher', handle: '@codyf', role: 'Repair', projects: '27/100', status: 'Active', enrolled: 'October 24, 2018' },
//     { name: 'Darlene Robertson', handle: '@darlener', role: 'General', projects: '21/25', status: 'Active', enrolled: 'March 6, 2018' },
//     { name: 'Cameron Williamson', handle: '@cameronw', role: 'General', projects: '6/25', status: 'Active', enrolled: 'July 14, 2015' },
//     { name: 'Dianne Russell', handle: '@dianner', role: 'Manager', projects: '32/50', status: 'Active', enrolled: 'August 2, 2013' },
//   ];

//   const getRoleColor = (role) => {
//     switch (role) {
//       case 'General':
//         return 'role-general';
//       case 'Manager':
//         return 'role-manager';
//       case 'Repair':
//         return 'role-repair';
//       default:
//         return 'role-default';
//     }
//   };

//   return (
//     <>


//       <div className="container">
//         <div className="max-width">
//           {/* Stats Cards */}
//           <div className="stats-grid">
//             {stats.map((stat, idx) => (
//               <div key={idx} className="stat-card">
//                 <p className="stat-label">{stat.label}</p>
//                 <div className="stat-value-container">
//                   <h3 className="stat-value">{stat.value}</h3>
//                   <span className={`stat-change ${stat.positive ? 'change-positive' : 'change-negative'}`}>
//                     {stat.change}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Employees Table Section */}
//           <div className="employees-section">
//             {/* Header */}
//             <div className="section-header">
//               <h2 className="section-title">All employees (12,345)</h2>
              
//               {/* Controls */}
//               <div className="header-controls">
//                 <div className="tabs-container">
//                   {['View all', 'General', 'Manager', 'Repair'].map((tab) => (
//                     <button
//                       key={tab}
//                       onClick={() => setActiveTab(tab)}
//                       className={`tab-button ${activeTab === tab ? 'active' : 'inactive'}`}
//                     >
//                       {tab}
//                     </button>
//                   ))}
//                 </div>

//                 {/* Search and Filters */}
//                 <div className="search-filters">
//                   <div className="search-container">
//                     <Search className="search-icon" size={20} />
//                     <input
//                       type="text"
//                       placeholder="Search"
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                       className="search-input"
//                     />
//                   </div>
//                   <button className="filters-button">
//                     <Settings size={16} />
//                     Filters
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Table */}
//             <div className="table-wrapper">
//               <table>
//                 <thead>
//                   <tr>
//                     <th><input type="checkbox" /></th>
//                     <th>Name</th>
//                     <th>Role</th>
//                     <th>Projects</th>
//                     <th>Status</th>
//                     <th>Enrolled</th>
//                     <th style={{ textAlign: 'center' }}>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {employees.map((employee, idx) => (
//                     <tr key={idx}>
//                       <td><input type="checkbox" /></td>
//                       <td>
//                         <div className="employee-cell">
//                           <div className="avatar"></div>
//                           <div className="employee-info">
//                             <h4>{employee.name}</h4>
//                             <p>{employee.handle}</p>
//                           </div>
//                         </div>
//                       </td>
//                       <td>
//                         <span className={`role-badge ${getRoleColor(employee.role)}`}>
//                           {employee.role}
//                         </span>
//                       </td>
//                       <td>{employee.projects}</td>
//                       <td>
//                         <span className="status-badge">{employee.status}</span>
//                       </td>
//                       <td>{employee.enrolled}</td>
//                       <td style={{ textAlign: 'center' }}>
//                         <button className="action-button">
//                           <ChevronDown size={20} />
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }