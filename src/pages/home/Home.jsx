import { useState } from "react";
import CreatePost from "../../components/Shared/CreatePost";
import { LuNewspaper, LuSparkles, LuUsersRound } from "react-icons/lu";
import MyButton from "../../components/Shared/Button";
import { IoEarthOutline } from "react-icons/io5";
import { FaRegBookmark } from "react-icons/fa";
import { FeedPosts } from "../../components/Shared/postsQueries/Feed";
import { CommunityPosts } from "../../components/Shared/postsQueries/Community";
import { SavedPosts } from "../../components/Shared/postsQueries/Saved";
import { MyPosts } from "../../components/Shared/postsQueries/MyPosts";
import SuggestedFriends from "../../components/Shared/SuggestedFriends";


export default function Home() {
  
  // make btns active when i click on it and change its ui
  const [activeBtn, setActiveBtn] = useState("Feed");

  // open suggested friends menu when clicked
  const [openSuggestedFriends, setOpenSuggestedFriends] = useState(false);
  const menuItems = [
    { icon: <LuNewspaper />, label: "Feed" },
    { icon: <LuSparkles />, label: "My Posts" },
    { icon: <IoEarthOutline />, label: "Community" },
    { icon: <FaRegBookmark />, label: "Saved" },
  ]

  return (
    <>
      <div className="grid xl:grid-cols-12 mt-25 gap-4 max-w-7xl mx-auto px-4 mt-5">
        
        {/* feed-posts-community-saved */}
        <aside className="xl:col-span-3 xl:order-1 bg-white rounded-2xl grid grid-cols-2 gap-3 p-3 xl:block xl:h-fit ">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
               
                  setActiveBtn(item.label)
                
              }}
              className={`flex gap-2 items-center ${activeBtn === item.label ? "bg-primary-100 text-primary-700" : "bg-transparent text-black"} py-2 font-bold text-sm rounded-xl xl:py-2 xl:px-3 xl:justify-start hover:bg-graay-400 hover:cursor-pointer w-full mb-2`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </aside>

        {/* suggested friends */}
          <div className="xl:col-span-3 xl:order-3">
                    <MyButton event={()=>setOpenSuggestedFriends(!openSuggestedFriends)} styles={" bg-white rounded-2xl flex items-center justify-between py-2 px-3 w-full mb-3"}>
          <div className="flex items-center gap-2">
            <LuUsersRound className="text-primary-700" />
            <span className="font-extrabold text-sm text-black">Suggested Friends</span>
          </div>
          <div className="flex items-center">
            <span className="font-bold text-xs text-graay-800 bg-graay-400 flex items-center justify-center rounded-full w-6 h-6 me-2">5</span>
            <span className="font-bold text-xs text-primary-700">show</span>
          </div>
        </MyButton>
          {openSuggestedFriends &&
          <SuggestedFriends />
          }

          </div>
        {/* create posts & posts */}
        <section className="xl:col-span-6 xl:order-2">
          <CreatePost />
         {activeBtn === "Feed" && <FeedPosts />}
{activeBtn === "Community" && <CommunityPosts />}
{activeBtn === "My Posts" && <MyPosts />}
{activeBtn === "Saved" && <SavedPosts />}
        </section>

      </div>
    </>
  );
}