import { NavLink } from "react-router-dom";
import { timeAgo } from "../../utilities/dateFormatting";
import { Select, SelectItem } from "@heroui/react";
import { IoEarthOutline, IoShareSocialOutline } from "react-icons/io5";
import { FiUsers } from "react-icons/fi";
import { MdLockOutline } from "react-icons/md";
import { FaRegBookmark, FaRegComment } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { HiOutlinePencil } from "react-icons/hi";
import { AiOutlineLike } from "react-icons/ai";
import { IoMdRepeat } from "react-icons/io";
import TopComment from "./TopComment";
import { useState } from "react";
import AllComments from "./AllComments";
import LikesModal from "./LikesModal";

import PostSkeleton from "./PostSkeleton";

export default function Post({ data, isFetching  }) {
  


  const actionBtns = [
    { label: "Like", icon: <AiOutlineLike /> },
    { label: "Comment", icon: <FaRegComment /> },
    { label: "Share", icon: <IoShareSocialOutline /> },
  ];

const [openCommentsPostId, setOpenCommentsPostId] = useState(null)
 
  const [openLikesModal, setOpenLikesModal] = useState(null)
  return (
    <>

      {
       isFetching ? <PostSkeleton /> :
      data?.map((post) => (
        
        <div
          key={post.id}
          
          className="rounded-2xl border border-gray-200  mt-4 p-4 bg-white"
        >
          
            {/* top */}
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start gap-5 flex-1">
              <div className="image size-11 rounded-full overflow-hidden">
                <img src={post.user.photo} alt={post.user.name} />
              </div>
              <div className="post-info">
                <NavLink className={"text-sm font-bold"} to="">
                  {post.user.name}
                </NavLink>

                <div className="flex items-center gap-4">
                  <span className="text-xs">@{post.user.username} </span>
                  <span className="text-xs font-medium text-graay-600">
                    {timeAgo(post.createdAt)}
                  </span>

                  <Select
                    defaultSelectedKeys={["public"]}
                    aria-label="post visibility"
                    renderValue={(items) => {
                      return items.map((item) => (
                        <div key={item.key} className="flex items-center gap-1">
                          {item.props.startContent}
                          <span>{item.props.children}</span>
                        </div>
                      ));
                    }}
                    classNames={{
                      trigger:
                        "hover:bg-gray-300  hover:cursor-pointer bg-transparent min-w-24 shadow-none p-1 h-fit min-h-0  rounded-md",
                      value: "text-xs font-semibold",
                      popoverContent: "rounded-xl",
                    }}
                  >
                    <SelectItem key="public" startContent={<IoEarthOutline />}>
                      Public
                    </SelectItem>
                    <SelectItem key="friends" startContent={<FiUsers />}>
                      Friends
                    </SelectItem>
                    <SelectItem key="private" startContent={<MdLockOutline />}>
                      Only me
                    </SelectItem>
                  </Select>
                </div>
              </div>
            </div>

            <Select
              aria-label="post actions"
              classNames={{
                trigger:
                  "hover:bg-gray-300  hover:cursor-pointer bg-transparent min-w-24 shadow-none p-1 h-fit min-h-0  rounded-md",
                value: "text-xs font-semibold",
                popoverContent: "rounded-xl",
              }}
            >
              <SelectItem key="save" startContent={<FaRegBookmark />}>
                Save Post
              </SelectItem>
              <SelectItem key="edit" startContent={<HiOutlinePencil />}>
                Edit Post
              </SelectItem>
              <SelectItem
                className="text-red-600"
                key="delete"
                startContent={<FaRegTrashCan />}
              >
                Delete Post
              </SelectItem>
            </Select>
          </div>
          {/* post content */}
          <div className="mt-3">
            <p className="text-sm ">{post.body}</p>
            {post.image && <div className="max-h-155 mt-3 overflow-hidden"><img src={post.image} alt="" className="w-full  object-cover" /></div>}
          </div>

          {/* post interactions */}
          <div className="mt-7 flex items-center justify-between gap-2 border-b border-b-gray-300 pb-2">
            <button onClick={()=> post.likesCount >0 && setOpenLikesModal(true)} className={`flex items-center gap-2 text-sm font-medium text-graay-500 hover:cursor-pointer ${post.likesCount >0 && " hover:text-primary-700  hover:underline"}`}>
              <span className="flex items-center justify-center bg-primary-700 text-white rounded-full size-5">
                <AiOutlineLike size={13} />
              </span>
              {post.likesCount} likes
            </button>

            <span className="text-xs text-graay-500 flex items-center gap-4">
              <span className="flex items-center gap-1">
                <IoMdRepeat />
                {post.sharesCount} shares
              </span>
              <span>{post.commentsCount} comments</span>
              <NavLink
             
                to={`/posts/${post.id}`}
                className={
                  "text-primary-700 px-2 py-1 font-bold rounded-lg hover:bg-primary-100"
                }
              >
                View details
              </NavLink>
            </span>
          </div>

          {/* post actions */}
          <div className="grid grid-cols-3 ">
            {actionBtns.map((btn) => (
              <button
             onClick={() => setOpenCommentsPostId(
  openCommentsPostId === post.id ? null : post.id
)}
                key={btn.label}
                className="p-2 rounded-lg hover:bg-graay-400 hover:cursor-pointer flex items-center justify-center gap-1 text-xs font-medium text-graay-800"
              >
                {btn.icon}
                {btn.label}
              </button>
            ))}
          </div>
          

          {/* post  comments*/}
          { openCommentsPostId === post.id  ? <AllComments postId={post.id} commentsCount={post.commentsCount} /> : post.commentsCount>0 && <div className="bg-white pb-3"><TopComment postId={post.id} commentsCount={post.commentsCount} topComment={post.topComment} /></div>}
          {openLikesModal && <LikesModal />}
        </div>
      ))}
    </>
  );
}
