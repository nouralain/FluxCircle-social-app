import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/auth/Login/Login";
import Register from "../pages/auth/Register/Register";
import Landing from "../pages/landing/Landing";
import Home from "../pages/home/Home";
import ProtectedRoute from "./ProtectedRoute";
import AuthLayout from "../layouts/AuthLayout";
import ProtectedAuthRoute from "./ProtectedAuthRoute";
import ForgetPassword from './../pages/forgetPass/ForgetPassword';
import Profile from './../pages/profile/Profile';
import Notification from "../pages/notification/notification";
import PostDetails from "../pages/postDetails/PostDetails";

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: "landing",
        element:<ProtectedAuthRoute><Landing /></ProtectedAuthRoute>
      },
      {index:true,
        element: <ProtectedAuthRoute><Landing /></ProtectedAuthRoute>
      },
      {
        path: "login",
        element: <ProtectedAuthRoute><Login /></ProtectedAuthRoute>
      },
      {
        path: "register",
        element: <ProtectedAuthRoute><Register /></ProtectedAuthRoute>
      },
      
    ]
  },
  {path:"" ,element:<MainLayout/> , children:[
    {
        path: "feed",
        element: <ProtectedRoute><Home /></ProtectedRoute>
      },{
         path: "profile",
        element: <ProtectedRoute><Profile /></ProtectedRoute>
      },{
         path: "notification",
        element: <ProtectedRoute><Notification /></ProtectedRoute>
      },
      {
        path: "settings",
        element: <ProtectedRoute><ForgetPassword /></ProtectedRoute>
      },
      {
        path: "posts/:postId",
        element: <ProtectedRoute><PostDetails /></ProtectedRoute>
      },
  ]}
])
