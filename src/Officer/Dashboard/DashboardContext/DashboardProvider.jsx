import React, {  useState, useEffect, useCallback } from 'react';
import useAxiosPrivate from "../../../hooks/useAxiosPrivate.jsx";
import { DashboardContext } from "./DashboardContext.jsx";

export default function DashboardProvider({ children }) {
  const [potholeData, setPotholeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  // We use useCallback so this function reference stays stable
  const refreshData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosPrivate.get('/pothole/DashboardPotholeData');
      console.log("Dashboard Data Fetched:", response.data);
      setPotholeData(response.data);
    } catch (error) {
      console.error("Failed to fetch dashboard data", error);
    } finally {
      setLoading(false);
    }
  }, [axiosPrivate]);

  // Optionally fetch on mount
  useEffect(() => {
    refreshData();
  }, [refreshData]);

  return (
    <DashboardContext.Provider value={{ potholeData, loading, refreshData }}>
      {children}
    </DashboardContext.Provider>
  );
}