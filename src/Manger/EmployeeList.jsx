import React, { useState } from 'react';
import { ChevronDown, Search, Settings } from 'lucide-react';
import './EmployeeList.css';
export default function EmployeeList() {
  const [activeTab, setActiveTab] = useState('View all');
  const [searchTerm, setSearchTerm] = useState('');

  const stats = [
    { label: 'General employees', value: '11,450', change: '+2.15%', positive: true },
    { label: 'Managers', value: '812', change: '-0.34%', positive: false },
    { label: 'Repair employees', value: '83', change: '+1.18%', positive: true },
  ];

  const employees = [
    { name: 'Ahmed Hassan', handle: '@ahmedh', role: 'General', projects: '12/25', status: 'Active', enrolled: 'May 12, 2019' },
    { name: 'MOhamed hadi', handle: '@mohamedh', role: 'Manager', projects: '18/50', status: 'Active', enrolled: 'August 7, 2017' },
    { name: 'nadir ahmed', handle: '@nadirahmed', role: 'General', projects: '7/25', status: 'Active', enrolled: 'May 9, 2014' },
    { name: 'Cody Fisher', handle: '@codyf', role: 'Repair', projects: '27/100', status: 'Active', enrolled: 'October 24, 2018' },
    { name: 'Darlene Robertson', handle: '@darlener', role: 'General', projects: '21/25', status: 'Active', enrolled: 'March 6, 2018' },
    { name: 'Cameron Williamson', handle: '@cameronw', role: 'General', projects: '6/25', status: 'Active', enrolled: 'July 14, 2015' },
    { name: 'Dianne Russell', handle: '@dianner', role: 'Manager', projects: '32/50', status: 'Active', enrolled: 'August 2, 2013' },
  ];

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

  return (
    <>


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
              <h2 className="section-title">All employees (12,345)</h2>
              
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
                  <button className="filters-button">
                    <Settings size={16} />
                    Filters
                  </button>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th><input type="checkbox" /></th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Projects</th>
                    <th>Status</th>
                    <th>Enrolled</th>
                    <th style={{ textAlign: 'center' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee, idx) => (
                    <tr key={idx}>
                      <td><input type="checkbox" /></td>
                      <td>
                        <div className="employee-cell">
                          <div className="avatar"></div>
                          <div className="employee-info">
                            <h4>{employee.name}</h4>
                            <p>{employee.handle}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`role-badge ${getRoleColor(employee.role)}`}>
                          {employee.role}
                        </span>
                      </td>
                      <td>{employee.projects}</td>
                      <td>
                        <span className="status-badge">{employee.status}</span>
                      </td>
                      <td>{employee.enrolled}</td>
                      <td style={{ textAlign: 'center' }}>
                        <button className="action-button">
                          <ChevronDown size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}