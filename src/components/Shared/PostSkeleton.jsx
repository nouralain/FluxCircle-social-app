import { Skeleton } from '@heroui/react'
import React from 'react'

export default function PostSkeleton() {
  return (
    <>
     <div className=" w-full rounded-2xl border border-gray-200 p-4 bg-white mt-4">
      <div className=" flex items-center gap-3">
        <div>
        <Skeleton className="flex rounded-full w-12 h-12" />
      </div>
      <div className="w-full flex flex-col gap-2">
        <Skeleton className="h-4 w-3/5 rounded-lg" />
        <Skeleton className="h-3 w-4/5 rounded-lg" />
      </div>
      </div>
      <Skeleton className="h-4 w-full rounded-md mt-4" />
      <Skeleton className="h-4 w-2/3 rounded-md mt-2" />
    </div>
     <div className=" w-full rounded-2xl border border-gray-200 p-4 bg-white mt-4">
      <div className=" flex items-center gap-3">
        <div>
        <Skeleton className="flex rounded-full w-12 h-12" />
      </div>
      <div className="w-full flex flex-col gap-2">
        <Skeleton className="h-4 w-3/5 rounded-lg" />
        <Skeleton className="h-3 w-4/5 rounded-lg" />
      </div>
      </div>
      <Skeleton className="h-4 w-full rounded-md mt-4" />
      <Skeleton className="h-4 w-2/3 rounded-md mt-2" />
    </div>
    </>
   
  )
}
