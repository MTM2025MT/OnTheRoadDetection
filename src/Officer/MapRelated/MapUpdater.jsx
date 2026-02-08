import { useMap } from 'react-leaflet';
import { useEffect } from 'react';
// This component doesn't render anything visually
// It just "talks" to the map
export default function MapUpdater({ center, zoom }) {
  const map = useMap();

  useEffect(() => {
    if (!center || zoom === undefined) return;
    if (Array.isArray(center) && (center[0] === undefined || center[1] === undefined)) return;
    map.stop();
    map.closePopup();
    // flyTo creates a smooth animation. 
    // You can use map.setView() if you want it instant.
    map.setView(center, zoom); 
  }, [center, zoom, map]); // Run this whenever center or zoom changes

  return null;
}