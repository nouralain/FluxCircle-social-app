
 
    export function timeAgo(postDate) {
  const now = new Date()
  const post = new Date(postDate)
  const diff = now - post 

  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (seconds < 60) return `${seconds}s`
  if (minutes < 60) return `${minutes}m`
  if (hours < 24) return `${hours}h`
  else return `${days}d`
  
  
}

export function formatDate(dateString) {
  const date= new Date(dateString)
 
  return  date.toLocaleString("en-US",{
    month:"short",
    day:"numeric",
    hour:"2-digit",
    minute:"2-digit"
  })
}
