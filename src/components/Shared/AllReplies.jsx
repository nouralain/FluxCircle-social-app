import useCommentReplies from "../../hooks/useCommentReplies";
import { timeAgo } from "../../utilities/dateFormatting";

export default function AllReplies({ commentId, postId }) {
  const { commentReplies, isLoading } = useCommentReplies(commentId, postId);
  console.log(commentReplies);
  return (
    <>
      {
        isLoading ? <span className="text-xs ms-4 text-graay-500">Loading replies...</span> :
        commentReplies?.map((reply)=> <div key={reply.id} className="ms-4 mb-3">
          <div className="relative flex items-start gap-2">
            <img
              alt={reply.commentCreator.name}
              className="h-6 w-6 rounded-full object-cover"
              src={reply.commentCreator.photo}
            />
            <div className="min-w-0 flex-1">
              <div className="inline-block max-w-full rounded-2xl bg-[#f0f2f5] px-2.5 py-2">
                <p className="text-[11px] font-bold text-slate-900">
                  {reply.commentCreator.name}
                </p>
                <p className="text-[11px] text-slate-500">{timeAgo(reply.createdAt)}</p>
                <p className="mt-0.5 whitespace-pre-wrap text-xs text-slate-700">
                  {reply.content}
                </p>
                {reply.image && 
                <div className="overflow-hidden rounded-lg">
                    <img src={reply.image} alt="reply image" className="mt-2 max-h-52 w-full rounded-lg object-cover"/>
                </div>
                }
                <div className="mt-1.5 flex items-center justify-between px-1">
                  <button className="text-[11px] font-semibold hover:underline disabled:opacity-60 text-slate-500">
                    Like ({reply.likesCount})
                  </button>
                  <div className="relative" data-comment-menu-root="true">
                    <button className="rounded-full p-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={14}
                        height={14}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-ellipsis"
                        aria-hidden="true"
                      >
                        <circle cx={12} cy={12} r={1} />
                        <circle cx={19} cy={12} r={1} />
                        <circle cx={5} cy={12} r={1} />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
       
      )
      }
    </>
  );
}
