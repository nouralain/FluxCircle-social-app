import React from 'react'
import Post from '../../components/Shared/Post'
import { useQuery } from '@tanstack/react-query'
import { getPostDetails } from '../../api/auth.api'
import {   useNavigate, useParams } from 'react-router-dom'
import PostSkeleton from '../../components/Shared/PostSkeleton'
import MyButton from '../../components/Shared/Button'
import { FaArrowLeft } from 'react-icons/fa'

export default function PostDetails() {
    const { postId } = useParams()
const navigate = useNavigate()

    const {data , isLoading} = useQuery({
        queryKey: ["postDetails" , postId],
        queryFn: ()=> getPostDetails(postId),
        select: (res) => res.data.data.post,
    })
    console.log(data);
  return (
    <div className='mt-24 mb-6 mx-3 max-w-3xl lg:mx-auto'>
        <MyButton event={() => navigate(-1)} styles={"bg-white text-black text-sm font-bold border border-gray-200"}>
            <FaArrowLeft />Back</MyButton>
              {isLoading ? <PostSkeleton /> : <Post data={[data]} />}

        
    </div>
  )
}
