import { NavLink } from "react-router-dom";

import { AiOutlineLike } from "react-icons/ai";
import { IoMdRepeat } from "react-icons/io";

import PostSkeleton from "./PostSkeleton";
import { formatDate } from "../../utilities/dateFormatting";
import { TbClockHour5 } from "react-icons/tb";

export default function StaticPost({ data, isFetching }) {
  return (
    <>
      {isFetching ? (
        <PostSkeleton />
      ) : (
        data?.map((post) => (
          <div
            key={post.id}
            className="rounded-2xl border border-gray-200  mt-4 p-4 bg-white"
          >
            {/* top */}
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-between gap-5 flex-1">

                <div className="flex gap-3">
                  <div className="image size-11 rounded-full overflow-hidden">
                    <img src={post.user.photo} alt={post.user.name} />
                  </div>

                  <div className="flex items-start flex-col ">
                    <NavLink className={"text-sm font-bold"} to="">
                      {post.user.name}
                    </NavLink>
                    <span className="text-xs">@{post.user.username} </span>
                  </div>
                </div>

                <div className="post-info">
                  <div>
                    <NavLink
                    
                      to={`/posts/${post.id}`}
                      className={
                        "text-xs text-primary-700 px-2 py-1 font-bold rounded-lg hover:bg-primary-100"
                      }
                    >
                      View details
                    </NavLink>
                  </div>
                </div>

              </div>
            </div>
            {/* post content */}
            <div className="mt-3 border-b border-b-gray-300 pb-4">
              <p className="text-sm ">{post.body}</p>
              {post.image && (
                <div className="max-h-155 mt-3 overflow-hidden ">
                  <img
                    src={post.image}
                    alt=""
                    className="w-full"
                  />
                </div>
              )}
            </div>

            {/* post interactions */}
            <div className="mt-3 flex items-center justify-between gap-2  ">
              <span className="text-xs text-graay-500 flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <AiOutlineLike />
                  {post.likesCount} likes
                </span>
                <span className="flex items-center gap-1">
                  <IoMdRepeat />
                  {post.sharesCount} shares
                </span>
                <span>{post.commentsCount} comments</span>
              </span>

              <span className="text-xs font-medium text-graay-600 flex items-center gap-1">
                <TbClockHour5 />

                {formatDate(post.createdAt)}
              </span>
            </div>
          </div>
        ))
      )}
    </>
  );
}
