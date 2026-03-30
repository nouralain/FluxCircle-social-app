import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/react";
import { useContext, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { GiHolosphere } from "react-icons/gi";
import MyButton from "../Shared/Button";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
import { authContext } from "./../../contexts/AuthContext";
import { FiHome } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
import avatar from "../../assets/default-profile.png";
import { useQuery } from "@tanstack/react-query";
import { profileData } from "../../api/auth.api";


export default function AppNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userLocation = useLocation();
  const { userToken , setUserToken } = useContext(authContext);

const {data} = useQuery({
  queryKey:["profile-data"],
  queryFn: profileData,
  select: (res) => res.data.data.user,
  enabled: !!userToken
})
function handleLogOut(){
  localStorage.removeItem("token")
  setUserToken(null)
}
  return (
    <>
      <Navbar
        isBordered
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        className=" backdrop-blur-3xl bg-white fixed top-0 left-0 w-full py-2 px-4 border-0 "
        classNames={{
          wrapper: "max-w-7xl  mx-auto",
        }}
      >
        {/*1 LOGO */}
        <NavbarContent className=" pr-3 flex-1" justify="center">
          <NavbarBrand>
            <NavLink
              to="/"
              className="font-extrabold text-black text-xl flex items-center gap-2"
            >
              <GiHolosphere size={35} color="blue" />
              <span className="hidden sm:inline">FluxCircle</span>
            </NavLink>
          </NavbarBrand>
        </NavbarContent>

        {/* TOGGLE BUTTON */}
        {!userToken && (
          <NavbarContent className="md:hidden text-black " justify="end">
            <NavbarMenuToggle className="hover:cursor-pointer"
              icon={
                isMenuOpen ? (
                  <RxCross2 size={20} />
                ) : (
                  <RxHamburgerMenu size={20} />
                )
              }
            />
          </NavbarContent>
        )}

        {/*2 account btns  */}
        {userToken &&  <NavbarContent
          justify="center"
          className="gap-0  bg-graay-200 rounded-xl border border-gray-200 px-2"
        >
          <NavbarItem>
            <NavLink
              to="/feed"
              className="flex items-center justify-center p-2"
            >
              {({ isActive }) => (
                <>
                  <FiHome color={isActive ? "blue" : "black"} size={20} />
                  <span
                    className={`hidden sm:inline  ms-2 font-extrabold text-sm hover:text-black ${isActive ? `text-primary-500` : `text-graay-800`}`}
                  >
                    Feed
                  </span>
                </>
              )}
            </NavLink>
          </NavbarItem>

          <NavbarItem>
            <NavLink
              to="/profile"
              className="flex items-center justify-center p-2"
            >
              {({ isActive }) => (
               <>
                <FaRegUser color={isActive ? "blue" : "black"} size={17} />
                 <span
                className={`hidden sm:inline ms-2 font-extrabold text-sm  hover:text-black ${isActive ? `text-primary-500` : `text-graay-800`}`}
              >
                Profile
              </span></>
              )}
             
            </NavLink>
          </NavbarItem>

          <NavbarItem>
            <NavLink
              to="/notification"
              className="flex items-center justify-center p-2"
            >
              {({ isActive }) => (
                <>
                <IoIosNotificationsOutline
                  color={isActive ? "blue" : "black"}
                  size={22}
                />
                 <span
                className={`hidden sm:inline ms-2 font-extrabold text-sm  hover:text-black ${isActive ? `text-primary-500` : `text-graay-800`}`}
              >
                Notifications
              </span></>
              )}
             
            </NavLink>
          </NavbarItem>
        </NavbarContent>}
       

        {/*3 SIGN UP AND SIGN IN BUTTONS */}
        {userToken ? (
          <NavbarContent justify="end" className="flex flex-1  ">
            <NavbarItem>
              <Dropdown placement="bottom-end">
                <DropdownTrigger className="cursor-pointer">
                  <div className="flex items-center gap-3 bg-graay-400 rounded-full border border-gray-300 py-1 px-3">
                    <Avatar
                      as="button"
                      className="transition-transform"
                      name="Jason Hughes"
                      size="sm"
                      src={avatar}
                    />
                    <span className="hidden md:inline font-semibold text-sm">
                      {data?.name}
                    </span>
                    <RxHamburgerMenu size={20} />
                  </div>
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-semibold">Signed in as</p>
                    <p className="font-semibold">{data?.email}</p>
                  </DropdownItem>
                  <DropdownItem
                    as={NavLink}
                    to="/profile"
                    
                    key="profile"
                  >
                    My Profile
                  </DropdownItem>
                  <DropdownItem as={NavLink} to="/settings" key="settings">
                    Settings
                  </DropdownItem>

                  <DropdownItem key="logout" color="danger" onClick={()=>handleLogOut()}>
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
          </NavbarContent>
        ) : (
          <NavbarContent justify="end" className="hidden md:flex">
            <NavbarItem>
              {userLocation.pathname === "/register" ? (
                <Button
                  as={NavLink}
                  className="bg-white text-lg py-5 px-7 font-semibold"
                  to="login"
                  variant="shadow"
                >
                  Log in
                </Button>
              ) : userLocation.pathname === "/login" ? (
                <Button
                  as={NavLink}
                  className="bg-white text-lg py-5 px-7 font-semibold"
                  to="register"
                  variant="shadow"
                >
                  Register
                </Button>
              ) : (
                <>
                  <MyButton
                    target={"/login"}
                    styles={
                      "w-fit bg-transparent text-black font-semibold text-sm md:text-base"
                    }
                  >
                    Login
                  </MyButton>
                  <MyButton
                    target={"/register"}
                    styles={
                      "w-fit px-7 py-5  rounded-full bg-[#6054EC] font-semibold text-sm md:text-base"
                    }
                  >
                    Get Started
                  </MyButton>
                </>
              )}
            </NavbarItem>
          </NavbarContent>
        )}

        {/* MOBILE VIEW MENU */}
        <NavbarMenu className="pt-7 bg-transparent backdrop-blur-xl ">
          {!!userToken || (
            <NavbarMenuItem className="w-full   py-2 px-4 hover:border-b hover:border-white/40  ">
              {userLocation.pathname === "/login" ? (
                <NavLink
                  onClick={() => {
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-white font-semibold "
                  to="register"
                  size="lg"
                >
                  Register
                </NavLink>
              ) : userLocation.pathname === "/register" ? (
                <NavLink
                  onClick={() => {
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-white font-semibold "
                  to="login"
                  size="lg"
                >
                  Log in
                </NavLink>
              ) : (
                <>
                  <MyButton
                    target={"/login"}
                    styles={
                      "w-full bg-transparent text-black font-semibold text-sm md:text-base"
                    }
                    event={() => setIsMenuOpen(false)}
                  >
                    Login
                  </MyButton>
                  <MyButton
                    target={"/register"}
                    styles={
                      "w-full px-7 py-5  rounded-full bg-[#6054EC] font-semibold text-sm md:text-base"
                    }
                    event={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </MyButton>
                </>
              )}
            </NavbarMenuItem>
          )}
        </NavbarMenu>
      </Navbar>
    </>
  );
}
