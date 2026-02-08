import React, { useState, useEffect, useContext, useRef } from 'react';
import { useMapEvents } from 'react-leaflet';
import { PotholeContext } from "../ContextFolder/PotholeContext";

export default function MapEvents({ setBounds, setPointsOfTarget,TaskMode }) {
  // We use this to check if we need to download new data
  const [loadedBounds, setLoadedBounds] = useState(null);
  const { loadPotholesByBounds } = useContext(PotholeContext);
  
  // REFS: These act as our "Safety Timer" to stop the infinite loop
  const debounceTimer = useRef(null);
  const hasInitialized = useRef(false);

  const map = useMapEvents({
    // 1. UI FIX: Close popup only when YOU start dragging/zooming
    dragstart: () => {
      map.closePopup(); 
    },
    zoomstart: () => { // Fixed name (was "ZoomIn")
      map.closePopup(); 
    },

    // 2. LOGIC FIX: The Debounce (The "Brakes")
    moveend: () => {
      // Clear any pending updates so we don't fire twice
      if (debounceTimer.current) clearTimeout(debounceTimer.current);

      // Wait 200ms after movement stops before updating React.
      // This allows the "Auto-Pan" animation to finish, preventing the crash.
      debounceTimer.current = setTimeout(() => {
        
        const currentView = map.getBounds();
        
        // Check if we actually need new data
        if (loadedBounds === null || !loadedBounds.contains(currentView)) {
          
          // Create the new search area
          const newExpandedBounds = currentView.pad(0.5);
          
          // CRITICAL: Use the variable 'newExpandedBounds' directly!
          // Do NOT use state variables here.
          loadPotholesByBounds(newExpandedBounds);
          
          // Now update the state for next time
          setLoadedBounds(newExpandedBounds);
          console.log('Fetching new data for:', newExpandedBounds);
        }

        // Update parent component
        setBounds(currentView);
        
      }, 200); // 200ms delay
    },
   
    click(e) {
      if(!TaskMode) return;
      const { lat, lng } = e.latlng; 
      let max = 1000000;
      let min = 1;
      const id = Math.floor(Math.random() * (max - min + 1)) + min; // Generate a random ID
      const newWaypoints = [ { lat, lng,id }];
      setPointsOfTarget(prevArr=>[...prevArr, ...newWaypoints]);
    }
  });

  // 3. INITIALIZATION FIX
  useEffect(() => {
    if (map && !hasInitialized.current) {
      // Use setTimeout to push this to the end of the render queue
      // This stops the "State update during render" warning
      setTimeout(() => {
        const startBounds = map.getBounds().pad(0.5);
        
        loadPotholesByBounds(startBounds);
        setLoadedBounds(startBounds);
        setBounds(map.getBounds());
        
        console.log('Map initialized');
        hasInitialized.current = true;
      }, 100);
    }
  }, [map, loadPotholesByBounds, setBounds]);

  return null;
}