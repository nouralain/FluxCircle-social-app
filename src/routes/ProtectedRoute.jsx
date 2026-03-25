import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { authContext } from '../contexts/AuthContext'

export default function ProtectedRoute({children}) {
  const {userToken} = useContext(authContext)
    
  return (
    <>
        {!!userToken ? children : <Navigate to={"/"}/>}
    </>
  )
}
