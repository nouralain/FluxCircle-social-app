import { useState } from "react";
import useCommentLike from "../../hooks/useCommentLike";
import { formatDate } from "../../utilities/dateFormatting";
import CreateComment from "./CreateComment";
import { replyToComment } from "../../api/auth.api";
import AllReplies from "./AllReplies";

export default function SingleComment({ key, comment, postId }) {
    const [openReplies,setOpenReplies]=useState(false)


  const { likes, isLiked, handleCommentLike } = useCommentLike(comment, postId);
  return (

    <div key={key} className="content mt-3 flex  gap-3">
      <div className="image size-8 rounded-full overflow-hidden">
        <img
          src={comment.commentCreator.photo}
          alt={comment.commentCreator.name}
        />
      </div>

      <div className="body">
        <div className=" bg-graay-700 rounded-2xl py-2 px-3 max-w-80">
          <p className="text-xs font-bold ">{comment.commentCreator.name}</p>
          <p className="text-xs text-graay-500 ">{`@${comment.commentCreator.username} . ${formatDate(comment.createdAt)}`}</p>
          <p className="text-sm text-graay-600 wrap-break-word">
            {comment.content}
          </p>
          {comment.image && (
            <div className=" mt-3 overflow-hidden rounded-xl">
              <img
                src={comment.image}
                alt=""
                className="w-full max-h-52 object-cover"
              />
            </div>
          )}
        </div>

        {/* comment actions */}
        <div className="flex items-center gap-4 mt-1">
          <span className="text-xs font-semibold text-graay-50">
            {formatDate(comment.createdAt)}
          </span>
          <button
            onClick={() => handleCommentLike()}
            className={`text-xs font-semibold  ${isLiked ? "text-primary-700" : "text-graay-500"} hover:underline  hover:cursor-pointer`}
          >
            Like ({likes})
          </button>
          <button onClick={()=>setOpenReplies(!openReplies)} className="text-xs font-semibold text-graay-500 hover:underline hover:text-primary-700 hover:cursor-pointer">
            Reply {comment.repliesCount != 0 && `(${comment.repliesCount})`}
          </button>
        </div>
       {openReplies&&
        <div className="ms-5 mt-3 border-s border-s-gray-300 ps-4">
          {comment.repliesCount > 0 ? <AllReplies commentId={comment._id} postId={postId} /> : <p className="text-xs ms-4 text-graay-500">No replies yet</p>}
         
          <CreateComment postId={postId}  apiFunction={replyToComment} commentId={comment._id} />
        </div>
       }
      </div>
    </div>
  );
}
