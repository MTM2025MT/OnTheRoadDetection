import React from 'react'
import Navbar from '../Navbar/Navbar.jsx';
import { Outlet, useLocation } from 'react-router-dom';
function Officer() {
  const location = useLocation();
  const isMainMapRoute = location.pathname.includes('MainMap');
  
  return (
    <>
      {!isMainMapRoute && <Navbar />}
      <Outlet />
    </>
  )
}

export default Officer