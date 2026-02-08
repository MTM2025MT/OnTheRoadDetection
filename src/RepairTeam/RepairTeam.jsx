import React from 'react'
import RepairTeamSidebar from './RepairTeamSidebar.jsx'
import TheTaskdetiles from './TheTaskComp.jsx'
import '../RepairTeam/TheTaskComp.css'
import { Outlet } from 'react-router-dom';
export default function RepairTeam() {


  return (
    <>
    <RepairTeamSidebar />
    <div className='RepairTeamContainer'>
      <Outlet /> 
    </div>

    </>
  )
}
