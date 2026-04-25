# 🛣️ OnTheRoadDetection - Web Dashboard

> A React-based municipal dashboard featuring interactive GIS mapping to visualize real-time pothole detections and manage repair team dispatch workflows.

This repository contains the frontend client for the OnTheRoadDetection platform. Built with **React** and powered by **Vite**, it acts as the primary interface for municipal officers, consuming spatial data and AI hardware overlay metrics from the decoupled .NET backend.

## 🛠️ Technology Stack
* **Core Framework:** React, Vite
* **Mapping & GIS:** Leaflet, React-Leaflet, Turf.js (Spatial Analysis)
* **State & Routing:** React Router DOM
* **Styling & UI:** TailwindCSS, React-Bootstrap, Recharts
* **API Communication:** Axios (configured for HttpOnly cookies)

## ⚙️ Core System Mechanics & Architecture

The frontend is specifically engineered to handle complex spatial rendering and secure state management:

* **Geospatial Rendering (GIS):** Integrates Leaflet and Turf.js to plot coordinate data and district boundaries. Utilizes `react-leaflet-cluster` to ensure smooth UI performance even when rendering thousands of municipal data points simultaneously.
* **Secure Authentication Cycle:** Implements a robust JWT auth flow relying on **HttpOnly refresh cookies**. The application utilizes a custom Axios interceptor (`Api/PrivateAxios.jsx`) to seamlessly catch 401 errors, trigger the `GET /Account/Refresh-Token` endpoint, and retry failed requests without interrupting the user experience.
* **Reactive State Management:** Manages complex dashboard states (toggling between "Reported," "Dispatched," and "Repaired"), updating map markers and data tables reactively without requiring full page reloads.

## 💻 Running Locally

### 1. Installation
Ensure you have Node.js (LTS) installed, then clone the repository and install the dependencies:
```bash
git clone [https://github.com/MTM2025MT/OnTheRoadDetection.git](https://github.com/MTM2025MT/OnTheRoadDetection.git)
cd OnTheRoadDetection
npm install
2. Configure the Backend API
This frontend expects to communicate with the decoupled .NET backend.

By default, the API base URL is set to https://localhost:7099/.

If your backend is running on a different port or deployed to Azure, update the baseURL inside Api/PrivateAxios.jsx and src/Function.jsx.

3. Start the Development Server
Bash
npm run dev
🛠️ Additional Commands
Build for production: npm run build

Run ESLint: npm run lint

Note: The ASP.NET Core backend for this platform can be found here.


This perfectly captures your Vite setup, your security logic, and your spatial tools (like `turf.js`) while keeping that clean, scannable structure. 

With this done, your main internship portfolio projects are fully documented! Ar
