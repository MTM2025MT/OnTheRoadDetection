import React, { useState, useEffect } from 'react'; // Import hooks
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAllPotholes } from './Function.jsx';

export default function ShowingPothole() {
    // 1. Create state to hold the list. Initialize as empty array [].
    const [potholes, setPotholes] = useState([]);

    // 2. Use useEffect to fetch data when component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Wait for the data to come back from the function
                const data = await getAllPotholes(); 
                
                // Ensure data is actually an array before setting it
                if (Array.isArray(data)) {
                    const filteredData = data.filter(p => p.id>350); // Optional: filter out any null entries
                    setPotholes(filteredData);
                } else {
                    console.error("Data received is not an array:", data);
                }
            } catch (error) {
                console.error("Error fetching potholes:", error);
            }
        };

        fetchData();
    }, []); // Empty dependency array means this runs once on load

    return (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
            {/* Because we initialized potholes as [], this .map 
               wont run until the data actually arrives, preventing the crash.
            */}
            {potholes.map((pothole) => (
                // Note: In React, use className instead of class
                <div className="card" style={{ width: "18rem" }} key={pothole.id}>
                    <img src={pothole.imageUrl} className="card-img-top" alt="Pothole Image" />
                    <div className="card-body">
                        <h5 className="card-title">Pothole ID: {pothole.id}</h5>
                        <p className="card-text">Location: {pothole.location}</p>
                        {/* Accessing properties based on your data example */}
                        <p className="card-text">Severity: {pothole.levelOfSeverity || pothole.severity}</p> 
                        <p className="card-text">
                            Reported At: {pothole.reportedAt ? new Date(pothole.reportedAt).toLocaleDateString() : 'N/A'}
                        </p>
                        <p className="card-text">Description: {pothole.description}</p>
                        <p className="latitude">Latitude: {pothole.latitude}</p>
                        <p className="longitude">Longitude: {pothole.longitude}</p>
                        <a href="#" className="btn btn-primary">View Details</a>
                    </div>
                </div>
            ))}
        </div>
    );
}