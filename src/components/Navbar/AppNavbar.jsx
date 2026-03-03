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
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { GiHolosphere } from "react-icons/gi";
import MyButton from "../UI/Button";
export default function AppNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [token, setToken] = useState(null);
  const userLocation = useLocation();

  return (
    <>
      <Navbar
        isBordered
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        className=" backdrop-blur-3xl bg-transparent fixed top-0 left-0 w-full py-2"
      >
        {/* LOGO */}
        <NavbarContent className=" pr-3" justify="center">
          <NavbarBrand>
            <NavLink to="/" className="font-bold text-black text-xl flex items-center gap-2">
              <GiHolosphere size={35}/>

              FluxCircle
            </NavLink>
          </NavbarBrand>
        </NavbarContent>

        {/* TOGGLE BUTTON */}
        <NavbarContent className="md:hidden text-black" justify="end">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
        </NavbarContent>


        {/* links */}
        <NavbarContent className="hidden md:flex gap-4" justify="end">
          {/* {token && (
            <NavbarItem>
              <NavLink
                color="foreground"
                to="posts"
                className={({ isActive }) =>
                  isActive && "text-blue-500 font-bold"
                }
              >
                Posts
              </NavLink>
            </NavbarItem>
          )} */}
        
        </NavbarContent>

        {/* SIGN UP AND SIGN IN BUTTONS */}
        <NavbarContent justify="end" className="hidden md:flex">
          {token ? (
            <NavbarItem>
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    color="primary"
                    name="Jason Hughes"
                    size="sm"
                    src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-semibold">Signed in as</p>
                    <p className="font-semibold">zoey@example.com</p>
                  </DropdownItem>
                  <DropdownItem key="settings">My Settings</DropdownItem>
                  <DropdownItem key="team_settings">Team Settings</DropdownItem>
                  <DropdownItem key="analytics">Analytics</DropdownItem>
                  <DropdownItem key="system">System</DropdownItem>
                  <DropdownItem key="configurations">
                    Configurations
                  </DropdownItem>
                  <DropdownItem key="help_and_feedback">
                    Help & Feedback
                  </DropdownItem>
                  <DropdownItem key="logout" color="danger">
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
          ) : (
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
          )}
        </NavbarContent>

        {/* MOBILE VIEW MENU */}
        <NavbarMenu className="pt-7 bg-transparent backdrop-blur-xl ">
          {token ? (
            <NavbarMenuItem>
              <NavLink
                onClick={() => {
                  setIsMenuOpen(false);
                }}
                className="w-full py-2 px-4 hover:border-b hover:border-white/40"
                to="posts"
                size="lg"
              >
                Posts
              </NavLink>
            </NavbarMenuItem>
          ) : (
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
              ) : (
                userLocation.pathname === "/register" && (
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
                )
              )}
            </NavbarMenuItem>
          )}
        </NavbarMenu>
      </Navbar>
    </>
  );
}
