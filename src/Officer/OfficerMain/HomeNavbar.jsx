import React, { useEffect } from 'react'
import { PotholeContext } from "../ContextFolder/PotholeContext.jsx";
import {useState, useContext } from 'react';
import {getPotholeByIdFunction} from '../../Function.jsx';
import SelectButtonComponent from './SelectButtonCompnent.jsx'

export default function HomeNavbar({districts,handleSelectChange,setActiveNeighborhood,setActiveLocation}) {

    const {getNeigberhoodsByDistrict,loadDistricts, getPotholeByNeighborhood,getPotholeByDistrict,getNeighborhoodById} = useContext(PotholeContext);
    //that array is mapped from the level of pothole severity to set the background 
    // color of each pothole item in the navbar
     useEffect(() => {
      loadDistricts();
    }, [loadDistricts]);
    const [selectedNeighborhoods, setSelectedNeighborhoods] = useState(null);
    const [selectedPothole, setSelectedPothole] = useState([]);
  
    const colorBtnSyle=[
      {backgroundColor:'#F2D972', color:'yellow'}, 
      {backgroundColor:'#F29B38', color:'orange'},
        {backgroundColor:'#E05454', color:'red'},
        {backgroundColor:'#d02727ff', color:'darkred'}
      //#F6C945 #F2D972  red   #E05454 #C73F3F orange #F29B38 #D9812C
    ]
     const Filter=()=>{
      handleSelectChange(null);
      setActiveNeighborhood(null);
      setSelectedNeighborhoods(null);
      //console.log('Filter button clicked');
     }
     const HandleSelectChange=async(districtId)=>{
      handleSelectChange(districtId);
      let res= await getNeigberhoodsByDistrict(districtId);
      //console.log('neighborhoods by district:', res);
      if(res){
        setSelectedNeighborhoods(res);
        setActiveNeighborhood(null);
      }
      let res2= await getPotholeByDistrict(districtId);
      if(res2){
         //console.log('Potholes by district:', res2);
        setSelectedPothole(res2);
      }
     else{
        setSelectedPothole([]);
      }
      //console.log('Neighborhoods by district:', res);
    

    }

    const HandleSelectChangeForNeighborhood=async(neighborhoodId)=>{
      
      let res= await getPotholeByNeighborhood(neighborhoodId);
      if(res){
        //console.log('Potholes by neighborhood:', res);
        setSelectedPothole(res);
      }
      else{
        setSelectedPothole([]);
      }
      let neighborhood= await getNeighborhoodById(neighborhoodId);

      setActiveLocation({
        name: neighborhood.name,
        position: [Number(neighborhood.centerLatitude), Number(neighborhood.centerLongitude)],
        zoom: 14,
       });
        setActiveNeighborhood(neighborhood);
      //console.log('Potholes by neighborhood:', res);
    }
    const moveToPotholeLocation=async(potholeId)=>{
      let pothole= await getPotholeByIdFunction(potholeId);
      setActiveLocation({
        name: pothole.name,
        position: [Number(pothole.latitude), Number(pothole.longitude)],
        zoom: 16,
       });
    }

  return (
    <div  className="p-3 m-0 border-0 bd-example m-0 border-0">
      <nav style={{height:'10% !important'}} className="navbar navbar-dark bg-dark fixed-top" >
        <div style={{height:'7vh'}} className="container-fluid">
          <a className="navbar-brand" href="#">Offcanvas dark navbar</a>
          
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="offcanvas" 
            data-bs-target="#offcanvasDarkNavbar" 
            aria-controls="offcanvasDarkNavbar" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div 
            className="offcanvas offcanvas-end text-bg-dark" 
            tabIndex="-1" 
            id="offcanvasDarkNavbar" 
            aria-labelledby="offcanvasDarkNavbarLabel" 
            style={{ width: '20%' }}
           data-bs-backdrop="false"
          data-bs-scroll="true"
           
          >
            
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Dark offcanvas</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
  

            <div className="offcanvas-body">
            
             <SelectButtonComponent data={districts} onSelect={HandleSelectChange}  dataName='districts'/>  
            { selectedNeighborhoods==null?null: <SelectButtonComponent data={selectedNeighborhoods} onSelect={HandleSelectChangeForNeighborhood}  dataName='Neighborhoods'/>  }
               <ul className="navbar-nav mt-3 SideLevelBtnList">
                {
                  selectedPothole == null ? (
                    <li className="nav-item">
                      <div className='name'>No Potholes Found</div>
                    </li>
                  ) :
                selectedPothole.map((pothole) => (
                      <li onClick={()=>moveToPotholeLocation(pothole.id)} className="SideLevelBtn nav-item" style={{backgroundColor:colorBtnSyle[pothole.levelOfSeverity].backgroundColor}} key={pothole.id} >
                        <div className='name'>{pothole.name}</div>
                        <p>{pothole.description}</p>
                      </li>
                    ))
                }
                </ul> 
                <button className='Filter-btn' onClick={()=>Filter()}  aria-label="Filter">Filter</button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
