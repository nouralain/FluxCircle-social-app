import React from 'react'
import screen from "../../assets/Screenshot 2026-03-26 002420.png"
export default function MobileScreen({size}) {
  return (
    <div className={`relative ${size}  rounded-4xl border-4 border-[#D9DAE3] overflow-hidden`}>
      <img src={screen} alt="Screen" />
  {/* notch */}
  <div className="absolute top-1 left-1/4 w-1/2 h-5 bg-[#D9DAE3] rounded-b-xl">

  </div>

</div>
  )
}
