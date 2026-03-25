import React from 'react'
import { Outlet } from 'react-router-dom'
import AppNavbar from '../components/Navbar/AppNavbar'

export default function AuthLayout() {
  return (
    <>
     <AppNavbar />
    <Outlet />
    
    </>
  )
}
