

export default function InfoCard({icon , header , paragraph,afterColor }) {
  return (
    <div className={`bg-white rounded-2xl p-7 text-start border  border-gray-200 relative overflow-hidden ${afterColor} after:absolute after:size-36 after:-top-18 after:-right-18 after:rounded-full`}>
        {icon}

        <h3 className='text-xl font-semibold my-4'>{header}</h3>
        <p className='text-[#5e617a] text-base'>{paragraph}</p>
    </div>
  )
}
