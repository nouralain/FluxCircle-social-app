import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/auth/Login/Login";
import Register from "../pages/auth/Register/Register";
import Posts from "../pages/posts/Posts";
import Landing from "../pages/landing/Landing";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "landing",
        element: <Landing />
      },
      {index:true,
        element: <Landing/>
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      }
    ]
  }
])
