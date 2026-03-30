import { Spinner, Textarea } from "@heroui/react";
import {  profileData } from "../../api/auth.api";
import { FaRegSmile } from "react-icons/fa";
import { IoImageOutline } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import { LuSend } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import useCreatComment from "../../hooks/useCreatComment";

export default function CreateComment({ postId ,apiFunction,commentId}) {
  const { data } = useQuery({
        queryKey: ["profile-data"],
        queryFn: profileData,
        select: (res) => res.data.data.user,
      });
      const {handleSubmit, handleImage, body, setBody, imagePreview, isPending , removeImage}=useCreatComment(postId,apiFunction,commentId)
  return (
    <div>
      <div className="flex items-center  bg-white rounded-2xl p-4">
        <div className="left avatar size-10">
          <img
            className="size-full rounded-full"
            src={data.photo}
            alt={data.name}
          />
        </div>

        <form
          onSubmit={(e) => handleSubmit(e)}
          className="rounded-2xl w-full  bg-graay-200 py-1.5 px-2 border border-gray-200"
        >
          <Textarea
            onChange={(e) => setBody(e.target.value)}
            classNames={{
              inputWrapper:
                "bg-transparent shadow-none hover:bg-transparent data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent",
            }}
            minRows={2}
            placeholder={`Comment as ${data.name} ...`}
          />
          <div className="flex justify-between items-center mt-3">
            <div className="flex gap-2 ">
              <label className="p-2 rounded-md flex w-fit hover:bg-graay-400 cursor-pointer">
                <input
                  id="image-input"
                  onChange={(e) => handleImage(e)}
                  type="file"
                  className="hidden"
                />
                <IoImageOutline color="gray" size={17} />
              </label>
              <button type="button" className="p-2 rounded-md  hover:bg-graay-400 cursor-pointer">
                <FaRegSmile color="gray" />
              </button>
            </div>

            <button
              type="submit"
              disabled={isPending || !body?.trim()}
              className={`flex items-center justify-center ${!body?.trim() ? "bg-primary-600/40" : "bg-primary-600"} rounded-full size-8`}
            >
              {isPending ? (
                <Spinner size="sm" color="white" />
              ) : (
                <LuSend color="white" />
              )}
            </button>
          </div>
        </form>
      </div>
      {imagePreview && (
        <div className=" overflow-hidden rounded-2xl relative">
          <img
            className="w-full max-h-60 object-cover object-center "
            src={imagePreview}
            alt=""
          />
          <button
            onClick={removeImage}
            className="absolute top-2 right-2 rounded-full size-6 bg-black/50 flex justify-center items-center hover:cursor-pointer"
          >
            <IoMdClose color="white" />
          </button>
        </div>
      )}
    </div>
  );
}
