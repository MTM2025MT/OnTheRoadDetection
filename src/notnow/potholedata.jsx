// --- Configuration: Real Centers in Istanbul ---
const hubs = [
  { name: "Taksim", lat: 41.0370, lng: 28.9850 },
  { name: "Kadıköy", lat: 40.9900, lng: 29.0250 }, // Asian side
  { name: "Beşiktaş", lat: 41.0422, lng:29.0060 },
  { name: "Sultanahmet", lat: 41.0082, lng:28.9784 },
  { name: "Levent", lat: 41.0780,lng: 29.0120 },      // Business district
];

const severities = [
  { label: "High Severity", color: "red", desc: "Deep pothole, urgent repair needed." },
  { label: "Medium Severity", color: "orange", desc: "Surface cracking and uneven road." },
  { label: "Low Severity", color: "yellow", desc: "Minor cosmetic damage." }
];

// --- The Generator Function ---
const generateData = (count) => {
  const data = [];
  
  for (let i = 0; i < count; i++) {
    // 1. Pick a random hub (e.g., Kadikoy)
    const hub = hubs[Math.floor(Math.random() * hubs.length)];
    
    // 2. Create a random offset (scatter points within ~2km of the hub)
    // (Math.random() - 0.5) * 0.04 creates a range of roughly +/- 0.02 degrees
    const randomLat = hub.lat + (Math.random() - 0.5) * 0.03; 
    const randomLng = hub.lng + (Math.random() - 0.5) * 0.03;

    // 3. Pick a random severity
    const severity = severities[Math.floor(Math.random() * severities.length)];

    data.push({
      id: `report_${i + 1}`,
      street: `Near ${hub.name} Area #${i + 1}`, // Simulation of a street name
      label: severity.label,
      position: [randomLat, randomLng],
      color: severity.color,
      description: severity.desc,
      date: new Date().toISOString().split('T')[0] // Adds today's date
    });
  }
  return data;
};

// --- EXPORT THE 100 ITEMS ---
export const potholeData = generateData(100);

export default potholeData;