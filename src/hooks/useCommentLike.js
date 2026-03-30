import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { likeComment, profileData } from "../api/auth.api";

export default function useCommentLike(comment, postId) {
  // to fetch userData => needed to check if user liked the comment or not
  const { data: userData } = useQuery({
    queryKey: ["profile-data"],
    queryFn: profileData,
    select: (res) => res.data.data.user,
  });
  //   state to update the likes number immedietly after clicking like
  const [likes, setLikes] = useState(comment.likes.length);
  //  state to update likes ui if user liked comment
  const [isLiked, setIsLiked] = useState(comment.likes.includes(userData._id));

  
  const { mutate } = useMutation({
    mutationFn: ({ postId, commentId }) => likeComment(postId, commentId),
    
  });

//   to check if user liked the comment after component rendered
  useEffect(() => {
    comment.likes.map((like) => {
      if (userData._id === like) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    });
  }, []);

//   function to inc or dec likes count if user liked or not and send it to backend to update data base and update ui immediately without waiting for response from backend
  function handleCommentLike() {

    if (isLiked) {
      setLikes((prev) => prev - 1);
      setIsLiked(false);
    } else {
      setLikes((prev) => prev + 1);
      setIsLiked(true);
    }
    mutate({ postId, commentId: comment._id });
  }
  return { likes, isLiked, handleCommentLike };
}
