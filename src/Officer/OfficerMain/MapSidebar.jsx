import React, { useEffect, useState,useContext } from 'react';
import { X, AlertCircle, Sliders } from 'lucide-react';
import { PotholeContext } from "../ContextFolder/PotholeContext.jsx"; 
import { SlidersHorizontal } from 'lucide-react';
import {getPotholeByIdFunction} from '../../Function.jsx';
import './MapSidebar.css';
function SelectButtonComponent({ data = [], onSelect, dataName }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  
  const handleSelect = (item) => {
    setSelected(item);
    setIsOpen(false);
    onSelect?.(item.id);
  };

  const selectStyles = `
    :root {
      --primary-color: #14b8a6;
    }
    .SelectButtoncontainer {
      width: 100%;
      margin: 0;
    }

    .SelectButtondropdown-wrapper {
      position: relative;
      font-size: 16px;
    }

    .SelectButtondropdown-header {
      background: white;
      border: 2px solid #e0e0e0;
      padding: 0.5em 1.25em;
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 13px;
      font-weight: 500;
      color: #333;
      transition: all 0.3s ease;
      user-select: none;
      width: 100%;
    }

    .SelectButtondropdown-header:hover {
      border-color: var(--primary-color);
      box-shadow: 0 4px 12px rgba(20, 184, 166, 0.2);
    }

    .SelectButtondropdown-header.active {
      border-color: var(--primary-color);
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      box-shadow: 0 4px 12px rgba(20, 184, 166, 0.2);
    }

    .SelectButtondropdown-icon {
      transition: transform 0.3s ease;
      color: var(--primary-color);
      font-size: 12px;
    }

    .SelectButtondropdown-icon.active {
      transform: rotate(180deg);
    }

    .SelectButtondropdown-menu {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: white;
      border-top: none;
      border-radius: 0 0 8px 8px;
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease;
      box-shadow: 0 8px 24px rgba(20, 184, 166, 0.15);
      z-index: 1060;
    }

    .SelectButtondropdown-menu.active {
      max-height: 200px;
      overflow-y: auto;
      border: 2px solid var(--primary-color);
    }

    .SelectButtondropdown-item {
      padding: 0.5em 1.25em;
      color: #555;
      cursor: pointer;
      transition: all 0.2s ease;
      border-left: 4px solid transparent;
      font-size: 13px;
    }

    .SelectButtondropdown-item:hover {
      background: #e0f2f1;
      color: var(--primary-color);
      border-left-color: var(--primary-color);
      padding-left: 24px;
    }

    .SelectButtondropdown-item.selected {
      background: #f5f7ff;
      color: var(--primary-color);
      font-weight: 600;
      border-left-color: var(--primary-color);
      padding-left: 24px;
    }
  `;

  return (
    <>
      <style>{selectStyles}</style>
      <div className="SelectButtoncontainer">
        <div className="SelectButtondropdown-wrapper">
          <div
            onClick={() => setIsOpen(!isOpen)}
            className={`SelectButtondropdown-header ${isOpen ? 'active' : ''}`}
          >
            <span>{selected?.name || dataName}</span>
            <div className={`SelectButtondropdown-icon ${isOpen ? 'active' : ''}`}>▼</div>
          </div>

          <div className={`SelectButtondropdown-menu ${isOpen ? 'active' : ''}`}>
            {data && data.length > 0 ? (
              data
                .sort((a, b) => (a.name > b.name ? 1 : -1))
                .map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    className={`SelectButtondropdown-item ${selected?.id === item.id ? 'selected' : ''}`}
                  >
                    {item.name}
                  </div>
                ))
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}



export default function MapSidebar({
  // Data props
  districts = [],
  handleSelectChange = () => {},
  setActiveNeighborhood = () => {},
  setActiveLocation = () => {}
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNeighborhoods, setSelectedNeighborhoods] = useState(null);
  const [selectedPothole, setSelectedPothole] = useState([]);
  const {getNeigberhoodsByDistrict,loadDistricts, getPotholeByNeighborhood,getPotholeByDistrict,getNeighborhoodById} = useContext(PotholeContext);
  useEffect(() => {
    loadDistricts();
  }, [loadDistricts]);
  const handleClose = () => {
    setIsOpen(false);
  };
  
  // Handle District Selection
  const handleDistrictSelect = async (districtId) => {
    try {
      handleSelectChange(districtId);
      // Reset the border neighborhood and pothole selections
      setActiveNeighborhood(null);
      setSelectedPothole([]);
      
      // Get neighborhoods for the selected district
      const neighborhoods = await getNeigberhoodsByDistrict(districtId);
      if (neighborhoods) {
        setSelectedNeighborhoods(neighborhoods);
        
      }
      
      // Get potholes for the selected district
      const potholes = await getPotholeByDistrict(districtId);
      if (potholes) {
        setSelectedPothole(potholes);
      } else {
        setSelectedPothole([]);
      }
    } catch (error) {
      console.error('Error selecting district:', error);
      setSelectedPothole([]);
    }
  };

  // Handle Neighborhood Selection
  const handleNeighborhoodSelect = async (neighborhoodId) => {
    try {
      setActiveNeighborhood(null);
      
      // Get potholes for the selected neighborhood
      const potholes = await getPotholeByNeighborhood(neighborhoodId);
      if (potholes) {
        setSelectedPothole(potholes);
      } else {
        setSelectedPothole([]);
      }
      
      // Get neighborhood details
      const neighborhood = await getNeighborhoodById(neighborhoodId);
      if (neighborhood) {
        setActiveNeighborhood(neighborhood);
        setActiveLocation({
          name: neighborhood.name,
          position: [Number(neighborhood.centerLatitude), Number(neighborhood.centerLongitude)],
          zoom: 14,
        });
      }
    } catch (error) {
      console.error('Error selecting neighborhood:', error);
      setSelectedPothole([]);
    }
  };

  // Handle Pothole Click
  const handlePotholeClick = async (potholeId) => {
    try {
      const pothole = await getPotholeByIdFunction(potholeId);
      if (pothole) {
        
        setActiveLocation({
          name: pothole.name,
          position: [Number(pothole.latitude), Number(pothole.longitude)],
          zoom: 16,
        });
      }
    } catch (error) {
      console.error('Error getting pothole details:', error);
    }
  };

  // Handle Filter
  const handleFilter = () => {
    handleSelectChange(null);
    setActiveNeighborhood(null);
    setSelectedNeighborhoods(null);
    setSelectedPothole([]);
    handleClose();
  };

  const severityClass = (severity) => `severity-${severity}`;

  return (
    <div className="pothole-nav-container">

      {/* Toggle Button */}
      <div 
        className="toggle-nav-btn"
        onClick={() => setIsOpen(!isOpen)}
        title="Toggle Navigation"
      >

        <SlidersHorizontal size={20} />
        <span>Navigation</span>
      </div>

      {/* Backdrop */}
      <div 
        className={`nav-backdrop ${isOpen ? 'active' : ''}`}
        onClick={() => handleClose()}
      />

      {/* Side Navigation Panel */}
      <div className={`side-nav-panel ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="nav-header">
          <div className="nav-header-content">
            <h2>Road Issues</h2>
            <p>Manage potholes and issues</p>
          </div>
          <button 
            className="nav-close-btn"
            onClick={handleClose}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="nav-content">
          {/* District Selection */}
          <div className="select-section">
            <label className="select-label">District</label>
            <SelectButtonComponent
              data={districts}
              onSelect={handleDistrictSelect}
              dataName="Select District"
            />
          </div>

          {/* Neighborhood Selection */}
          {selectedNeighborhoods && selectedNeighborhoods.length > 0 && (
            <div className="select-section">
              <label className="select-label">Neighborhood</label>
              <SelectButtonComponent
                data={selectedNeighborhoods}
                onSelect={handleNeighborhoodSelect}
                dataName="Select Neighborhood"
              />
            </div>
          )}

          {/* Potholes Section */}
          <div className="potholes-section">
            <label className="potholes-header">Issues Found</label>
            {!selectedPothole || selectedPothole.length === 0 ? (
              <div className="empty-state">
                <AlertCircle className="empty-state-icon" />
                <p className="empty-state-text">No issues found</p>
              </div>
            ) : (
              <div className="potholes-list">
                {selectedPothole.map(pothole => (
                  <div
                    key={pothole.id}
                    className={`pothole-item ${severityClass(pothole.levelOfSeverity)}`}
                    onClick={() => handlePotholeClick(pothole.id)}
                  >
                    <div className="pothole-item-name">{pothole.name}</div>
                    <div className="pothole-item-desc">{pothole.description}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Filter Button */}
        <div style={{ padding: '0 20px 20px' }}>
          <button className="filter-btn" onClick={handleFilter}>
            <Sliders size={16} />
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
}
