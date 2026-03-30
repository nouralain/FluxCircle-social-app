import React, { useEffect, useState } from "react";
import { addComment, getAllComments } from "../../api/auth.api";
import { useQuery } from "@tanstack/react-query";
import MyButton from "./Button";
import CreateComment from "./CreateComment";
import SingleComment from "./SingleComment";
import usePagination from "../../hooks/usePagination";

export default function AllComments({ postId, commentsCount }) {
    const [page, setPage] = useState(1)


  const {
    data: allComments,
    isLoading: isCommentsLoading,
    isFetching,
  } = useQuery({
    queryKey: ["postComments", postId, page],
    queryFn: () => getAllComments(postId, page),
    select: (res) => res.data,
    // to keep the previous comments until new comments loaded
    placeholderData: (previousData) => previousData,
    refetchOnWindowFocus: false,
  });

     const { items: comments} = usePagination(allComments?.data, "comments",page)


  return (
    <>
      <div className="flex justify-between items-center mt-4 rounded-xl border border-gray-200 py-2 px-3 ">
        <span className="flex gap-3">
          <span className="text-sm font-extrabold text-graay-600 ">
            Comments
          </span>
          <span className="text-xs font-bold text-primary-700 bg-primary-100 rounded-full size-6 flex items-center justify-center">
            {commentsCount}
          </span>
        </span>

        <select
          name=""
          id=""
          className="text-xs font-bold text-graay-600 py-1.5 px-2 rounded-lg bg-graay-200 border border-gray-300 focus:border-primary-700 focus:shadow-xs focus:shadow-primary-700  focus-visible:outline-none"
        >
          <option value="">Most relevant</option>
          <option value="">Newest</option>
        </select>
      </div>
      {isCommentsLoading ? (
        <div className="flex justify-between items-center mt-4 rounded-xl w-full border h-12 border-gray-200 py-2 px-3 "></div>
      ) : (
        comments.map((comment) => (
         <SingleComment key={comment._id} comment={comment}  postId={postId}/>
        ))
      )}
      {allComments?.meta.pagination.total > 5 &&
        allComments?.meta.pagination.currentPage !==
          allComments?.meta.pagination.numberOfPages && (
          <div className="flex items-center justify-center">
            <MyButton
              disabled={isFetching}
              event={() => setPage(page + 1)}
              styles={
                "mt-4 bg-graay-400 text-black rounded-full border border-gray-300 text-xs font-bold text-graay-600"
              }
            >
              {isFetching ? "Loading..." : "View more comments"}
            </MyButton>
          </div>
        )}

      <CreateComment apiFunction={addComment} postId={postId} />
    </>
  );
}
