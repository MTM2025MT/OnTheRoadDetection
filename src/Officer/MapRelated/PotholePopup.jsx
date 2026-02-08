import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PotholePopup.css';
function PotholePopup({ location = {
  id: "Main Street",
  latitude: 41.0082,
  longitude: 28.9784,
  imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695c952952?w=400&h=300&fit=crop",
  description: "Large pothole detected on main road causing traffic issues",
  confidence: 0.94,
  timestamp: "Dec 9, 2025"
} }) {
  const navigate = useNavigate();
  const IsexistWithTask = false;
  // const [copied, setCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
    useEffect(() => {
    // Check if this pothole is marked as favorite in localStorage
  console.log("reload ")
  }, []);
  // const copyCoords = () => {
  //   navigator.clipboard.writeText(
  //     `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`
  //   );
  //   setCopied(true);
  //   setTimeout(() => setCopied(false), 1500);
  // };
   const CreateTask=()=>{
      if(IsexistWithTask==true){
      alert("This pothole already has an associated task.");
      return;
      }
      navigate('/pothole-task-form', { state: { ...location } });

console.log('Create Task for location ID:', location.id);

}  

  const confidenceColor = location.confidence > 0.9 ? '#10b981' :
    location.confidence > 0.7 ? '#eab308' : '#f97316';

  return (
    <div style={{

     width: '100%',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      borderRadius: '16px',
      overflow: 'hidden',
      backgroundColor: '#fff',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
      margin: '0'
    }}>
      
      {/* Full-width Image Container */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '180px',
        backgroundColor: '#f3f4f6',
        overflow: 'hidden'
      }}>
        <img
          src={location.imageUrl}
          alt="Pothole"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
        


        {/* Confidence Badge */}
        <div style={{
          position: 'absolute',
          bottom: '12px',
          left: '12px',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          color: '#fff',
          padding: '6px 12px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: confidenceColor
          }} />
          {(location.confidence * 100).toFixed(0)}% Confidence
        </div>
      </div>

      {/* Content Section */}
      <div style={{
        padding: '16px'
      }}>
        
        {/* Badge and Location */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '8px'
        }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '11px',
            fontWeight: '600',
            color: '#6b7280',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            <span>⚠️</span>
            Pothole
          </span>
          <span style={{
            fontSize: '11px',
            color: '#9ca3af'
          }}>
            {location.id}
          </span>
                  {/* Heart Icon (Favorites) */}
        <button 
          onClick={() => setIsFavorite(!isFavorite)}
          style={{
            position: 'absolute',
            right: '12px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            transition: 'background-color 0.2s',
            color: isFavorite ? '#ef4444' : '#9ca3af'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#fff'}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.9)'}
        >
          {isFavorite ? <i className="bi bi-card-checklist"></i> : <i style={{color:'blue'}} className="bi bi-card-checklist"></i>}
        </button>
        </div>

        {/* Title */}
        <h3 style={{
          margin: '0 0 8px 0',
          fontSize: '18px',
          fontWeight: '700',
          color: '#1f2937',
          lineHeight: '1.3'
        }}>
          Pothole Detected
        </h3>

        {/* Description */}
        <p style={{
          margin: '0 0 12px 0',
          fontSize: '13px',
          color: '#6b7280',
          lineHeight: '1.4'
        }}>
          {location.description}
        </p>

        {/* Info Row */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          marginBottom: '14px',
          fontSize: '13px',
          color: '#4b5563'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <span>📍</span>
            <span>{location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}</span>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <span>📅</span>
            <span>{location.timestamp}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{
        padding: '0 16px 16px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        
        {/* Primary Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            CreateTask();

          }}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#14b8a6',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#0d9488'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#14b8a6'}
        >
          🚩 Create Task
        </button>

  
        {/* <button
          onClick={copyCoords}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#f3f4f6',
            color: '#374151',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#e5e7eb'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#f3f4f6'}
        >
          {copied ? '✓ Copied!' : '📋 Copy Coordinates'}
        </button> */}
      </div>
    </div>
  );
}

// App Component
export default PotholePopup;