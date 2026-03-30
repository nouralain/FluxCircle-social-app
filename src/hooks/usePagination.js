import { useEffect, useState } from 'react'

export default function usePagination(data, dataKey,page) {
  const [items, setItems] = useState([])

  useEffect(() => {
    if (data?.[dataKey]) {
      if (page === 1) {
        setItems(data[dataKey])
      } else {
        setItems((prev) => [...prev, ...data[dataKey]])
      }
    }
  }, [data])

  return { items }
}