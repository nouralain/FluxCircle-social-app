import { axiosInterceptor } from "./axios";

export const resgister=(userData)=> axiosInterceptor.post("/users/signup",userData)
export const login=(userData)=> axiosInterceptor.post("/users/signin",userData)
export const changePassword=(userData)=> axiosInterceptor.patch("/users/change-password",userData)
export const profileData=()=> axiosInterceptor.get("/users/profile-data")
export const getMyPosts=(userId)=> axiosInterceptor.get(`/users/${userId}/posts`)
export const getMySavedPosts=()=> axiosInterceptor.get("/users/bookmarks")
export const getFeedPosts=()=> axiosInterceptor.get("/posts/feed?only=following&limit=10")
export const getAllPosts=()=> axiosInterceptor.get("/posts")
export const getAllComments=(postId , page)=> axiosInterceptor.get(`/posts/${postId}/comments?page=${page}&limit=5`)
export const getPostDetails=(postId)=> axiosInterceptor.get(`/posts/${postId}`)
export const getPostLikes=(postId , page)=> axiosInterceptor.get(`/posts/${postId}/likes?page=${page}&limit=20`)