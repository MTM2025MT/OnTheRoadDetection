import React, { useState, useMemo } from 'react';
import { Plus, Users, Shield, X, Search, UserX, BadgeCheck, Briefcase } from 'lucide-react';
import './EmployeeManagement.css'; 
import { useGetAllRoles, useGetAllUsers } from './ManagerHooks.jsx';

export default function EmployeeManagement() {
  const { roles: rolesData } = useGetAllRoles();
  const { users: usersData, refetch: refetchUsers } = useGetAllUsers();

  // --- 1. Data States ---
  const roles = Array.isArray(rolesData) ? rolesData : [];

  const employees = useMemo(() => {
    if (!Array.isArray(usersData)) return [];
    return usersData.map(u => ({
      id: u.Id,
      name: `${u.FirstName ?? ''} ${u.LastName ?? ''}`.trim(),
      username: u.UserName ?? '',
      email: u.Email ?? '',
      systemRole: Array.isArray(u.Roles) && u.Roles.length > 0 ? u.Roles[0] : 'General',
      assignedRoleId: null
    }));
  }, [usersData]);

  // --- 2. UI States ---
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // --- 3. Selection States ---
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);

  // --- 4. Form State ---
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    systemRole: 'General',
    department: '',
    phoneNumber: ''
  });

  const departments = ['HR', 'IT', 'Operations', 'Finance', 'Security'];
  const systemRoles = ['Manager', 'General', 'Admin', 'Supervisor'];

  // --- 5. Handlers ---
  const handleCreateEmployee = () => {
    if (formData.fullName && formData.email && formData.username && formData.password) {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      // TODO: call backend create API here
      refetchUsers();

      setFormData({
        fullName: '', email: '', username: '', password: '', confirmPassword: '',
        systemRole: 'General', department: '', phoneNumber: ''
      });
      setShowCreateModal(false);
    }
  };

  const handleAssignRole = () => {
    if (selectedEmployee && selectedRole) {
      // TODO: call backend assign API here
      refetchUsers();

      setShowAssignModal(false);
      setSelectedEmployee(null);
      setSelectedRole(null);
    }
  };

  const handleUnassignRole = () => {
    // TODO: call backend unassign API here
    refetchUsers();
  };

  // --- 6. Helper Functions & Filtering ---
  const unassignedEmployees = employees.filter(e => !e.assignedRoleId);
  const availableRoles = roles.filter(r => (r.userCount || 0) === 0);

  const filteredRoles = roles.filter(r =>
    String(r.roleId).toLowerCase().includes(searchTerm.toLowerCase()) ||
    (r.name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredEmployees = employees.filter(e =>
    (e.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (e.username || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (e.systemRole || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRankClass = (rank) => {
    const classes = {
      'Captain': 'rank-captain',
      'Lieutenant': 'rank-lieutenant',
      'Senior Officer': 'rank-senior',
      'Officer': 'rank-officer',
      'Superintendent': 'rank-super'
    };
    return classes[rank] || 'rank-default';
  };

  return (
    <div className="page-container">
      <div className="main-content">
        
        {/* --- HEADER --- */}
        <div className="header-section">
          <div className="title-row">
            <div className="icon-box-large">
              <Shield className="text-white" size={28} />
            </div>
            <div>
              <h1 className="page-title">Employee Management</h1>
              <p className="page-subtitle">Manage employees and assign job positions</p>
            </div>
          </div>

          <div className="search-container">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search employees, roles, or departments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {/* --- STATS --- */}
        <div className="stats-grid">
          <div className="stat-card stat-blue">
            <div className="stat-card-content">
              <div>
                <p className="stat-label">Total Roles</p>
                <p className="stat-value">{roles.length}</p>
              </div>
              <div className="stat-icon-box stat-icon-blue">
                <Shield className="text-white" size={24} />
              </div>
            </div>
          </div>

          <div className="stat-card stat-green">
            <div className="stat-card-content">
              <div>
                <p className="stat-label">Filled Positions</p>
                <p className="stat-value">{roles.filter(r => (r.userCount || 0) > 0).length}</p>
              </div>
              <div className="stat-icon-box stat-icon-green">
                <BadgeCheck className="text-white" size={24} />
              </div>
            </div>
          </div>

          <div className="stat-card stat-amber">
            <div className="stat-card-content">
              <div>
                <p className="stat-label">Vacant Positions</p>
                <p className="stat-value">{availableRoles.length}</p>
              </div>
              <div className="stat-icon-box stat-icon-amber">
                <UserX className="text-white" size={24} />
              </div>
            </div>
          </div>

          <div className="stat-card stat-purple">
            <div className="stat-card-content">
              <div>
                <p className="stat-label">Total Employees</p>
                <p className="stat-value">{employees.length}</p>
              </div>
              <div className="stat-icon-box stat-icon-purple">
                <Users className="text-white" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* --- ACTION BUTTONS --- */}
        <div className="action-buttons">
          <button
            onClick={() => {
              setFormData({ fullName: '', email: '', username: '', password: '', confirmPassword: '', systemRole: 'General', department: '', phoneNumber: '' });
              setShowCreateModal(true);
            }}
            className="btn btn-primary"
          >
            <Plus size={22} />
            <span className="text-lg">Create New Employee</span>
          </button>
          
          <button
            onClick={() => setShowAssignModal(true)}
            disabled={unassignedEmployees.length === 0 || availableRoles.length === 0}
            className="btn btn-success"
          >
            <Briefcase size={22} />
            <span className="text-lg">Assign Role to Employee</span>
          </button>
        </div>

        {/* --- MAIN GRID --- */}
        <div className="content-grid">
          
          {/* 1. ROLES (Positions) LIST */}
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Job Positions (Roles)</h2>
              <span className="badge-count">
                {filteredRoles.length} total
              </span>
            </div>
            
            <div className="list-container">
              {filteredRoles.length === 0 ? (
                <div className="empty-state">
                  <Shield className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p>No roles found</p>
                </div>
              ) : (
                filteredRoles.map(role => (
                  <div key={role.roleId} className="list-item">
                    <div className="item-header">
                      <div className="item-info-group">
                        <div className={`rank-icon-box ${getRankClass(role.name)}`}>
                          <Shield className="text-white" size={20} />
                        </div>
                        <div>
                          <h3 className="item-title">{role.roleId}</h3>
                          <p className="item-subtitle">{role.name}</p>
                        </div>
                      </div>
                      <span className={`status-badge ${(role.userCount || 0) > 0 ? 'status-assigned' : 'status-available'}`}>
                        {(role.userCount || 0) > 0 ? 'Assigned' : 'Available'}
                      </span>
                    </div>
                    
                    <div className="item-footer">
                      <div>
                        <span className="item-title" style={{ fontSize: '1.125rem' }}>{role.name}</span>
                        <p className="item-subtitle">Users: {role.userCount || 0}</p>
                      </div>
                      
                      {/* <button
                        onClick={() => handleDeleteRole(role.roleId)}
                        className="icon-btn delete"
                      >
                        <Trash2 size={18} />
                      </button> */}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* 2. EMPLOYEES LIST */}
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Employees</h2>
              <span className="badge-count">
                {employees.filter(e => e.assignedRoleId).length} assigned
              </span>
            </div>
            
            <div className="list-container">
              {filteredEmployees.length === 0 ? (
                <div className="empty-state">
                  <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p>No employees found</p>
                </div>
              ) : (
                filteredEmployees.map(employee => {
                  const assignedRole = roles.find(r => r.roleId === employee.assignedRoleId);
                  return (
                    <div key={employee.id} className="list-item">
                      <div className="item-header">
                        <div className="item-info-group">
                          <div className="rank-icon-box" style={{ background: '#475569' }}>
                            <Users className="text-white" size={20} />
                          </div>
                          <div>
                            <h3 className="item-title">{employee.name}</h3>
                            <p className="item-subtitle">{employee.username}</p>
                          </div>
                        </div>
                        <span className="status-badge status-role">
                          {employee.systemRole}
                        </span>
                      </div>
                      
                      <div className="item-footer">
                        <div>
                          {assignedRole ? (
                            <div className="item-info-group" style={{ gap: '0.5rem' }}>
                              <div className={`rank-icon-box ${getRankClass(assignedRole.name)}`} style={{ padding: '0.5rem', width: '2rem', height: '2rem' }}>
                                <Shield className="text-white" size={14} />
                              </div>
                              <div>
                                <p className="item-title" style={{ fontSize: '0.9rem' }}>{assignedRole.roleId}</p>
                                <p className="item-subtitle" style={{ fontSize: '0.8rem' }}>{assignedRole.name}</p>
                              </div>
                            </div>
                          ) : (
                            <p className="text-slate-400" style={{ fontStyle: 'italic' }}>No position assigned</p>
                          )}
                        </div>
                        
                        {assignedRole ? (
                          <button
                            onClick={() => handleUnassignRole(employee.id)}
                            className="btn-small btn-unassign"
                          >
                            Unassign
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setSelectedEmployee(employee);
                              setShowAssignModal(true);
                            }}
                            className="btn-small btn-assign"
                          >
                            Assign
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* --- CREATE MODAL --- */}
        {showCreateModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <div>
                  <h2 className="modal-title">Create New Employee</h2>
                  <p className="item-subtitle" style={{ marginTop: '0.25rem' }}>Fill in employee information to create account</p>
                </div>
                <button onClick={() => setShowCreateModal(false)} className="close-btn">
                  <X size={24} className="text-slate-400" />
                </button>
              </div>

              <div className="list-container">
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input type="text" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} className="form-input" placeholder="John Doe" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email *</label>
                    <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="form-input" placeholder="john@company.com" />
                  </div>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Username *</label>
                    <input type="text" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} className="form-input" placeholder="johndoe" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input type="tel" value={formData.phoneNumber} onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })} className="form-input" placeholder="+1 (555) 000-0000" />
                  </div>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Department</label>
                    <select value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })} className="form-input">
                      <option value="">Select Department</option>
                      {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">System Role *</label>
                    <select value={formData.systemRole} onChange={(e) => setFormData({ ...formData, systemRole: e.target.value })} className="form-input">
                      {systemRoles.map(role => <option key={role} value={role}>{role}</option>)}
                    </select>
                  </div>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Password *</label>
                    <input type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="form-input" placeholder="••••••••" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Confirm Password *</label>
                    <input type="password" value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} className="form-input" placeholder="••••••••" />
                  </div>
                </div>

                {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <div className="error-box"><p className="error-text">Passwords do not match!</p></div>
                )}

                <div className="modal-footer">
                  <button onClick={handleCreateEmployee} disabled={!formData.fullName || !formData.email || !formData.username || !formData.password || formData.password !== formData.confirmPassword} className="btn btn-primary" style={{ flex: 1 }}>Create Employee</button>
                  <button onClick={() => setShowCreateModal(false)} className="btn btn-secondary" style={{ flex: 1 }}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- ASSIGN MODAL --- */}
        {showAssignModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <div>
                  <h2 className="modal-title">Assign Job Position</h2>
                  <p className="item-subtitle" style={{ marginTop: '0.25rem' }}>Select an employee and an available role</p>
                </div>
                <button onClick={() => { setShowAssignModal(false); setSelectedEmployee(null); setSelectedRole(null); }} className="close-btn">
                  <X size={24} className="text-slate-400" />
                </button>
              </div>

              <div className="assign-grid">
                {/* Available Employees */}
                <div className="selection-box">
                  <h3 className="form-label" style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Available Employees</h3>
                  <div className="list-container" style={{ maxHeight: '20rem' }}>
                    {unassignedEmployees.map(employee => (
                      <div
                        key={employee.id}
                        onClick={() => setSelectedEmployee(employee)}
                        className={`selectable-item ${selectedEmployee?.id === employee.id ? 'selected-user' : ''}`}
                        style={{ marginBottom: '0.5rem' }}
                      >
                        <div className="item-content">
                          <div className="rank-icon-box" style={{ padding: '0.5rem', background: selectedEmployee?.id === employee.id ? '#bfdbfe' : '#f1f5f9' }}>
                            <Users size={20} className={selectedEmployee?.id === employee.id ? 'text-blue-600' : 'text-slate-500'} />
                          </div>
                          <div>
                            <p className="item-title" style={{ fontSize: '0.9rem' }}>{employee.name}</p>
                            <p className="item-subtitle" style={{ fontSize: '0.8rem' }}>{employee.username}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Available Roles (Positions) */}
                <div className="selection-box">
                  <h3 className="form-label" style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Available Roles</h3>
                  <div className="list-container" style={{ maxHeight: '20rem' }}>
                    {availableRoles.map(role => (
                      <div
                        key={role.roleId}
                        onClick={() => setSelectedRole(role)}
                        className={`selectable-item ${selectedRole?.id === role.id ? 'selected-officer' : ''}`}
                        style={{ marginBottom: '0.5rem' }}
                      >
                        <div className="item-content">
                          <div className={`rank-icon-box ${getRankClass(role.name)}`} style={{ padding: '0.5rem' }}>
                            <Shield className="text-white" size={20} />
                          </div>
                          <div>
                            <p className="item-title" style={{ fontSize: '0.9rem' }}>{role.roleId}</p>
                            <p className="item-subtitle" style={{ fontSize: '0.8rem' }}>{role.name}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Preview */}
              {selectedEmployee && selectedRole && (
                <div className="preview-box">
                  <p className="preview-text-center item-title" style={{ marginBottom: '1rem' }}>Assignment Preview</p>
                  <div className="preview-flow">
                    <div className="preview-text-center">
                      <div className="rank-icon-box" style={{ background: '#475569', marginBottom: '0.5rem', display: 'inline-flex' }}>
                        <Users className="text-white" size={24} />
                      </div>
                      <p className="item-title">{selectedEmployee.name}</p>
                      <p className="item-subtitle">Employee</p>
                    </div>
                    <div className="text-slate-400">→</div>
                    <div className="preview-text-center">
                      <div className={`rank-icon-box ${getRankClass(selectedRole.name)}`} style={{ marginBottom: '0.5rem', display: 'inline-flex' }}>
                        <Shield className="text-white" size={24} />
                      </div>
                      <p className="item-title">{selectedRole.roleId}</p>
                      <p className="item-subtitle">Role</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="modal-footer">
                <button onClick={handleAssignRole} disabled={!selectedEmployee || !selectedRole} className="btn btn-success" style={{ flex: 1 }}>Confirm Assignment</button>
                <button onClick={() => { setShowAssignModal(false); setSelectedEmployee(null); setSelectedRole(null); }} className="btn btn-secondary" style={{ flex: 1 }}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}