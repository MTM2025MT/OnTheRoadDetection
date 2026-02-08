import React, { useEffect } from "react";
import { MapContainer, TileLayer, Polyline, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Helper component to auto-zoom the mini map to fit the route
function FitBounds({ routeData }) {
  const map = useMap();
  
  useEffect(() => {
    if (routeData && routeData.length > 0) {
      // Calculate bounds for the route line
      map.fitBounds(routeData, { padding: [20, 20] });
    }
  }, [routeData, map]);
  
  return null;
}

export default function MiniMapPreview({ routeData }) {
  return (
    <div style={{ height: "200px", width: "100%", borderRadius: "8px", overflow: "hidden", border: "1px solid #ccc" }}>
      {/* A second independent MapContainer */}
      <MapContainer 
        center={[0, 0]} 
        zoom={2} 
        zoomControl={false} // Hide zoom buttons for cleaner look
        dragging={false}    // Optional: make it static
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        
        {/* Draw the same route here */}
        {routeData.length > 0 && (
          <>
            <Polyline positions={routeData} color="red" weight={3} />
            <FitBounds routeData={routeData} />
          </>
        )}
      </MapContainer>
    </div>
  );
}