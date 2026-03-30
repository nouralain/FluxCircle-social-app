import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react'
import { editPost } from '../api/auth.api';

export default function useEditPost(post) {
    const [editingPost, setEditingPost] = useState(false);
      const [delay, setDelay] = useState(false);
    const [postBody, setPostBody] = useState(post.body);
  
  const queryClient = useQueryClient();
  
    const { mutate } = useMutation({
      mutationFn: (formData) => editPost(post._id, formData),
  
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["posts"] })
    queryClient.invalidateQueries({ queryKey: ["my-posts"] })
    queryClient.invalidateQueries({ queryKey: ["postDetails"] })
    queryClient.invalidateQueries({ queryKey: ["AllPosts"] })
        setTimeout(() => {
          setDelay(false);
          setEditingPost(false);
        }, 3000);
      },
    });
  
    const handleEditPost = () => {
      setDelay(true);
      const formData = new FormData();
      if (postBody) {
        formData.set("body", postBody);
      }
      if (post.image) {
        formData.set("image", post.image);
      }
      mutate(formData);
    };
  return {setEditingPost,editingPost,handleEditPost,delay,setPostBody,postBody}
}
