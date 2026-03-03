import { RouterProvider } from "react-router";
import { router } from "./routes/AppRoutes"; 
import { Toaster } from "react-hot-toast";

export default function App() {
  return(
    <>
    
    <RouterProvider router={router}/>
    <Toaster position="top-center" />

    </>
   )
}