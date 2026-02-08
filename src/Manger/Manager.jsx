import React from 'react'
import Navbar from './Navbar.jsx'
import EmployeeList from './EmployeeList.jsx'
import { Outlet } from 'react-router-dom'
export default function Manager() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}
