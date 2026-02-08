import React, { useState } from 'react';
import { MapPin, Plus, Trash2, X, Clock, AlertCircle, CheckCircle, ChevronRight, Calendar, Zap } from 'lucide-react';
import './RoadInspectionTaskCreator.css';
import MiniMapPreview from './MiniMapPreview';
import axios from 'axios';
import PrivateAxios from '../../Api/PrivateAxios';
// Helper function to get formatted time one hour from now
const getInitialStartTime = () => {
  const now = new Date();
  const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);
  return oneHourLater.toISOString().slice(0, 16);
};

export default function RoadInspectionTaskCreator({TaskMode, setTaskMode, mapPins, setMapPins }) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState('route');
  const [routeGenerated, setRouteGenerated] = useState(false);
  const [routes, setRoutes] = useState([]);
  const axiosPrivate = PrivateAxios;
  // UPDATED: Changed to match C# model structure
  const [executionData, setExecutionData] = useState({
    vehicleId: '',
    startTime: getInitialStartTime(),
    estimatedMinutes: 30,
    type: 'OneTime',
    intervalHours: null,
    endTime: null,
    priority: 'Normal',
    autoRescan: false,
    sendNotifications: true,
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // UPDATED: Changed vehicle structure to match C# model
  const vehicles = [
    { id: '1', name: 'Inspection Car Alpha', plateNumber: 'ABC123', status: 'available' },
    { id: '2', name: 'Inspection Car Beta', plateNumber: 'DEF456', status: 'available' },
    { id: '3', name: 'Inspection Car Gamma', plateNumber: 'GHI789', status: 'busy' }
  ];

  const getRoute = async () => {
    if (mapPins.length < 2) {
      alert("Please select at least 2 points first!");
      return;
    }

    const coordsString = mapPins
      .map((point) => `${point.lng},${point.lat}`)
      .join(";");

    const url = `http://router.project-osrm.org/trip/v1/driving/${coordsString}?overview=full&geometries=geojson&source=first&destination=last&roundtrip=false`;

    try {
      const response = await axios.get(url);
      const data = response.data;

      if (data.trips && data.trips.length > 0) {
        const coords = data.trips[0].geometry.coordinates.map((coord) => [coord[1], coord[0]]);
        setRoutes(coords);
      }
    } catch (error) {
      console.error("Error fetching trip:", error);
    }
  };

  const addPin = () => {
    setIsOpen(false);
    setRouteGenerated(false);
    setError('');
  };

  const removePin = (id) => {
    setMapPins(mapPins.filter(pin => pin.id !== id));
    setRouteGenerated(false);
  };

  const generateRoute = async () => {
    if (mapPins.length < 2) {
      setError('Please add at least 2 pins to generate a route');
      return;
    }
    await getRoute();
    setError('');
    setRouteGenerated(true);
  };

  // UPDATED: Changed function name and logic
  const handleChange = (field, value) => {
    setExecutionData(prev => {
      const updated = { ...prev, [field]: value };
      
      // Reset recurring fields if switching to OneTime
      if (field === 'type' && value === 'OneTime') {
        updated.intervalHours = null;
        updated.endTime = null;
      }
      
      return updated;
    });
  };

  // UPDATED: Completely replaced with Axios call for C# API
const handleSubmit = async () => {
  if (mapPins.length < 2) {
  setError('At least 2 route points are required');
  return;
}
  if (!routeGenerated) {
    setError('Please confirm the route before creating task');
    return;
  }

  setSubmitted(true);
  
  try {
    // Prepare route data for C# API
    const routePoints = mapPins.map((pin, index) => ({
      latitude: pin.lat,
      longitude: pin.lng,
      order: index + 1
    }));

    const routePath = routes.map(coord => ({
      latitude: coord[0],
      longitude: coord[1]
    }));

    // Prepare data for C# API - INCLUDING ROUTE DATA
    const requestData = {
      vehicleId: executionData.vehicleId,
      startTime: new Date(executionData.startTime).toISOString(),
      estimatedMinutes: parseInt(executionData.estimatedMinutes),
      type: executionData.type === 'Recurring' ? 1 : 0,
      intervalHours: executionData.type === 'Recurring' ? 
        parseInt(executionData.intervalHours) : null,
      endTime: executionData.endTime ? 
        new Date(executionData.endTime).toISOString() : null,
      priority: executionData.priority === 'Low' ? 0 :
               executionData.priority === 'High' ? 2 : 1,
      autoRescan: executionData.autoRescan,
      sendNotifications: executionData.sendNotifications,
      routePoints: routePoints,  // ADD THIS LINE
      routePath: routePath,      // ADD THIS LINE
      notes: executionData.notes || ''
    };

    // Send to C# API endpoint
    const response = await axiosPrivate.post('Officer/CreateScanTask', requestData);
    
    console.log('Task created successfully:', response.data);
    
    // Reset form and close
    setTimeout(() => {
      setSubmitted(false);
      setIsOpen(false);
      setStep('route');
      setMapPins([]);
      setRoutes([]); // ADD THIS: Clear routes array
      setRouteGenerated(false);
      setTaskMode(false);
      
      // Reset execution data with new time
      const now = new Date();
      const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);
      const formatForInput = (date) => date.toISOString().slice(0, 16);
      
      setExecutionData({
        vehicleId: '',
        startTime: formatForInput(oneHourLater),
        estimatedMinutes: 30,
        type: 'OneTime',
        intervalHours: null,
        endTime: null,
        priority: 'Normal',
        autoRescan: false,
        sendNotifications: true,
        notes: ''
      });
    }, 2000);
    
  } catch (error) {
    console.error('Error creating task:', error);
    setError('Failed to create task. Please try again.');
    setSubmitted(false);
  }
};

const resetForm = () => {
  setIsOpen(false);
  setStep('route');
  setTaskMode(false);
  setMapPins([]);
  setRoutes([]); // ADD THIS LINE
  setRouteGenerated(false);
  setError('');
  
  // Reset to new structure with current time
  const now = new Date();
  const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);
  const formatForInput = (date) => date.toISOString().slice(0, 16);
  
  setExecutionData({
    vehicleId: '',
    startTime: formatForInput(oneHourLater),
    estimatedMinutes: 30,
    type: 'OneTime',
    intervalHours: null,
    endTime: null,
    priority: 'Normal',
    autoRescan: false,
    sendNotifications: true,
    notes: ''
  });
};

  return (
    <div className="task-creator-container">
      {!TaskMode && (
        <div className="fab-button " onClick={() => setTaskMode(true)}>
          <MapPin size={20} />
          <p style={{margin:0}}>Select Task Mode </p>
        </div>
      )}
      {!isOpen && TaskMode && (
        <button className=" fab-button-animation" onClick={() => setIsOpen(true)}>
          <Plus size={20} />
          New Inspection Task
        </button>
      )}

      {isOpen && <div className="backdrop" onClick={resetForm} />}

      <div className={`side-panel ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="panel-header">
          <div className="panel-header-content">
            <h2>Road Inspection Task</h2>
            <p>Create new scanning route</p>
          </div>
          <button className="panel-close-btn" onClick={resetForm}>
            <X size={24} />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="step-indicator">
          <div className="step-indicator-content">
            <div className={`step-dot ${step === 'route' ? 'active' : 'inactive'}`}>1</div>
            <span className={`step-label ${step === 'route' ? 'active' : 'inactive'}`}>Route</span>
            <div className={`step-divider ${step !== 'route' ? 'active' : ''}`} />
            <div className={`step-dot ${step === 'execution' ? 'active' : 'inactive'}`}>2</div>
            <span className={`step-label ${step === 'execution' ? 'active' : 'inactive'}`}>Settings</span>
            <div className={`step-divider ${step === 'review' ? 'active' : ''}`} />
            <div className={`step-dot ${step === 'review' ? 'active' : 'inactive'}`}>3</div>
            <span className={`step-label ${step === 'review' ? 'active' : 'inactive'}`}>Review</span>
          </div>
        </div>

        {/* Content */}
        <div className="panel-content">
          {/* STEP 1: ROUTE (No changes here) */}
          {step === 'route' && (
            <div className="content-section">
              <div>
                <div className="points-header">
                  <h3>
                    <MapPin size={20} />
                    Route Points
                  </h3>
                  <button className="add-btn" onClick={addPin}>
                    <Plus size={16} />Continue  Adding points
                  </button>
                </div>
                {routeGenerated ? (
                  <div style={{ maxHeight: '256px' }} className="map-preview-container">
                    <MiniMapPreview routeData={routes} />
                  </div>
                ) : mapPins.length > 0 ? (
                  <div className="points-list">
                    {mapPins.map((pin, idx) => (
                      <div key={pin.id} className="point-item">
                        <div className="point-item-left">
                          <div className="point-number">{idx + 1}</div>
                          <div className="point-info">
                            <p>Point {idx + 1}</p>
                            <p className="coordinates">
                              {pin.lat.toFixed(4)}, {pin.lng.toFixed(4)}
                            </p>
                          </div>
                        </div>
                        <button className="delete-btn" onClick={() => removePin(pin.id)}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <MapPin size={32} />
                    <p>No points added</p>
                    <p className="subtitle">Click "Add" to start building route</p>
                  </div>
                )}
              </div>

              {error && (
                <div className="error-alert">
                  <AlertCircle size={18} />
                  <p>{error}</p>
                </div>
              )}

              {mapPins.length >= 2 && (
                <button
                  className={`generate-btn ${routeGenerated ? 'completed' : 'pending'}`}
                  onClick={generateRoute}
                >
                  {routeGenerated ? '✓ Route Confirmed' : 'Generate & Confirm Route'}
                </button>
              )}

              <button
                className="btn-primary"
                onClick={() => routeGenerated && setStep('execution')}
                disabled={!routeGenerated}
              >
                Next <ChevronRight size={16} />
              </button>
            </div>
          )}

          {/* STEP 2: EXECUTION - UPDATED: Completely replaced with new structure */}
          {step === 'execution' && ( // UPDATED: Changed from 'execution2' to 'execution'
            <div className="content-section">
              {/* Scan Type - UPDATED: Changed from "Execution Mode" radio to select */}
              <div className="form-group">
                <label className="form-label">
                  <Zap size={18} />
                  Scan Type
                </label>
                <select
                  value={executionData.type}
                  onChange={(e) => handleChange('type', e.target.value)}
                  className="form-select"
                >
                  <option value="OneTime">One-Time Scan</option>
                  <option value="Recurring">Recurring Scan</option>
                </select>
              </div>

              {/* Start Time - UPDATED: Changed from "Start Date" */}
              <div className="form-group">
                <label className="form-label">Start Time</label>
                <input
                  type="datetime-local"
                  value={executionData.startTime}
                  onChange={(e) => handleChange('startTime', e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              {/* Recurring Options - UPDATED: Simplified to just hours */}
              {executionData.type === 'Recurring' && (
                <div className="recurring-box">
                  <div className="form-group">
                    <label className="form-label">Repeat Every (hours)</label>
                    <input
                      type="number"
                      min="1"
                      max="168"
                      value={executionData.intervalHours || 24}
                      onChange={(e) => handleChange('intervalHours', parseInt(e.target.value) || 24)}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">End Time (Optional)</label>
                    <input
                      type="datetime-local"
                      value={executionData.endTime || ''}
                      onChange={(e) => handleChange('endTime', e.target.value || null)}
                      className="form-input"
                    />
                  </div>
                </div>
              )}

              {/* Vehicle - UPDATED: Changed field name from vehicle to vehicleId */}
              <div className="form-group">
                <label className="form-label">Assign Vehicle</label>
                <select
                  value={executionData.vehicleId}
                  onChange={(e) => handleChange('vehicleId', e.target.value)}
                  className="form-select"
                >
                  <option value="">Select Vehicle</option>
                  {vehicles.map(v => (
                    <option key={v.id} value={v.id}>
                      {v.name} - {v.plateNumber} ({v.status})
                    </option>
                  ))}
                </select>
              </div>

              {/* Priority - UPDATED: Changed to select and values capitalized */}
              <div className="form-group">
                <label className="form-label">Priority</label>
                <select
                  value={executionData.priority}
                  onChange={(e) => handleChange('priority', e.target.value)}
                  className="form-select"
                >
                  <option value="Low">Low</option>
                  <option value="Normal">Normal</option>
                  <option value="High">High</option>
                </select>
              </div>

              {/* Duration - UPDATED: Changed field name from duration to estimatedMinutes */}
              <div className="form-group">
                <label className="form-label">Expected Duration (min)</label>
                <input
                  type="number"
                  min="5"
                  step="5"
                  value={executionData.estimatedMinutes}
                  onChange={(e) => handleChange('estimatedMinutes', parseInt(e.target.value))}
                  className="form-input"
                />
              </div>

              {/* Options - UPDATED: Added sendNotifications checkbox */}
              <div className="form-group">
                <label className="checkbox-group">
                  <input
                    type="checkbox"
                    checked={executionData.autoRescan}
                    onChange={(e) => handleChange('autoRescan', e.target.checked)}
                  />
                  <label>Auto re-scan if defects found</label>
                </label>

                <label className="checkbox-group">
                  <input
                    type="checkbox"
                    checked={executionData.sendNotifications}
                    onChange={(e) => handleChange('sendNotifications', e.target.checked)}
                  />
                  <label>Send notifications</label>
                </label>
              </div>

              {/* Notes - No changes */}
              <div className="form-group">
                <label className="form-label">Notes</label>
                <textarea
                  value={executionData.notes}
                  onChange={(e) => handleChange('notes', e.target.value)}
                  placeholder="Add any additional instructions..."
                  className="form-textarea"
                  rows="2"
                />
              </div>

              <div className="button-group">
                <button className="btn-secondary" onClick={() => setStep('route')}>
                  Back
                </button>
                <button className="btn-primary" onClick={() => setStep('review')}>
                  Next <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: REVIEW - UPDATED: Changed display values to match new structure */}
          {step === 'review' && (
            <div className="content-section">
              <h3 className="section-title">
                <CheckCircle size={20} style={{ color: '#16a34a' }} />
                Review Task
              </h3>

              <div className="summary-box">
                <div className="summary-item">
                  <span className="summary-label">Route Points:</span>
                  <span className="summary-value">{mapPins.length}</span>
                </div>
                <div className="summary-item divider">
                  <span className="summary-label">Execution:</span>
                  <span className="summary-value">{executionData.type === 'OneTime' ? 'One-Time' : 'Recurring'}</span>
                </div>
                {executionData.type === 'Recurring' && (
                  <div className="summary-item">
                    <span className="summary-label">Repeat Every:</span>
                    <span className="summary-value">{executionData.intervalHours} hours</span>
                  </div>
                )}
                <div className="summary-item divider">
                  <span className="summary-label">Vehicle:</span>
                  <span className="summary-value">{vehicles.find(v => v.id === executionData.vehicleId)?.name}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Priority:</span>
                  <span className={`summary-value ${executionData.priority === 'High' ? 'high-priority' : executionData.priority === 'Normal' ? 'normal-priority' : 'low-priority'}`}>
                    {executionData.priority}
                  </span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Duration:</span>
                  <span className="summary-value">{executionData.estimatedMinutes} min</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Auto Re-scan:</span>
                  <span className="summary-value">{executionData.autoRescan ? '✓ Yes' : 'No'}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Notifications:</span>
                  <span className="summary-value">{executionData.sendNotifications ? '✓ On' : 'Off'}</span>
                </div>
              </div>

              {submitted && (
                <div className="success-alert">
                  <p>✓ Task created successfully!</p>
                </div>
              )}

              <div className="button-group">
                <button className="btn-secondary" onClick={() => setStep('execution')}>
                  Back
                </button>
                <button className="btn-create" onClick={handleSubmit} disabled={submitted}>
                  {submitted ? '✓ Creating...' : 'Create Task'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}