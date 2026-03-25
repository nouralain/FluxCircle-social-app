import avatar from "../../assets/boliviainteligente-46MZbf_9P5I-unsplash.jpg";
import { Select, SelectItem, Textarea } from '@heroui/react';
import { IoEarthOutline, IoImageOutline } from 'react-icons/io5';
import { MdLockOutline} from 'react-icons/md';
import MyButton from './Button';
import { LuSend } from 'react-icons/lu';
import { FaRegSmile } from 'react-icons/fa';
import { FiUsers } from 'react-icons/fi';
import { useQuery } from "@tanstack/react-query";
import { profileData } from "../../api/auth.api";

export default function CreatePost() {
   const { data} = useQuery({
    queryKey: ["profile-data"],
    queryFn: profileData,
    select: (res) => res.data.data.user,
  });
  return (
    <div className='flex flex-col bg-white rounded-2xl p-4'>
   <div className="top flex items-center gap-3">
     <div className="left avatar size-10">
        <img className='size-full rounded-full' src={data?.photo} alt={data?.name} />
    </div>
    <div className='right text-graay-600'>
      <p className='font-extrabold'>{data?.name ?? "You"}</p>
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

    <div className="bottom mt-3">
       <div className='border-b border-gray-400 pb-5'>
         <Textarea  classNames={{input:"rounded-2xl  bg-graay-200 p-4 ", inputWrapper:"px-0 border border-gray-200"}} minRows={4} placeholder={`What's on your mind, ${data?.name ?? "You"} ?`} />
       </div>
        <div className='flex justify-between items-center mt-3'>
          <div className='flex gap-2 ' >
              <input type="file"  className='hidden'/>
            <label htmlFor="" className='p-2 rounded-md flex w-fit hover:bg-graay-400 cursor-pointer'>
              <IoImageOutline color='green' size={17} />
            </label>
            <button className='p-2 rounded-md  hover:bg-graay-400 cursor-pointer'>
              <FaRegSmile color='orange' />
            </button>
          </div>

            <MyButton styles={"py-2 px-5 rounded-lg bg-primary-800 text-white text-sm font-extrabold flex "}>
              Post 
              <LuSend />
              </MyButton>
        </div>
    </div>
    </div>
  )
}
