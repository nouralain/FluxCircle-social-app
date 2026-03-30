import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { addPost } from "../api/auth.api"
import toast from "react-hot-toast"

export default function useCreatePost() {
  const [caption, setCaption] = useState("")
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  const queryClient = useQueryClient()

  function handleCaption(e) {
    setCaption(e.target.value)
  }

  function handleImage(e) {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
      setImagePreview(URL.createObjectURL(e.target.files[0]))
    }
  }

  function removeImage() {
    setImage(null)
    setImagePreview(null)
    document.getElementById("image-input").value = null
  }

  function handleSubmit(e) {
    e.preventDefault()
    const postFormData = new FormData()
    if (caption) postFormData.set("body", caption)
    if (image) postFormData.set("image", image)

    removeImage()
    setCaption("")
    setShowEmojiPicker(false)

    toast.promise(addPost(postFormData), {
  loading: "Saving...",
  success: (response) => {
    queryClient.invalidateQueries({ queryKey: ["posts"] })
    queryClient.invalidateQueries({ queryKey: ["AllPosts"] })
    queryClient.invalidateQueries({ queryKey: ["my-posts"] })
    return response.data.message
  },
  error: "Could not create post.", 
})
  }

  return {
    caption,
    setCaption,
    image,
    imagePreview,
    showEmojiPicker,
    setShowEmojiPicker,
    handleCaption,
    handleImage,
    handleSubmit,
    removeImage,
  }
}