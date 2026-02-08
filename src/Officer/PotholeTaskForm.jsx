import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
export default function PotholeTaskForm() {
  const [selectedTeam, setSelectedTeam] = useState(null);
  /**
   *     latitude: number;
    longitude: number;
    description: string | null;
    levelOfSeverity: number;
    imageUrl: string | null;
    reportedAt: string;
    neighbourhoodId: number | null;
    neighbourhood: null;
    confidence: number | null;
   */
  const defaultFormData = {
    latitude: 41.0082,
    longitude: 28.9784,
    levelOfSeverity: 3,
    description: 'Detected Issue #1',
    confidence: 0.94,
    selectedTeamId: null,
    priority: 'urgent',
    neighbourhoodId: null,
    notes: '',
    materials: '',
    reportedAt: '',
    budget: ''
  };

  const [formData, setFormData] = useState(defaultFormData);
  const location = useLocation();
  const locstate = location.state || {};
  const [submitted, setSubmitted] = useState(false);

  const shallowEqual = (a, b) => {
    const keys = new Set([...Object.keys(a || {}), ...Object.keys(b || {})]);
    for (const key of keys) {
      if (a[key] !== b[key]) return false;
    }
    return true;
  };

  // Update form defaults when navigation sends state
  useEffect(() => {
    const navState = location.state ?? null;
    if (!navState) return;

    const {
      latitude,
      longitude,
      description,
      levelOfSeverity,
      confidence,
      location: locationName
    } = navState;

    // eslint-disable-next-line react-hooks/set-state-in-effect -- we intentionally sync nav-provided defaults once on navigation
    setFormData((prev) => {
      const next = {
        ...prev,
        latitude: latitude != null ? Number(latitude) : prev.latitude,
        longitude: longitude != null ? Number(longitude) : prev.longitude,
        description: description ?? prev.description,
        levelOfSeverity: levelOfSeverity ?? prev.levelOfSeverity,
        confidence: confidence ?? prev.confidence,
        location: locationName ?? prev.location
      };

      return shallowEqual(prev, next) ? prev : next;
    });
  }, [location.key]);


  // Mock team data
  const teams = [
    {
      id: 1,
      name: 'Team Alpha',
      distance: '2.3 km',
      workload: 65,
      status: 'Available',
      workers: 5,
      specialization: 'Road Repair',
      baseCity: 'Sultanahmet',
      equipment: ['Asphalt', 'Compactor', 'Machinery']
    },
    {
      id: 2,
      name: 'Team Beta',
      distance: '4.1 km',
      workload: 45,
      status: 'Available',
      workers: 4,
      specialization: 'Surface Repair',
      baseCity: 'Beyazıt',
      equipment: ['Patches', 'Sealant', 'Tools']
    },
    {
      id: 3,
      name: 'Team Gamma',
      distance: '1.8 km',
      workload: 88,
      status: 'Busy',
      workers: 6,
      specialization: 'Heavy Repair',
      baseCity: 'Cankurtaran',
      equipment: ['Asphalt', 'Jackhammer', 'Compactor']
    },
    {
      id: 4,
      name: 'Team Delta',
      distance: '3.5 km',
      workload: 30,
      status: 'Available',
      workers: 3,
      specialization: 'Quick Fixes',
      baseCity: 'Topkapı',
      equipment: ['Patches', 'Tools', 'Sealant']
    }
  ];

  const calculateScore = (team) => {
    const workloadScore = (100 - team.workload) * 0.4;
    const distanceScore = (1 / (parseFloat(team.distance) + 1)) * 100 * 0.6;
    return Math.round(workloadScore + distanceScore);
  };

  const getWorkloadColor = (workload) => {
    if (workload < 40) return { bg: '#dcfce7', text: '#166534' };
    if (workload < 70) return { bg: '#fef3c7', text: '#b45309' };
    return { bg: '#fee2e2', text: '#991b1b' };
  };

  const getStatusColor = (status) => {
    return status === 'Available' ? '#16a34a' : '#dc2626';
  };

  const handleSelectTeam = (team) => {
    setSelectedTeam(team);
    setFormData(prev => ({
      ...prev,
      selectedTeamId: team.id
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (!selectedTeam) {
      alert('Please select a team');
      return;
    }
    setSubmitted(true);
    console.log('Task Created:', { ...formData, assignedTeam: selectedTeam });
    setTimeout(() => setSubmitted(false), 3000);
  };

  const getSeverityGradient = (severity) => {
    const gradients = {
      1: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
      2: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
      3: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      4: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)'
    };
    return gradients[severity] || gradients[4];
  };

  const sortedTeams = [...teams].sort((a, b) => calculateScore(b) - calculateScore(a));

  const displayLatitude = Number(locstate.latitude ?? formData.latitude ?? defaultFormData.latitude);
  const displayLongitude = Number(locstate.longitude ?? formData.longitude ?? defaultFormData.longitude);
  const displayLocation = locstate.location ?? formData.location ?? 'Unknown location';
  const displaySeverity = locstate.levelOfSeverity ?? formData.levelOfSeverity ?? defaultFormData.levelOfSeverity;
  const displayDescription = locstate.description ?? formData.description ?? defaultFormData.description;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #0f172a, #1e293b, #0f172a)',
      padding: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ width: '100%', maxWidth: '56rem',textAlign:'left' }}>
        {/* Main Card */}
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '1rem',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden'
        }}>
          
          {/* Headerid: number;
 */}
          <div style={{
            background: getSeverityGradient(formData.levelOfSeverity),
            color: '#fff',
            padding: '24px',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                padding: '12px',
                borderRadius: '8px',
                backdropFilter: 'blur(10px)'
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="16"></line>
                  <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
              </div>
              <div>
                <h2 style={{ fontSize: '14px', fontWeight: '600', opacity: 0.9, margin: 0 }}>Create Repair Task</h2>
                <p style={{ fontSize: '28px', fontWeight: 'bold', margin: '0' }}>Assign Repair Team</p>
              </div>
            </div>
            <div style={{
              padding: '6px 12px',
              borderRadius: '9999px',
              fontSize: '12px',
              fontWeight: 'bold',
              backgroundColor: 'rgba(255,255,255,0.2)'
            }}>
              {`Severity ${displaySeverity}`}
            </div>
          </div>

          {/* Content */}
          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Pothole Details */}
            <div style={{
              backgroundColor: '#f9fafb',
              padding: '16px',
              borderRadius: '8px',
              border: '1px solid #e5e7eb'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginTop: 0, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                Pothole Details
              </h3>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px',
                marginBottom: '16px'
              }}>
                <div>
                  <p style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', margin: '0 0 4px 0' }}>Location</p>
                  <p style={{ fontSize: '14px', fontWeight: '500', color: '#1f2937', margin: 0 }}>{displayLocation}</p>
                </div>
                <div>
                  <p style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', margin: '0 0 4px 0' }}>Latitude</p>
                  <p style={{ fontSize: '14px', fontWeight: '500', color: '#1f2937', margin: 0 }}>{displayLatitude.toFixed(4)}</p>
                </div>
                <div>
                  <p style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', margin: '0 0 4px 0' }}>Longitude</p>
                  <p style={{ fontSize: '14px', fontWeight: '500', color: '#1f2937', margin: 0 }}>{displayLongitude.toFixed(4)}</p>
                </div>
                <div>
                  <p style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', margin: '0 0 4px 0' }}>Severity</p>
                  <p style={{ fontSize: '14px', fontWeight: '500', color: '#1f2937', margin: 0, textTransform: 'capitalize' }}>{displaySeverity}</p>
                </div>
              </div>

              <div style={{ marginBottom: '12px' }}>
                <p style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', margin: '0 0 4px 0' }}>Description</p>
                <p style={{ fontSize: '14px', color: '#4b5563', margin: 0 }}>{displayDescription}</p>
              </div>

              <div>
                <p style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', margin: '0 0 8px 0' }}>Confidence</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: '100px',
                    height: '8px',
                    backgroundColor: '#d1d5db',
                    borderRadius: '9999px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${formData.confidence * 100}%`,
                      backgroundColor: '#22c55e'
                    }} />
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>{(formData.confidence * 100).toFixed(0)}%</span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: '1px', backgroundColor: '#e5e7eb' }}></div>

            {/* Team Selection */}
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginTop: 0, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                Select Repair Team
              </h3>
              <p style={{ fontSize: '14px', color: '#4b5563', marginBottom: '16px' }}>Teams ranked by availability and proximity to location</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {sortedTeams.map((team) => {
                  const score = calculateScore(team);
                  const isSelected = selectedTeam?.id === team.id;
                  const workloadColor = getWorkloadColor(team.workload);
                  
                  return (
                    <div
                      key={team.id}
                      onClick={() => handleSelectTeam(team)}
                      style={{
                        padding: '16px',
                        borderRadius: '8px',
                        border: isSelected ? '2px solid #2563eb' : '2px solid #e5e7eb',
                        backgroundColor: isSelected ? '#eff6ff' : '#f9fafb',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {/* Team Header */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                        <div>
                          <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', margin: '0 0 4px 0' }}>{team.name}</h4>
                          <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>{team.specialization}</p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#2563eb' }}>{score}</div>
                          <div style={{ fontSize: '12px', color: '#6b7280' }}>Match Score</div>
                        </div>
                      </div>

                      {/* Team Info Grid */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                        gap: '12px',
                        marginBottom: '12px'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                          </svg>
                          <div>
                            <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>Distance</p>
                            <p style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937', margin: 0 }}>{team.distance}</p>
                          </div>
                        </div>

                        <div>
                          <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 6px 0' }}>Workload</p>
                          <div style={{
                            fontSize: '12px',
                            fontWeight: 'bold',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            backgroundColor: workloadColor.bg,
                            color: workloadColor.text,
                            display: 'inline-block'
                          }}>
                            {team.workload}%
                          </div>
                        </div>

                        <div>
                          <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 6px 0' }}>Status</p>
                          <p style={{ fontSize: '14px', fontWeight: '600', color: getStatusColor(team.status), margin: 0 }}>
                            {team.status}
                          </p>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                          </svg>
                          <div>
                            <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>Workers</p>
                            <p style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937', margin: 0 }}>{team.workers}</p>
                          </div>
                        </div>
                      </div>

                      {/* Additional Info */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '12px',
                        fontSize: '12px'
                      }}>
                        <div>
                          <p style={{ color: '#6b7280', margin: 0 }}>Base: <span style={{ fontWeight: '600', color: '#1f2937' }}>{team.baseCity}</span></p>
                        </div>
                        <div>
                          <p style={{ color: '#6b7280', margin: 0 }}>Equipment: <span style={{ fontWeight: '600', color: '#1f2937' }}>{team.equipment.join(', ')}</span></p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: '1px', backgroundColor: '#e5e7eb' }}></div>

            {/* Task Details */}
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginTop: 0, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="12" y1="11" x2="12" y2="17"></line>
                  <line x1="9" y1="14" x2="15" y2="14"></line>
                </svg>
                Task Details
              </h3>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '16px',
                marginBottom: '16px'
              }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                    Priority
                  </label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontFamily: 'inherit'
                    }}
                  >
                    <option value="low">Low</option>
                    <option value="normal">Normal</option>
                    <option value="urgent">Urgent</option>
                    <option value="emergency">Emergency</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                    Estimated Budget (₺)
                  </label>
                  <input
                    type="number"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    placeholder="Enter budget"
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontFamily: 'inherit',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                  Required Materials
                </label>
                <input
                  type="text"
                  name="materials"
                  value={formData.materials}
                  onChange={handleChange}
                  placeholder="e.g., Asphalt, Sand, Tools"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                  Additional Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Add any additional notes for the repair team..."
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box',
                    minHeight: '80px',
                    resize: 'vertical'
                  }}
                />
              </div>
            </div>

            {/* Submit Section */}
            <div style={{
              backgroundColor: '#f9fafb',
              margin: '-24px -24px -24px -24px',
              padding: '16px 24px',
              display: 'flex',
              gap: '12px',
              borderTop: '1px solid #e5e7eb'
            }}>
              <button
                onClick={handleSubmit}
                disabled={!selectedTeam}
                style={{
                  flex: 1,
                  background: selectedTeam ? 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)' : '#d1d5db',
                  color: '#fff',
                  fontWeight: '600',
                  padding: '12px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: selectedTeam ? 'pointer' : 'not-allowed',
                  fontSize: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.2s'
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
                Create Task & Assign
              </button>
            </div>
          </div>

          {/* Success Message */}
          {submitted && (
            <div style={{
              backgroundColor: '#f0fdf4',
              borderTop: '1px solid #86efac',
              padding: '16px 24px'
            }}>
              <p style={{ color: '#166534', fontWeight: '600', margin: 0 }}>
                ✓ Task created successfully and assigned to {selectedTeam?.name}!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}