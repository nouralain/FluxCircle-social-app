import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react'

export default function useCreatComment(postId,apiFunction,commentId) {
    const [body, setBody] = useState(null);
      const [image, setImage] = useState(null);
      const [imagePreview, setImagePreview] = useState(null);
          const queryClient = useQueryClient();

      
      function handleImage(e) {
        if (e.target.files[0]) {
          setImage(e.target.files[0]);
          setImagePreview(URL.createObjectURL(e.target.files[0]));
        }
      }
    
      const { mutate, isPending } = useMutation({
    mutationFn: ({ postId, commentId, commentData }) => {
      if (commentId) {
        return apiFunction(postId, commentId, commentData);
      }
      return apiFunction(postId, commentData);
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["postComments", variables.postId] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["AllPosts"] });
      queryClient.invalidateQueries({ queryKey: ["commentReplies", variables.commentId] });
      removeImage();
      setBody("");
    },
  });

function handleSubmit(e) {
    e.preventDefault();
    const commentData = new FormData();
    if (body) commentData.set("content", body);
    if (image) commentData.set("image", image);

    mutate({ postId, commentId, commentData });
  }
    
      function removeImage() {
        setImage(null);
        setImagePreview(null);
        document.getElementById("image-input").value = null;
      }
return { handleSubmit, handleImage, body, setBody, imagePreview, isPending, removeImage };}

