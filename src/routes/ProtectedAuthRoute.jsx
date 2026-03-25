import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { authContext } from '../contexts/AuthContext'

export default function ProtectedAuthRoute({children}) {
  const {userToken} = useContext(authContext)
  return (
    <>
    {!!userToken ?  <Navigate to={"/feed"} /> : children }
    </>
  )
}
