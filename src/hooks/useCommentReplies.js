import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { getCommentReplies } from '../api/auth.api'

export default function useCommentReplies(commentId, postId) {
  const [page, setPage] = useState(1);

    const{data: commentReplies , isLoading} = useQuery({
        queryKey: ["commentReplies",commentId],
        queryFn: () => getCommentReplies(postId, commentId, page),
        select: (res) => res.data.data.replies,
    })

  return { commentReplies ,isLoading}
}
