import React, { useState } from "react";
import { deletePost } from "../api/auth.api";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export default function useDeletePost(setOpenDeleteModal, post) {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  function handleDeletePost() {
    setLoading(true);

    toast
      .promise(deletePost(post._id), {
        loading: () => {
          return "Deleting post...";
        },
        success: () => {
          setLoading(false);

          return "Post deleted successfully!";
        },
        error: "Failed to delete the post.",
      })
      .then(() => {
        // Invalidate or refetch the posts query here to update the UI
        queryClient.invalidateQueries({ queryKey: ["posts"] });
        setOpenDeleteModal(false);
      });
  }
  return { handleDeletePost, loading };
}
