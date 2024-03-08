import { createBrowserRouter, Navigate } from "react-router-dom";
import DeafultLayout from "./components/DeafultLayout";
import GuestLayout from "./components/GuestLayout";
import Login from "./views/Login";
import Home from "./views/Home";
import NotFound from "./views/NotFound";
import Order from "./views/Order";
import Signup from "./views/Signup";


const router = createBrowserRouter([
  {
    path: "/",
    element: <DeafultLayout />,
    children: [
        {
            path: "/",
            element: <Home/>
        },
        {
            path: "/home",
            element: <Home/>
        },
        {
            path: "/order",
            element: <Order/>
        }
    ],
  },

  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup/>,
      }
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  }
]);

export default router;