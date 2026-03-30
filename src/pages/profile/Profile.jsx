import { Avatar} from "@heroui/react";
import avatar from "../../assets/default-profile.png";
import { FiUsers } from "react-icons/fi";
import { getMyPosts, getMySavedPosts, profileData } from "../../api/auth.api";
import { useQuery } from "@tanstack/react-query";
import { MdOutlineEmail } from "react-icons/md";
import { LuUsers } from "react-icons/lu";
import { IoDocumentTextOutline } from "react-icons/io5";
import { GoBookmark } from "react-icons/go";
import { useState } from "react";
import LoadingScreen from "../../components/Shared/LoadingScreen";
import StaticPost from "../../components/Shared/StaticPost";

export default function Profile() {
  const { data, isLoading } = useQuery({
    queryKey: ["profile-data"],
    queryFn: profileData,
    select: (res) => res.data.data.user,
  });
  const { data: myPosts , isFetching:myPostFetching ,refetch:myPostRefetch } = useQuery({
    queryKey: ["my-posts"],
    queryFn: () => getMyPosts(data?.id),
    select: (res) => res.data.data.posts,
    enabled: !!data?.id,
        staleTime: Infinity

  });
  const { data: mySavedPosts , isFetching,refetch } = useQuery({
    queryKey: ["my-saved-posts"],
    queryFn: getMySavedPosts,
    select: (res) => res.data.data.bookmarks,
        staleTime: Infinity

  });

  const profileState = [
    { label: "Followers", value: data?.followersCount ?? 0 },
    { label: "Following", value: data?.followingCount ?? 0 },
    { label: "Bookmarks", value: data?.bookmarksCount ?? 0 },
  ];

  const postsInfo = [
    { label: "My Posts", value: myPosts?.length },
    { label: "Saved Posts", value: mySavedPosts?.length },
  ];

  const [active, setActive] = useState("My Posts");
  return (
    <>
      <main className="max-w-6xl lg:mx-auto">
        {isLoading && (
          <LoadingScreen profile={"profile"}/>
        )}
        <div className="flex flex-col relative">
          <div
            className="rounded-t-2xl  h-44 sm:h-52 sm:rounded-t-3xl lg:h-60 mt-25 mx-3 flex items-center bg-linear-to-r
from-[#20293B]
to-[#5F8DB3] "
          ></div>
          {/* first section */}
          <section className="outer bg-white mx-3 rounded-b-2xl ">
            <div className="inner -mt-15 p-5 bg-white mx-3 sm:mx-8 rounded-t-2xl  ">
              <div className="lg:flex lg:items-center lg:justify-between ">
                {/* 1st section => user info */}
              <div className="user-info flex items-center justify-start gap-5">
                <Avatar
                  as="button"
                  className="transition-transform size-28 border-3 border-[#DBEAFE] "
                  name="Jason Hughes"
                  src={avatar}
                />
                <div className="flex flex-col gap-2 ">
                  <h1 className="font-black text-2xl sm:text-4xl mb-0"> {data?.name}</h1>
                  <p className="text-graay-500 font-medium text-lg sm:text-xl ">
                    @{data?.username}
                  </p>
                  <span className="flex items-center justify-center text-primary-800 text-xs font-bold gap-2 bg-primary-200 py-1 px-3 rounded-full w-fit">
                    <FiUsers />
                    FluxCircle member
                  </span>
                </div>
              </div>

              {/* 2nd section => profile stats */}
              <div className="grid grid-cols-12 gap-3 mt-5 lg:w-130">
                {profileState.map((item) => (
                  <div className="col-span-4 p-3 border text-center border-gray-200 rounded-2xl">
                    <p className="text-xs font-bold text-graay-500 uppercase">
                      {item.label}
                    </p>
                    <span className="font-black text-2xl sm:text-3xl ">{item.value}</span>
                  </div>
                ))}
              </div>
              </div> 

              <div className="lg:flex lg:gap-5">
                <div className="mt-5 rounded-2xl border border-gray-200 p-4 bg-graay-200 lg:flex-2">
                <h2 className="font-extrabold text-sm mb-2">About</h2>
                <span className="flex gap-1 items-center text-sm text-graay-800 mb-2">
                  <MdOutlineEmail /> {data?.email ?? "No email"}
                </span>
                <span className="flex gap-1 items-center text-sm text-graay-800">
                  <LuUsers />
                  Active on FluxCircle
                </span>
              </div>

              <div className="sm:grid sm:grid-cols-2 sm:gap-4 lg:flex lg:flex-col lg:gap-0 lg:flex-1">
                {postsInfo.map((item) => (
                <div className="mt-5 rounded-2xl border border-gray-200 p-4 bg-primary-50">
                  <h2 className="text-sm font-bold text-primary-900">
                    {item.label}
                  </h2>
                  <span className="font-black text-2xl ">
                    {item.value ?? 0}
                  </span>
                </div>
              ))}
              </div>
              </div>
            </div>
          </section>

          {/* second section  */}
          <section className="rounded-2xl border border-gray-200 p-3 bg-white mx-3 mt-5 sm:flex sm:items-center sm:justify-between">
            <div className="bg-graay-400 rounded-2xl p-1.5 grid grid-cols-2 ">
              <button
                onClick={() => setActive("My Posts")}
                className={`${active === "My Posts" ? "text-primary-700 bg-white" : " text-graay-600 bg-transparent"} text-sm font-bold flex items-center justify-center gap-1  py-2 px-4 rounded-lg ${active !== "My Posts" && "hover:text-black"}  hover:cursor-pointer`}
              >
                <IoDocumentTextOutline size={16} /> My Posts
              </button>
              <button
                onClick={() => setActive("Saved")}
                className={`${active === "Saved" ? "text-primary-700 bg-white" : " text-graay-600 bg-transparent"} text-sm font-bold flex items-center justify-center gap-1  py-2 px-4 rounded-lg ${active !== "Saved" && "hover:text-black"}  hover:cursor-pointer`}
              >
                <GoBookmark size={16} /> Saved
              </button>
            </div>

            <div>
              {active === "My Posts" ? (
              <span className="bg-primary-100 flex items-center justify-center rounded-full font-bold text-xs size-7 mt-3 text-primary-700">
                {postsInfo[0].value}
              </span>
            ) : (
              <span className="bg-primary-100 flex items-center justify-center rounded-full font-bold text-xs size-7 mt-3 text-primary-700">
                {postsInfo[1].value}
              </span>
            )}
            </div>
          </section>

          <section className="p-4 bg-white rounded-2xl border border-gray-200 mx-3 my-5">
  {active === "My Posts" ? (
    postsInfo[0].value === 0 ? (
      <span className="text-sm text-graay-500">You have not posted yet.</span>
    ) : (
      <StaticPost data={myPosts} isFetching={myPostFetching} refetch={myPostRefetch} />
    )
  ) : active === "Saved" ? (
    postsInfo[1].value === 0 ? (
      <span className="text-sm text-graay-500">No saved posts yet.</span>
    ) : (
      <StaticPost data={mySavedPosts} isFetching={isFetching} refetch={refetch} />
    )
  ) : null}
</section>
        </div>
      </main>
    </>
  );
}
