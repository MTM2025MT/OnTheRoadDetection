import React, { useState, useEffect } from 'react';
import { MapPin, AlertCircle, CheckCircle2, Clock, Zap, Plus, Eye, Send, Filter, Search, Trash2 } from 'lucide-react';
import PrivateAxios from '../../../Api/PrivateAxios.jsx';
import './OfficerMain.css'

export default function OfficerMain() {
  const [activeTab, setActiveTab] = useState('tasks');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for real data from backend
  const [backendTasks, setBackendTasks] = useState([]);
  const [backendPotholes, setBackendPotholes] = useState([]);
  const [backendScanTasks, setBackendScanTasks] = useState([]);

  // PRIMARY COLOR - TEAL/GREEN
  const primaryColor = '#1fb88f';
  const primaryLight = '#26d0ce';

  // SAMPLE DATA - Initial/Fallback Data
  const sampleTasks = [
    {
      id: 1,
      assignedAt: '2025-02-01T10:30:00',
      officer: { id: 1, name: 'Ahmed Hassan' },
      repairTeam: { id: 1, name: 'Squad A' },
      pothole: {
        id: 101,
        description: 'Large pothole on Main Street',
        latitude: 41.0136,
        longitude: 28.9370,
        levelOfSeverity: 2,
        reportedAt: '2025-02-01T08:00:00',
        confidence: 95,
      },
    },
    {
      id: 2,
      assignedAt: '2025-02-01T11:15:00',
      officer: { id: 2, name: 'Fatma Yilmaz' },
      repairTeam: { id: 2, name: 'Squad B' },
      pothole: {
        id: 102,
        description: 'Moderate pothole near Market Square',
        latitude: 41.0145,
        longitude: 28.9385,
        levelOfSeverity: 1,
        reportedAt: '2025-02-01T09:30:00',
        confidence: 87,
      },
    },
    {
      id: 3,
      assignedAt: '2025-02-01T12:00:00',
      officer: { id: 1, name: 'Ahmed Hassan' },
      repairTeam: { id: 3, name: 'Squad C' },
      pothole: {
        id: 103,
        description: 'Small crack on Oak Avenue',
        latitude: 41.0155,
        longitude: 28.9395,
        levelOfSeverity: 0,
        reportedAt: '2025-01-31T16:45:00',
        confidence: 72,
      },
    },
  ];

  const sampleUnassignedPotholes = [
    {
      id: 201,
      description: 'Severe pothole on Central Avenue',
      latitude: 41.0140,
      longitude: 28.9375,
      levelOfSeverity: 2,
      reportedAt: '2025-02-01T15:00:00',
      confidence: 93,
      neighbourhood: 'Downtown',
    },
    {
      id: 202,
      description: 'Minor crack on Park Street',
      latitude: 41.0150,
      longitude: 28.9390,
      levelOfSeverity: 0,
      reportedAt: '2025-02-01T14:30:00',
      confidence: 68,
      neighbourhood: 'West District',
    },
  ];

  const sampleScanTasks = [
    {
      id: 1,
      vehicleId: 'VEHICLE-001',
      startTime: '2025-02-01T16:00:00',
      estimatedMinutes: 45,
      type: 0,
      priority: 2,
      routePoints: [
        { id: 1, latitude: 41.0130, longitude: 28.9360, order: 1 },
        { id: 2, latitude: 41.0150, longitude: 28.9380, order: 2 },
        { id: 3, latitude: 41.0170, longitude: 28.9400, order: 3 },
      ],
      notes: 'Downtown main roads inspection',
    },
    {
      id: 2,
      vehicleId: 'VEHICLE-002',
      startTime: '2025-02-02T08:00:00',
      estimatedMinutes: 60,
      type: 1,
      priority: 1,
      routePoints: [
        { id: 4, latitude: 41.0120, longitude: 28.9350, order: 1 },
        { id: 5, latitude: 41.0140, longitude: 28.9370, order: 2 },
      ],
      notes: 'Residential area weekly scan',
    },
  ];

  // Fetch data from backend
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch all potholes
        const potholesRes = await PrivateAxios.get('/Pothole/GetAll');
        const potholes = potholesRes.data;
        setBackendPotholes(potholes);

        // Fetch scan tasks
        const scanTasksRes = await PrivateAxios.get('/Officer/GetScanTasks');
        const scanTasks = scanTasksRes.data;
        setBackendScanTasks(scanTasks);

        // Fetch repair tasks (JobTasks)
        try {
          const tasksRes = await PrivateAxios.get('/JobTask/GetAllJobTasks');
          const tasks = tasksRes.data;
          setBackendTasks(tasks);
        } catch (err) {
          console.warn('JobTasks endpoint not available, using sample data:', err);
          setBackendTasks(sampleTasks);
        }

      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load some data. Using sample data.');
        setBackendTasks(sampleTasks);
        setBackendPotholes([]);
        setBackendScanTasks(sampleScanTasks);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // Merge backend data with sample data
  const allTasks = backendTasks.length > 0 ? backendTasks : sampleTasks;
  const allPotholes = backendPotholes;
  const allScanTasks = backendScanTasks.length > 0 ? backendScanTasks : sampleScanTasks;

  // Find unassigned potholes
  const unassignedPotholes = allPotholes.filter(pothole =>
    !allTasks.some(task => task.potholeId === pothole.id || task.pothole?.id === pothole.id)
  );

  const displayUnassignedPotholes = unassignedPotholes.length > 0 ? unassignedPotholes : sampleUnassignedPotholes;

  const getSeverityColor = (severity) => {
    const severityMap = {
      0: { bg: 'rgba(34, 197, 94, 0.15)', text: '#22c55e', border: 'rgba(34, 197, 94, 0.3)' },
      1: { bg: 'rgba(245, 158, 11, 0.15)', text: '#d97706', border: 'rgba(245, 158, 11, 0.3)' },
      2: { bg: 'rgba(239, 68, 68, 0.15)', text: '#dc2626', border: 'rgba(239, 68, 68, 0.3)' },
    };
    return severityMap[severity] || severityMap[1];
  };

  const getSeverityLabel = (severity) => {
    const labels = { 0: 'Low', 1: 'Medium', 2: 'High' };
    return labels[severity] || 'Unknown';
  };

  const getPriorityLabel = (priority) => {
    const labels = { 0: 'Low', 1: 'Normal', 2: 'High' };
    return labels[priority] || 'Unknown';
  };

  const getScanTypeLabel = (type) => {
    return type === 0 ? 'One-Time' : 'Recurring';
  };

  // Filter tasks
  const filteredTasks = allTasks.filter(task => {
    const pothole = task.pothole;
    const matchesSearch =
      pothole?.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.officer?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.repairTeam?.name?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="officer-main-loading">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="officer-main">
      {/* Header */}
      <header className="officer-header">
        <div className="header-content">
          <div className="header-left">
            <h1 className="header-title">Command Center</h1>
            <p className="header-subtitle">Manage pothole detection and repair operations</p>
            {error && <p className="header-error">⚠️ {error}</p>}
          </div>
          <div className="header-stats">
            <div className="stat-box">
              <p className="stat-label">Active Tasks</p>
              <p className="stat-value" style={{ color: primaryColor }}>{allTasks.length}</p>
            </div>
            <div className="stat-box">
              <p className="stat-label">Unassigned Potholes</p>
              <p className="stat-value" style={{ color: primaryColor }}>{displayUnassignedPotholes.length}</p>
            </div>
            <div className="stat-box">
              <p className="stat-label">Scan Tasks</p>
              <p className="stat-value" style={{ color: primaryColor }}>{allScanTasks.length}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="officer-main-content">
        <div className="content-grid">
          {/* Left Panel */}
          <div className="left-panel">
            {/* Tabs */}
            <div className="tabs-navigation">
              {[
                { id: 'tasks', label: 'Repair Tasks', count: filteredTasks.length, icon: Clock },
                { id: 'potholes', label: 'Unassigned', count: displayUnassignedPotholes.length, icon: AlertCircle },
                { id: 'scans', label: 'Scan Tasks', count: allScanTasks.length, icon: MapPin },
              ].map(tab => {
                const IconComp = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                    style={activeTab === tab.id ? { backgroundColor: `${primaryColor}15`, color: primaryColor, borderBottom: `3px solid ${primaryColor}` } : {}}
                  >
                    <IconComp size={18} />
                    <span>{tab.label} ({tab.count})</span>
                  </button>
                );
              })}
            </div>

            {/* Repair Tasks Tab */}
            {activeTab === 'tasks' && (
              <div className="tab-content">
                <div className="search-bar">
                  <Search size={16} className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                  />
                </div>

                <div className="items-list">
                  {filteredTasks.length === 0 ? (
                    <div className="empty-state">
                      <CheckCircle2 size={40} />
                      <p>No repair tasks found</p>
                    </div>
                  ) : (
                    filteredTasks.map(task => {
                      const pothole = task.pothole;
                      const severity = pothole?.levelOfSeverity || 1;
                      const colors = getSeverityColor(severity);
                      return (
                        <div key={task.id} className="task-item">
                          <div className="task-header">
                            <div className="task-title-section">
                              <div className="severity-badge" style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}>
                                {getSeverityLabel(severity).charAt(0)}
                              </div>
                              <div className="task-info">
                                <h3>{pothole?.description || 'Pothole #' + pothole?.id}</h3>
                                <p>Lat: {pothole?.latitude.toFixed(4)}, Lng: {pothole?.longitude.toFixed(4)}</p>
                                <p>Assigned: {new Date(task.assignedAt).toLocaleDateString()} {new Date(task.assignedAt).toLocaleTimeString()}</p>
                              </div>
                            </div>
                            <span className="severity-label-badge" style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}>
                              {getSeverityLabel(severity)}
                            </span>
                          </div>

                          <div className="task-details">
                            <div className="detail-column">
                              <p className="detail-label">Officer</p>
                              <p className="detail-value">{task.officer?.name || 'N/A'}</p>
                            </div>
                            <div className="detail-column">
                              <p className="detail-label">Team</p>
                              <p className="detail-value">{task.repairTeam?.name || 'N/A'}</p>
                            </div>
                            <div className="detail-column">
                              <p className="detail-label">Confidence</p>
                              <p className="detail-value">{pothole?.confidence || 0}%</p>
                            </div>
                          </div>

                          <div className="action-buttons">
                            <button className="action-btn primary" style={{ backgroundColor: `${primaryColor}15`, color: primaryColor, border: `1px solid ${primaryColor}30` }}>
                              <Eye size={14} /> View on Map
                            </button>
                            <button className="action-btn secondary">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}

            {/* Unassigned Potholes Tab */}
            {activeTab === 'potholes' && (
              <div className="tab-content">
                <div className="items-list">
                  {displayUnassignedPotholes.length === 0 ? (
                    <div className="empty-state">
                      <CheckCircle2 size={40} />
                      <p>All potholes have been assigned!</p>
                    </div>
                  ) : (
                    displayUnassignedPotholes.map(pothole => {
                      const severity = pothole.levelOfSeverity || 1;
                      const colors = getSeverityColor(severity);
                      return (
                        <div key={pothole.id} className="task-item">
                          <div className="task-header">
                            <div className="task-title-section">
                              <AlertCircle size={20} style={{ color: colors.text, flexShrink: 0 }} />
                              <div className="task-info">
                                <h3>{pothole.description || 'Pothole #' + pothole.id}</h3>
                                <p>Lat: {pothole.latitude.toFixed(4)}, Lng: {pothole.longitude.toFixed(4)}</p>
                                <p>Reported: {new Date(pothole.reportedAt).toLocaleDateString()}</p>
                                <p>Confidence: {pothole.confidence}%</p>
                              </div>
                            </div>
                            <div className="severity-badge" style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}>
                              {getSeverityLabel(severity).charAt(0)}
                            </div>
                          </div>

                          <div className="action-buttons">
                            <button className="action-btn primary" style={{ backgroundColor: `${primaryColor}15`, color: primaryColor, border: `1px solid ${primaryColor}30` }}>
                              <Plus size={14} /> Create Task
                            </button>
                            <button className="action-btn primary" style={{ backgroundColor: `${primaryColor}15`, color: primaryColor, border: `1px solid ${primaryColor}30` }}>
                              <Eye size={14} />
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}

            {/* Scan Tasks Tab */}
            {activeTab === 'scans' && (
              <div className="tab-content">
                <div className="items-list">
                  {allScanTasks.length === 0 ? (
                    <div className="empty-state">
                      <MapPin size={40} />
                      <p>No scan tasks scheduled</p>
                    </div>
                  ) : (
                    allScanTasks.map(scan => (
                      <div key={scan.id} className="task-item">
                        <div className="task-header">
                          <div className="task-title-section">
                            <div className="severity-badge" style={{ backgroundColor: `${primaryColor}15`, color: primaryColor, border: `1px solid ${primaryColor}30` }}>
                              <MapPin size={18} />
                            </div>
                            <div className="task-info">
                              <h3>Scan Route #{scan.id}</h3>
                              <p>Vehicle: {scan.vehicleId}</p>
                              <p>{scan.notes}</p>
                              <p>{scan.routePoints?.length || 0} stops • Est. {scan.estimatedMinutes} min</p>
                            </div>
                          </div>
                          <div className="scan-badges">
                            <span className="scan-type-badge" style={{ backgroundColor: `${primaryColor}15`, color: primaryColor, border: `1px solid ${primaryColor}30` }}>
                              {getScanTypeLabel(scan.type)}
                            </span>
                            <span className={`priority-badge ${scan.priority === 2 ? 'high' : 'normal'}`}>
                              {getPriorityLabel(scan.priority)}
                            </span>
                          </div>
                        </div>

                        <div className="task-details">
                          <div className="detail-column">
                            <p className="detail-label">Start Time</p>
                            <p className="detail-value">{new Date(scan.startTime).toLocaleDateString()}</p>
                            <p className="detail-value-small">{new Date(scan.startTime).toLocaleTimeString()}</p>
                          </div>
                          <div className="detail-column">
                            <p className="detail-label">Duration</p>
                            <p className="detail-value">{scan.estimatedMinutes} min</p>
                          </div>
                          <div className="detail-column">
                            <p className="detail-label">Route Points</p>
                            <p className="detail-value">{scan.routePoints?.length || 0} points</p>
                          </div>
                        </div>

                        <div className="action-buttons">
                          <button className="action-btn primary" style={{ backgroundColor: `${primaryColor}15`, color: primaryColor, border: `1px solid ${primaryColor}30` }}>
                            <Eye size={14} /> View 
                          </button>
                          <button className="action-btn secondary">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Panel */}
          <div className="right-panel">
            {/* Quick Stats */}
            <div className="panel-card">
              <h2>Quick Stats</h2>
              <div className="stats-grid">
                <div className="stat-card">
                  <p className="stat-label">Total Tasks</p>
                  <p className="stat-number" style={{ color: primaryColor }}>{allTasks.length}</p>
                </div>
                <div className="stat-card">
                  <p className="stat-label">Unassigned</p>
                  <p className="stat-number" style={{ color: '#dc2626' }}>{displayUnassignedPotholes.length}</p>
                </div>
                <div className="stat-card">
                  <p className="stat-label">Active Scans</p>
                  <p className="stat-number" style={{ color: primaryColor }}>{allScanTasks.length}</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="panel-card">
              <h2>Quick Actions</h2>
              <button className="action-btn-large" style={{ background: `linear-gradient(135deg, ${primaryLight} 0%, ${primaryColor} 100%)`, color: 'white' }}>
                <Plus size={18} /> Create Repair Task
              </button>
              <button className="action-btn-large secondary" style={{ backgroundColor: `${primaryColor}15`, color: primaryColor, border: `1px solid ${primaryColor}30` }}>
                <Send size={16} /> Create Scan Task
              </button>
              <button className="action-btn-large secondary" style={{ backgroundColor: `${primaryColor}15`, color: primaryColor, border: `1px solid ${primaryColor}30` }}>
                <Eye size={16} /> View 
              </button>
            </div>

            {/* System Info */}
            <div className="panel-card">
              <h2>System Info</h2>
              <div className="info-list">
                <p><span>Data Source:</span> Backend + Sample</p>
                <p><span>Status:</span> <span style={{ color: '#16a34a' }}>Connected</span></p>
                <p><span>Tasks Loaded:</span> {allTasks.length}</p>
                <p><span>Last Update:</span> Now</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}