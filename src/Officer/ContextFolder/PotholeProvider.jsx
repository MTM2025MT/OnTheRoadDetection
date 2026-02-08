import { useState, useEffect,useCallback } from "react";
import { PotholeContext } from "./PotholeContext";
import {getByBounds} from "../../Function";
import {getAllDistricts,getPotholeByNeighborhoodfunction,
  getDistritcByIdFunction,getPotholeByDistricts,
  getNeigberhoodsByDistrictFunction ,getNeighborhoodByIdFunction} from "../../Function"; 
export default function PotholeProvider({ children }) {
  const [potholes, setPotholes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [districts, setDistricts] = useState([]);
  const [count, setCount] = useState(0); 
  // Load data on first render
  
  const loadPotholesByBounds =useCallback( async (bounds) => {
    const firstbounds = {
    getSouthWest: () => ({ lat: 41.000, lng: 28.95 }),
    getNorthEast: () => ({ lat: 41.070, lng: 29.08 })
    };
    try {
       if(!bounds){
        bounds = firstbounds;
       }
      setLoading(true);
      ////console.log("Loading potholes for bounds:", bounds);
        const res = await getByBounds(bounds);
        console.log("potholes fetched by bounds:", bounds);
        console.log("Potholes loaded:", res);
        setPotholes(res);
    } finally {
        setLoading(false);
    }
  }, []);
   const loadDistricts = useCallback(async () => {
    try {
      setLoading(true);
        const res = await getAllDistricts();
        setDistricts(res);
    } finally {
        setLoading(false);
    }
   }, []);
    const getdistritcById = useCallback(async (id) => {
    try {
      setLoading(true);
        const res = await getDistritcByIdFunction(id);
        return res;
    } finally {
        setLoading(false);
    } 
    }, []);
    const getPotholeByDistrict = useCallback(async (id) => {
    try {
      setLoading(true);
        const res = await  getPotholeByDistricts(id);
        ////console.log("Potholes by district loaded:", res);
        return res;
    } finally {
        setLoading(false);
    }
    }, []);
    const getNeigberhoodsByDistrict = useCallback(async (id) => {
    try {
      setLoading(true);
        const res = await getNeigberhoodsByDistrictFunction(id);
        
        return res;
    } finally {
        setLoading(false);
    }
    }, []);
    const getPotholeByNeighborhood = useCallback(async (id) => {
    try {
      setLoading(true);
        const res = await getPotholeByNeighborhoodfunction(id);
        //console.log("Potholes by neighborhood loaded:", res);
        return res;
    }
      finally {
        setLoading(false);
    }
    }, []);
    const getNeighborhoodById = useCallback(async (id) => {
    try {
      setLoading(true);
        const res = await getNeighborhoodByIdFunction(id);
        return res;
    } finally {
        setLoading(false);
    }
    }, [])
  useEffect(() => {
    const functionToRunOnce = async () => {

      setCount(e=>e+1);
    }
    functionToRunOnce();
  }, []);
 
  // CRUD functions update context state

//   const editPothole = async (id, item) => {
//     const res = await updatePothole(id, item);
//     setPotholes((prev) => prev.map((p) => (p.id === id ? res.data : p)));
//   };

//   const removePothole = async (id) => {
//     await deletePothole(id);
//     setPotholes((prev) => prev.filter((p) => p.id !== id));
//   };

  return (
    <PotholeContext.Provider
      value={{
        potholes,
        loading,
        loadPotholesByBounds,
        loadDistricts,
        districts,
        getdistritcById,
        count,
        getPotholeByDistrict,
        getNeigberhoodsByDistrict,
        getPotholeByNeighborhood
        ,getNeighborhoodById
      }}
    >
      {children}
    </PotholeContext.Provider>
  );
}
