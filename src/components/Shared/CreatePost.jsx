import { Select, SelectItem, Textarea } from "@heroui/react";
import { IoEarthOutline, IoImageOutline } from "react-icons/io5";
import { MdLockOutline } from "react-icons/md";
import MyButton from "./Button";
import { LuSend } from "react-icons/lu";
import { FaRegSmile } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { useQuery} from "@tanstack/react-query";
import {  profileData } from "../../api/auth.api";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import EmojiPicker from "emoji-picker-react";
import useCreatePost from "../../hooks/useCreatePost";

export default function CreatePost() {
  
  const [privacy, setPrivacy] = useState("public");
 

  const { data } = useQuery({
    queryKey: ["profile-data"],
    queryFn: profileData,
    select: (res) => res.data.data.user,
  });

const {
  caption,
  setCaption,
  imagePreview,
  showEmojiPicker,
  setShowEmojiPicker,
  handleCaption,
  handleImage,
  handleSubmit,
  removeImage,
} = useCreatePost() 



  return (
    <div className="flex flex-col bg-white rounded-2xl p-4">
      <div className="top flex items-center gap-3">
        <div className="left avatar size-10">
          <img
            className="size-full rounded-full"
            src={data?.photo}
            alt={data?.name}
          />
        </div>

        <div className="right text-graay-600">
          <p className="font-extrabold">{data?.name ?? "You"}</p>
          <Select
          onSelectionChange={(keys)=> [...keys][0] &&setPrivacy([...keys][0])}
            defaultSelectedKeys={[privacy]}
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
            <SelectItem key="onlyMe" startContent={<MdLockOutline />}>
              Only me
            </SelectItem>
          </Select>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bottom mt-3">
        {/* post content */}
        <div className=" pb-5">
          <Textarea
          value={caption}
        onChange={handleCaption}
            classNames={{
              input: "rounded-2xl bg-graay-200 p-4",
              inputWrapper:
                "px-0 border border-gray-200 hover:bg-transparent data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent group-data-[focus=true]:border-primary-500 shadow-none",
            }}
            minRows={4}
            placeholder={`What's on your mind, ${data?.name ?? "You"} ?`}
          />{" "}
        </div>

        {/* image preview */}
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

        {/* image and emoji input */}
        <div className="flex justify-between items-center mt-5 border-t pt-3  border-gray-400">
          <div className="flex gap-2 relative">
            <label className="p-2 rounded-md flex w-fit hover:bg-graay-400 cursor-pointer">
              <input
                onChange={handleImage}
                type="file"
                className="hidden"
                id="image-input"
              />
              <span className="flex items-center gap-2 text-sm font-semibold text-graay-800">
                <IoImageOutline color="green" size={17} />
                Photo/video
              </span>
            </label>
            <button
            type="button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="p-2 rounded-md  hover:bg-graay-400 cursor-pointer flex items-center gap-2 text-sm font-semibold text-graay-800"
            >
              <FaRegSmile color="orange" />
              Feeling/activity
            </button>
            <div className="absolute z-10 top-10">
              <EmojiPicker 
                previewConfig={{ showPreview: false }}

              width={300}
              height={400}
                open={showEmojiPicker}
                onEmojiClick={(emojiObject) => {
                  setCaption((prev) => (prev ? prev + emojiObject.emoji  : emojiObject.emoji));
                }}
              />
            </div>
          </div>

          <MyButton
          
          btnType={"submit"}
            styles={
              "py-2 px-5 rounded-lg bg-primary-800 text-white text-sm font-extrabold flex "
            }
          >
            Post
            <LuSend />
          </MyButton>
        </div>
      </form>
    </div>
  );
}
