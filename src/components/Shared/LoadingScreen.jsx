import { Spinner } from '@heroui/react'
import React from 'react'

export default function LoadingScreen({profile}) {
  return (
    
        <div className="loading-screen fixed z-50 top-0 left-0 right-0 bottom-0 backdrop-blur-xs bg-black/10 ">
            <span className="rounded-2xl flex  bg-white p-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-medium text-sm">
              <Spinner size="sm" className="me-2" /> Refreshing your {profile}
            </span>
          </div>
    
  )
}
