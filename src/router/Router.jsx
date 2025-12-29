import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../page/home/Home/Home";
import Login from "../page/Auth/LoginModal";
import Register from "../page/Auth/RegisterModal";

export const router = createBrowserRouter([
    {
       path: "/",
       Component: RootLayout,
       children: [
        {
            index: true,
            Component: Home
        },
        {
            path: 'login',
            Component: Login
        },
        {
            path: 'register',
            Component: Register,
        }
       ]
    }
])