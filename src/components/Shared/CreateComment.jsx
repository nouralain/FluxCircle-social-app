import { Textarea } from "@heroui/react";
import { profileData } from "../../api/auth.api";
import { FaRegSmile } from "react-icons/fa";
import { IoImageOutline } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import { LuSend } from "react-icons/lu";

export default function CreateComment() {
  const { data } = useQuery({
    queryKey: ["profile-data"],
    queryFn: profileData,
    select: (res) => res.data.data.user,
  });
  return (
    <>
      <div className="flex items-center  bg-white rounded-2xl p-4">
        <div className="left avatar size-10">
          <img
            className="size-full rounded-full"
            src={data.photo}
            alt={data.name}
          />
        </div>

        <div className="rounded-2xl w-full  bg-graay-200 py-1.5 px-2 border border-gray-200">
          <Textarea
            classNames={{
              inputWrapper:
                "bg-transparent shadow-none hover:bg-transparent data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent",
            }}
            minRows={2}
            placeholder={`Comment as ${data.name} ...`}
          />
          <div className="flex justify-between items-center mt-3">
            <div className="flex gap-2 ">
              <input type="file" className="hidden" />
              <label
                htmlFor=""
                className="p-2 rounded-md flex w-fit hover:bg-graay-400 cursor-pointer"
              >
                <IoImageOutline color="gray" size={17} />
              </label>
              <button className="p-2 rounded-md  hover:bg-graay-400 cursor-pointer">
                <FaRegSmile color="gray" />
              </button>
            </div>

            <button className="flex items-center justify-center bg-primary-600 rounded-full size-8 ">
              <LuSend color="white" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
