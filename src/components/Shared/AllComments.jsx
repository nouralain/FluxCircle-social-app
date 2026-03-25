import React, { useEffect, useState } from 'react'
import { getAllComments} from '../../api/auth.api'
import { useQuery } from '@tanstack/react-query'
import { formatDate } from '../../utilities/dateFormatting';
import MyButton from './Button';
import CreateComment from './CreateComment';

export default function AllComments({postId , commentsCount}) {
    // comments is the container we put comments in during pagination
    const [comments , setComments]=useState([])
    const [page , setIncPage] = useState(1)

      const {data:allComments , isLoading:isCommentsLoading , isFetching}= useQuery({
    queryKey:["postComments",postId , page],
    queryFn:()=> getAllComments(postId , page),
    select:(res)=> res.data,
    // to keep the previous comments until new comments loaded
      placeholderData: (previousData) => previousData,
        refetchOnWindowFocus: false


  })
useEffect(() => {
  if (allComments?.data?.comments) {
    setComments((prev) => [...prev, ...allComments.data.comments])
  }
}, [allComments])
  console.log(allComments);
  
  return (
    <>
    <div className='flex justify-between items-center mt-4 rounded-xl border border-gray-200 py-2 px-3 '>
       <span className='flex gap-3'>
         <span className='text-sm font-extrabold text-graay-600 '>Comments</span>
        <span className='text-xs font-bold text-primary-700 bg-primary-100 rounded-full size-6 flex items-center justify-center'>{commentsCount}</span>
       </span>

        <select name="" id="" className='text-xs font-bold text-graay-600 py-1.5 px-2 rounded-lg bg-graay-200 border border-gray-300 focus:border-primary-700 focus:shadow-xs focus:shadow-primary-700  focus-visible:outline-none'>
            <option value="">Most relevant</option>
            <option value="">Newest</option>
        </select>
    </div>
     {isCommentsLoading ?
       <div className='flex justify-between items-center mt-4 rounded-xl w-full border h-12 border-gray-200 py-2 px-3 '></div> :
      comments.map((comment)=><div className="content mt-3 flex  gap-3">
         <div className="image size-8 rounded-full overflow-hidden">
                <img src={comment.commentCreator.photo} alt={comment.commentCreator.name} />
              </div>
              <div className="body">
                <div className=' bg-graay-700 rounded-2xl py-2 px-3 max-w-80'>
                      <p className="text-xs font-bold ">{comment.commentCreator.name}</p>
                <p className="text-xs text-graay-500 ">{`@${comment.commentCreator.username} . ${formatDate(comment.createdAt)}`}</p>
              <p className="text-sm text-graay-600 wrap-break-word">{comment.content}</p>
              {comment.image && <div className=" mt-3 overflow-hidden rounded-xl"><img src={comment.image} alt="" className="w-full max-h-52 object-cover" /></div>}
                </div>
                {/* comment actions */}
                <div className='flex items-center gap-4 mt-1'>
                <span className='text-xs font-semibold text-graay-50'>{formatDate(comment.createdAt)}</span>
                <button className='text-xs font-semibold text-graay-500 hover:underline  hover:cursor-pointer'> Like ({comment.likes.length})</button>
                <button className='text-xs font-semibold text-graay-500 hover:underline hover:text-primary-700 hover:cursor-pointer'>Reply {comment.repliesCount!=0 && `(${comment.repliesCount })`}</button>
                </div>
                
              </div>
      </div>)
      } 
      {allComments?.meta.pagination.total >5 &&
       allComments?.meta.pagination.currentPage !== allComments?.meta.pagination.numberOfPages &&
       <div className='flex items-center justify-center'><MyButton disabled={isFetching} event={()=>setIncPage(page+1)} styles={"mt-4 bg-graay-400 text-black rounded-full border border-gray-300 text-xs font-bold text-graay-600"}>{isFetching ? "Loading..." : "View more comments"}</MyButton></div>}

       <CreateComment/>
    </>
  )
}
