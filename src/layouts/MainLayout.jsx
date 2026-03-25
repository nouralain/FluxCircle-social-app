
import { Outlet } from "react-router-dom";
import AppNavbar from "../components/Navbar/AppNavbar";


export default function MainLayout() {
  return (
    <>
     
      <AppNavbar />
      <main className=" overflow-hidden  min-h-screen " >
        <Outlet />
      </main>
      
     
    </>
  );
}
