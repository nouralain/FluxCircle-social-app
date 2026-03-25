import React from 'react'

export default function MobileScreen({size}) {
  return (
    <div className={`relative ${size}  rounded-4xl border-4 border-[#D9DAE3]`}>
  {/* notch */}
  <div className="absolute top-1 left-1/4 w-1/2 h-5 bg-[#D9DAE3] rounded-b-xl"></div>

</div>
  )
}
