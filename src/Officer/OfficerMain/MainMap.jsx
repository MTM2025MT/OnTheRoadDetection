

import {useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup,GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { Icon, divIcon, point } from 'leaflet';
import { useState } from 'react';

import MapUpdater from '../MapRelated/MapUpdater.jsx';
import MapEvents from '../MapRelated/Mapevents.jsx';
import {YellowCustomIcon,RedCustomIcon,OrangeCustomIcon,BlackCustomIcon} from '../MapRelated/MarkersIcon.jsx';
import { useContext } from 'react';
import { PotholeContext } from "../ContextFolder/PotholeContext.jsx";
import HomeNavbar from './HomeNavbar.jsx';
import PotholePopup from '../MapRelated/PotholePopup.jsx';
import Navbar from '../../Manger/Navbar.jsx'
import RoadInspectionTaskCreator from '../RoadInspectionTaskCreator.jsx';
import MapSidebar from './MapSidebar.jsx';

import './Home.css'
import { useNavigate } from 'react-router-dom';
export default function MainMap() {

  const {potholes,districts,getdistritcById} = useContext(PotholeContext);
  const [bounds, setBounds] = useState(null);
  const [activeDistrict, setActiveDistrict] = useState(null);
  const [activeNeighborhood, setActiveNeighborhood] = useState(null);
  const [PointsOfTarget, setPointsOfTarget] = useState([]); 
   const [TaskMode, setTaskMode] = useState(false);
 // Filter potholes based on current map bounds
  const Navigator=useNavigate();
const visibleMarkers = useMemo(() => {
  
  if (!bounds || !potholes) return [];
  return potholes.filter(marker =>
    bounds.pad(0.3).contains([
      Number(marker.latitude),
      Number(marker.longitude)
    ])
  );
}, [bounds, potholes]);


    //cluster icon function
    const createcustomclustorIcon=(cluster) =>{
      return divIcon({
        html:`<div class="custom-cluster-icon">${cluster.getChildCount()}</div>`,
        className:'custom-cluster-icon-container',
        iconSize:point(30,30,true )
      })
    }

        // this active location state to center the map on selected district
        //or reset to default when no district is selected
        // or neighborhood is selected
       const [activeLocation, setActiveLocation] = useState({
        name: 'Istanbul',
        position: [41.0082, 28.9784],
        zoom: 13,
       });

       // handle district selection change
      const handleSelectChange = async (districtId) => {
        let Fulldistrict =await getdistritcById(districtId);
        if (Fulldistrict!== null) {
        setActiveDistrict(Fulldistrict);
        
        var district=districts.find(d=>d.id==districtId);
        const districtData = {
          name: district.name,
          position: [Number(district.centerLatitude), Number(district.centerLongitude)],
          zoom: 11,
        };
        setActiveLocation(districtData);
      } else {
        setActiveDistrict(null);
        setActiveLocation({
          name: 'Istanbul',
          position: [41.0082, 28.9784],
          zoom: 13,
        });
      }
      };

      //style for district and neighborhood geojson
      const districtStyle = {
          color: "red",       // The color of the border line
          weight: 3,          // Thickness of the line
          fillColor: "blue",  // Color inside the district
          fillOpacity: 0.1    // Transparency (0 is invisible, 1 is solid)
       };
      const  NeighborhoodStyle = {
    color: "blue",       // The color of the border line
    weight: 3,          // Thickness of the line
    fillColor: "red",  // Color inside the neighborhood
    fillOpacity: 0.1    // Transparency (0 is invisible, 1 is solid)
  };
  return (
    // 1. Changed body to div
    <div style={{width:'100%'}}>
      <button className='HomeButtonMap'  onClick={()=>Navigator('/officer')}><i class="bi bi-house"></i></button>
      <div className='MapNavbar' style={{position:'fixed ', zIndex:1000, }}>
        <ul className='ListMapNavbar'>
          <li>Pothole</li>
          <li>Road sign</li>
          <li>360</li>
        </ul>
        </div>
     <MapSidebar 
          districts={districts} 
          potholes={potholes} 
          handleSelectChange={handleSelectChange}
          setActiveDistrict={setActiveDistrict} 
          setActiveNeighborhood={setActiveNeighborhood}
          setActiveLocation={setActiveLocation}
        />

              <MapContainer 
                center={[41.0082, 28.9784]} // Coordinates for Istanbul
                zoom={13} 
                scrollWheelZoom="center"
                className="leaflet-container"
                style={{width:'100%', position:'absolute', bottom:'0',height:'100vh'}}
              >
                {/* OpenStreetMap Tile Layer  here is the part when we decided to change the map provider */}
                {/* <TileLayer  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>         */}
                 {/* <TileLayer attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'  url="https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.jpg" />    */}
                       {/* <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        /> */}
               <TileLayer
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
          maxZoom={19}
        />
              
                  {/* Update map view when activeLocation changes */}
                 <MapUpdater  center={activeLocation.position} zoom={activeLocation.zoom} />
                  {/* Listen to map events to update bounds */}
                 <MapEvents TaskMode={TaskMode} setPointsOfTarget={setPointsOfTarget} setBounds={setBounds} />
                  <MarkerClusterGroup
                      chunkedLoading={true}
                      showCoverageOnHover={false}
                      iconCreateFunction={createcustomclustorIcon}
                      maxClusterRadius={30}
                      disableClusteringAtZoom={15}
                 >
                {visibleMarkers.map((location) => {
                      let iconToUse;
                      if (location.levelOfSeverity === 0) {
                          iconToUse = YellowCustomIcon;
                      } else if (location.levelOfSeverity === 1) {
                          iconToUse = OrangeCustomIcon;
                      } else if (location.levelOfSeverity === 2 || location.levelOfSeverity === 3) {
                          iconToUse = RedCustomIcon;
                      }
                      let position = [Number(location.latitude), Number(location.longitude)];     
          
                        return(

                        <Marker 
                            key={location.id} 
                            position={position}
                            icon={iconToUse}
                          >
                              {/* <Popup>
                                  <div style={{display:'flex'}}>
                                    <img
                                      src={location.imageUrl}
                                      alt="Location"
                                      style={{ width: '50%', height: 'auto', marginTop: '10px' }}
                                    />
                                    <div style={{marginLeft:'10px'}}>
                                        <h6>street name </h6>
                                        <hr/>
                                      <em>{location.description}</em>
                                    </div>
                                  </div>
                              </Popup> */}
                            <Popup key={location.id*99}>
                                <PotholePopup location={{
                                  id: location.id,
                                  latitude: location.latitude,
                                  longitude: location.longitude,
                                  imageUrl: location.imageUrl,
                                  street: location.street_name || "Unknown Street",
                                  description: location.description || "Detected Issue",
                                  confidence: location.confidence,
                                  timestamp: new Date(location.ReportedAt).toLocaleDateString(),
                                  levelOfSeverity:  location.levelOfSeverity
                                }} />
                                </Popup>
                          </Marker> 
                          )
                        }) }
                    </MarkerClusterGroup>
                        {
                      PointsOfTarget.map((point) => (
                        <Marker 
                            key={point.id} 
                            position={[point.lat, point.lng]}
                            icon={BlackCustomIcon}
                            // icon={divIcon({
                            //   html: `<div style="background-color: black; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white;"></div>`,
                            //   className: '',
                            //   iconSize: point(16, 16, true)
                            // })}
                          >
                          </Marker> 
                      ))
                        }

          {activeDistrict && activeDistrict.geometry ? (
            <GeoJSON 
              key={activeDistrict.id}         // Forces a re-draw when you click a different district
              data={activeDistrict.geometry}  // Pass the valid inner object, not the whole thing
              style={districtStyle} 
            />
          ) : null}
          {activeNeighborhood && activeNeighborhood.geometry ? (
            <GeoJSON 
              key={activeNeighborhood.id}         // Forces a re-draw when you click a different neighborhood
              data={activeNeighborhood.geometry}  // Pass the valid inner object, not the whole thing
              style={NeighborhoodStyle} 
            />
          ) : null}
        </MapContainer>
      


         <RoadInspectionTaskCreator TaskMode={TaskMode} setTaskMode={setTaskMode} mapPins={PointsOfTarget} setMapPins={setPointsOfTarget}/> 
    </div>
  )
}