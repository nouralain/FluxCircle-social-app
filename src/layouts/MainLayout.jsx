
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import AppNavbar from "../components/Navbar/AppNavbar";

export default function MainLayout() {
  return (
    <>
     <AppNavbar />
      
      <main className=" overflow-auto  min-h-screen " >
        <Outlet />
      </main>
      
      <Footer />
    </>
  );
}
