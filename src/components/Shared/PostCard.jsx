import { NavLink } from "react-router-dom";
import { timeAgo } from "../../utilities/dateFormatting";
import { Select, SelectItem, Textarea } from "@heroui/react";
import { IoEarthOutline, IoShareSocialOutline } from "react-icons/io5";
import { FiUsers } from "react-icons/fi";
import { MdLockOutline } from "react-icons/md";
import { FaRegBookmark, FaRegComment } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { HiOutlinePencil } from "react-icons/hi";
import { AiOutlineLike } from "react-icons/ai";
import { IoMdRepeat } from "react-icons/io";
import TopComment from "./TopComment";
import { useEffect, useState } from "react";
import AllComments from "./AllComments";
import LikesModal from "./LikesModal";

import { likePost, profileData } from "../../api/auth.api";
import { useQuery } from "@tanstack/react-query";
import { LuEllipsis } from "react-icons/lu";
import DeleteModal from "./DeleteModal";
import MyButton from "./Button";
import useBookmarkPost from "../../hooks/useBookmarkPost";
import useEditPost from "../../hooks/useEditPost";

export default function PostCard({ post }) {
  const [openPostOptions, setOpenPostOptions] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const { data: myData } = useQuery({
    queryKey: ["profile-data"],
    queryFn: profileData,
    select: (res) => res.data.data.user,
  });

  const { handleSavePost, isBookmarked } = useBookmarkPost(post);
  const {
    setEditingPost,
    editingPost,
    handleEditPost,
    delay,
    setPostBody,
    postBody,
  } = useEditPost(post);

  const [isLiked, setIsLiked] = useState(post.likes.includes(myData._id));
  const actionBtns = [
    {
      label: "Like",
      icon: <AiOutlineLike size={18} />,
      action: () => {
        if (isLiked) {
          setLikesCount((prev) => prev - 1);
          setIsLiked(false);
        } else {
          setLikesCount((prev) => prev + 1);
          setIsLiked(true);
        }
        likePost(post._id);
      },
    },
    {
      label: "Comment",
      icon: <FaRegComment size={18} />,
      action: () =>
        setOpenCommentsPostId(openCommentsPostId === post.id ? null : post.id),
    },
    { label: "Share", icon: <IoShareSocialOutline size={18} />, action: "" },
  ];

  useEffect(() => {
    post.likes.map((like) =>
      like === myData._id ? setIsLiked(true) : setIsLiked(false),
    );
  }, [myData]);

  const [openCommentsPostId, setOpenCommentsPostId] = useState(null);

  const [openLikesModal, setOpenLikesModal] = useState(false);
  return (
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
              {myData._id === post.user._id ? (
                <Select
                  defaultSelectedKeys={[post.privacy]}
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
                  <SelectItem key="following" startContent={<FiUsers />}>
                    Friends
                  </SelectItem>
                  <SelectItem key="private" startContent={<MdLockOutline />}>
                    Only me
                  </SelectItem>
                </Select>
              ) : (
                <span className="flex items-center gap-2 text-xs">
                  {post.privacy === "public" ? (
                    <>
                      {" "}
                      <IoEarthOutline /> Public
                    </>
                  ) : post.privacy === "friends" ? (
                    <>
                      <FiUsers />
                      Friends
                    </>
                  ) : (
                    <>
                      <MdLockOutline /> Only me
                    </>
                  )}
                </span>
              )}
            </div>
          </div>
        </div>
        <button
          className="hover:cursor-pointer relative"
          onClick={() => setOpenPostOptions(!openPostOptions)}
        >
          <LuEllipsis />
          {openPostOptions && (
            <div className=" rounded-2xl py-1 border border-gray-200  absolute z-20 top-8 right-0 bg-white">
              <button
                onClick={handleSavePost}
                className="flex items-center gap-2 py-2 px-3 text-sm font-semibold text-graay-600 hover:bg-graay-200 w-44 hover:cursor-pointer"
              >
                <FaRegBookmark /> {isBookmarked ? "Unsave Post" : "Save Post"}
              </button>
              {myData._id === post.user._id && (
                <>
                  {editingPost || (
                    <button
                      onClick={() => setEditingPost(true)}
                      className="flex items-center gap-2 py-2 px-3 text-sm font-semibold text-graay-600 hover:bg-graay-200 w-44 hover:cursor-pointer"
                    >
                      <HiOutlinePencil /> Edit Post
                    </button>
                  )}

                  <button
                    onClick={() => setOpenDeleteModal(true)}
                    className="flex items-center gap-2 py-2 px-3 text-sm font-semibold text-red-600 hover:bg-red-100/50 w-44 hover:cursor-pointer"
                  >
                    <FaRegTrashCan /> Delete Post
                  </button>
                </>
              )}
            </div>
          )}
        </button>
      </div>
      {/* post content */}
      <div className="mt-3">
        {editingPost ? (
          <>
            <Textarea
              value={postBody}
              onChange={(e) => setPostBody(e.target.value)}
              minRows={3}
              classNames={{
                input: "rounded-2xl bg-graay-200 p-4",
                inputWrapper:
                  "px-0 border border-gray-200 hover:bg-transparent data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent group-data-[focus=true]:border-primary-500 shadow-none",
              }}
            />
            <div className="flex justify-end items-center gap-2 mt-2">
              <MyButton
                event={() => setEditingPost(false)}
                styles={
                  "rounded-full text-xs font-bold text-graay-600 hover:cursor-pointer bg-white border border-gray-200 min-w-0 "
                }
              >
                Cancel
              </MyButton>
              <MyButton
                event={() => handleEditPost()}
                styles={
                  "rounded-full text-xs font-bold text-graay-600 hover:cursor-pointer  text-white min-w-0 "
                }
              >
                {delay ? "Saving..." : "Save"}
              </MyButton>
            </div>
          </>
        ) : (
          <p className="text-sm ">{post.body}</p>
        )}
        {post.image && (
          <div className="max-h-155 mt-3 overflow-hidden">
            <img src={post.image} alt="" className="w-full  object-cover" />
          </div>
        )}
      </div>

      {/* post interactions */}
      <div className="mt-7 flex items-center justify-between gap-2 border-b border-b-gray-300 pb-2">
        <button
          onClick={() => likesCount > 0 && setOpenLikesModal(true)}
          className={`flex items-center gap-2 text-sm font-medium text-graay-500 hover:cursor-pointer ${likesCount > 0 && " hover:text-primary-700  hover:underline"}`}
        >
          <span className="flex items-center justify-center bg-primary-700 text-white rounded-full size-5">
            <AiOutlineLike size={13} />
          </span>
          {likesCount} likes
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
      <div className="grid grid-cols-3 gap-1 my-1">
        {actionBtns.map((btn) => (
          <button
            onClick={btn.action}
            key={btn.label}
            className={`${btn.label === "Like" && isLiked && "text-primary-700 bg-blue-100"} p-2 rounded-lg ${isLiked || " hover:bg-graay-400"} hover:cursor-pointer flex items-center justify-center gap-1 text-xs font-semibold text-graay-800`}
          >
            {btn.icon}
            {btn.label}
          </button>
        ))}
      </div>

      {/* post  comments*/}
      {openCommentsPostId === post.id ? (
        <AllComments postId={post.id} commentsCount={post.commentsCount} />
      ) : (
        post.commentsCount > 0 && (
          <div className="bg-white pb-3">
            <TopComment
              postId={post.id}
              commentsCount={post.commentsCount}
              topComment={post.topComment}
            />
          </div>
        )
      )}
      {openLikesModal && (
        <LikesModal
          postId={post.id}
          isOpen={openLikesModal}
          onClose={() => setOpenLikesModal(false)}
        />
      )}
      {openDeleteModal && (
        <DeleteModal
          post={post}
          setOpenDeleteModal={setOpenDeleteModal}
          isOpen={openDeleteModal}
          onClose={() => setOpenDeleteModal(false)}
        />
      )}
    </div>
  );
}
