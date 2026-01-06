import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../page/home/Home/Home";
import Register from "../page/Auth/Register";
import Login from "../page/Auth/Login";
import MealDetails from "../page/MealDetails/MealDetails";

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
            path: 'fooddetails',
            Component: MealDetails,
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