import React, {  useContext, useState } from 'react';
import { AlertTriangle, TrendingUp, MapPin, Clock, DollarSign, Download } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './PotholeDashboard.css'; // Ensure your CSS file is imported
import { DashboardContext } from './DashboardContext/DashboardContext';
import Spinner from 'react-bootstrap/Spinner';
// 1. We define KpiCard OUTSIDE the main function to fix the "Render" error.
// eslint-disable-next-line no-unused-vars
const KpiCard = ({ title, value, icon: Icon, subText, themeColor }) => (
  <div className="kpi-card">
    <div className="kpi-content">
      <div className="kpi-header">
        <div>
          <div className="kpi-value" style={{ color: themeColor }}>{value}</div>
          <div className="kpi-title">{title}</div>
        </div>
        
        {/* 2. THIS IS THE FIX: We are using the 'Icon' variable here as a tag <Icon /> */}
        <div className="icon-wrapper" style={{ backgroundColor: `${themeColor}20` }}>
          <Icon size={24} color={themeColor} />
        </div>

      </div>
    </div>
    <div className="kpi-footer" style={{ backgroundColor: themeColor }}>
      <span>{subText}</span>
      <TrendingUp size={16} color="white" />
    </div>
  </div>
);

export default function PotholeDashboard() {
  const [timeRange, setTimeRange] = useState('30');
  const { potholeData, loading } = useContext(DashboardContext);



  // Data
  const levelCounts = potholeData?.levelCounts || {
    Critical: 0,
    High: 90,
    Low: 18,
    Medium: 2
  };
  const stats = { critical: levelCounts.Critical, total: 187, thisMonth: 45, avgResolutionDays: 14 };
  const severityData = [
    { name: 'Critical', value: levelCounts.Critical, color: '#ef4444' },
    { name: 'High', value: levelCounts.High, color: '#f97316' },
    { name: 'Medium', value: levelCounts.Medium, color: '#eab308' },
    { name: 'Low', value: levelCounts.Low, color: '#22c55e' }
  ];
  const neighborhoodData = [
    { name: 'Downtown', potholes: 34, severity: 3.4, priority: 'URGENT' },
    { name: 'Bridge Area', potholes: 28, severity: 3.1, priority: 'HIGH' },
    { name: 'Industrial', potholes: 22, severity: 2.9, priority: 'HIGH' },
    { name: 'Res. North', potholes: 18, severity: 2.3, priority: 'MEDIUM' },
    { name: 'Res. South', potholes: 15, severity: 2.1, priority: 'MEDIUM' },
    { name: 'Airport Rd', potholes: 25, severity: 3.2, priority: 'HIGH' },
  ];
  const trendData = [
    { date: 'Nov 3', reported: 8, critical: 2 },
    { date: 'Nov 10', reported: 12, critical: 4 },
    { date: 'Nov 17', reported: 15, critical: 5 },
    { date: 'Nov 24', reported: 18, critical: 6 },
    { date: 'Dec 1', reported: 12, critical: 4 },
    { date: 'Dec 8', reported: 14, critical: 5 },
    { date: 'Dec 15', reported: 16, critical: 7 }
  ];
  const resolutionData = [
    { range: '1-3 days', count: 12, percentage: 18 },
    { range: '4-7 days', count: 28, percentage: 42 },
    { range: '8-14 days', count: 18, percentage: 27 },
    { range: '15+ days', count: 8, percentage: 13 }
  ];
  const totalBudget = 54200;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1>Overview Dashboard</h1>
          <p className="subtitle">Road Infrastructure & Maintenance Status</p>
        </div>
        <div className="header-controls">
          <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
          </select>
          <button className="btn-primary">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      <div className="grid-row kpi-grid">
        <KpiCard title="Est. Budget Needed" value={`$${(totalBudget/1000).toFixed(1)}k`} icon={DollarSign} themeColor="var(--color-yellow)" subText="For all active repairs" />
        <KpiCard title="Critical Potholes" value={stats.critical} icon={AlertTriangle} themeColor="var(--color-red)" subText="Requires immediate action" />
        <KpiCard title="Total Active Tasks" value={stats.total} icon={MapPin} themeColor="var(--color-green)" subText={`${stats.thisMonth} new this month`} />
        <KpiCard title="Avg Resolution" value={`${stats.avgResolutionDays}d`} icon={Clock} themeColor="var(--color-blue)" subText="Target: < 10 days" />
      </div>

      <div className="grid-row main-chart-grid">
        <div className="hero-card">
          <div className="hero-header">
            <div>
              <h3 className="hero-title">Report Trends</h3>
              <p className="hero-subtitle">Daily incoming reports</p>
            </div>
            <div className="trend-badge"><TrendingUp size={14} /> +3%</div>
          </div>
          <div style={{ height: '180px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none' }} cursor={{ stroke: 'rgba(255,255,255,0.2)' }} />
                <Line type="monotone" dataKey="reported" stroke="#ffffff" strokeWidth={3} dot={{ fill: 'white', r: 4, strokeWidth: 0 }} />
                <Line type="monotone" dataKey="critical" stroke="rgba(255,255,255,0.5)" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="hero-footer">
            <div><div className="stat-label">Total Reports</div><div className="stat-val">1,230</div></div>
            <div style={{ textAlign: 'right' }}><div className="stat-label">Resolved</div><div className="stat-val">845</div></div>
          </div>
        </div>

        <div className="card">
          <h3>Severity Distribution</h3>
          <div style={{ flex: 1, minHeight: '180px', position: 'relative' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={severityData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {severityData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', pointerEvents: 'none' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.total}</div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>Issues</div>
            </div>
          </div>
          <div className="legend-flex">
            {severityData.slice(0,3).map(item => (
              <div key={item.name} className="legend-item"><div className="dot" style={{ background: item.color }}></div>{item.name}</div>
            ))}
          </div>
        </div>

        <div style={{height:'500px'}} className="card">
          <h3>Resolution Time</h3>
          <div className="progress-list">
            {resolutionData.map((item, idx) => (
              <div key={idx}>
                <div className="progress-item-header">
                  <span style={{ fontWeight: 500, color: '#475569' }}>{item.range}</span>
                  <span style={{ color: '#94a3b8' }}>{item.percentage}%</span>
                </div>
                <div className="progress-bg">
                  <div className="progress-fill" style={{ width: `${item.percentage}%`, opacity: 1 - (idx * 0.15) }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid-row bottom-grid">
        <div className="card">
          <h3>Urgency by Area</h3>
          <div style={{ height: '250px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={neighborhoodData} layout="vertical" margin={{ left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" tick={{fontSize: 11, fill: '#64748b'}} width={80} />
                <Tooltip cursor={{fill: '#f1f5f9'}} />
                <Bar dataKey="potholes" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card" style={{ padding: '0', overflow: 'scroll',height:'500px' }}>
          <div style={{ padding: '24px 24px 0 24px' }}><h3>Top Priority Areas</h3></div>
          <div className="table-container">
            {loading ? (
              <div className="loading-spinner">
                <Spinner animation="border" role="status" variant="primary">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            ) : 
            <table className="data-table">
              <thead>
                <tr>
                  <th>Neighborhood</th><th>Severity Score</th><th>Status</th><th className="text-right">Est. Cost</th>
                </tr>
              </thead>
              <tbody>
                
                {  
                potholeData?.dashboardNeighbourhoods?.map((item, index) => (
                  <tr key={index}>
                    <td style={{ fontWeight: 500, color: '#334155' }}>{item.name}</td>
                    <td>
                      <span style={{ fontWeight: 600 }}>{item.severityOfNeighbourhood.toFixed(1)}</span>
                      <div className="severity-track"><div className="severity-fill" style={{ width: `${(item.severityOfNeighbourhood/5)*100}%`, background: item.severityOfNeighbourhood > 3 ? 'var(--color-red)' : 'var(--color-orange)' }}></div></div>
                    </td>
                    <td><span className={`status-badge status-HIGH`}>HIGH</span></td>
                    <td className="text-right" style={{ fontWeight: 500 }}>${(item.cost * 250).toLocaleString()}</td>
                  </tr>
                ))}
                {/* {item.priority.toLowerCase()} */}
              </tbody>
            </table>
            }
          </div>
        </div>
      </div>
    </div>
  );
}