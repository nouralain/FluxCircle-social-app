import React, { useState } from 'react'
import { savePost } from '../api/auth.api';

export default function useBookmarkPost(post) {
      const [isBookmarked, setIsBookmarked] = useState(post.bookmarked);
    
    const handleSavePost = () => {
        savePost(post._id).then((res) => {
          setIsBookmarked(res.data.data.bookmarked);
        })}
  return {handleSavePost,isBookmarked}
}
