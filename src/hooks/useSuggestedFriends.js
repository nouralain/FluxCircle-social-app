import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { followSuggestions } from '../api/auth.api'

export default function useSuggestedFriends() {
    const {data: suggestedFriends,isLoading} = useQuery({
        queryKey: ['suggestedFriends'],
        queryFn: followSuggestions,
        select: (res) => res.data.data.suggestions
    })
  return {suggestedFriends,isLoading}
}
