
export default function Icon({color , size , children}) {
  return (
    <span className={`${color} ${size} flex items-center justify-center`}>{children}</span>
  )
}
