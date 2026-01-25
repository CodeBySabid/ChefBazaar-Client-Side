import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../page/home/Home/Home";
import Register from "../page/Auth/Register";
import Login from "../page/Auth/Login";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layout/DashboardLayout";
import Profile from "../page/Dashboard/Profile";
import ManagerUser from "../page/Dashboard/AdminDashboard/ManagerUser/ManagerUser";
import MealDetails from "../page/MealDetails/MealDetails";
import ChefRequests from "../page/home/ChefRequests/ChefRequests";
import MyReview from "../page/Dashboard/UserDashboard/MyReview";
import AllMeal from "../page/ShowAllMeal/AllMeal";
import OrderPage from "../page/OrderPage/OrderPage";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: 'all-meal',
                Component: AllMeal,
            },
            {
                path: 'meal-details/:id',
                element: <PrivateRoute><MealDetails></MealDetails></PrivateRoute>
            },
            {
                path: 'order/:id',
                element: <PrivateRoute><OrderPage></OrderPage></PrivateRoute>
            },
            {
                path: 'login',
                Component: Login,
            },
            {
                path: 'register',
                Component: Register,
            },
            {
                path: '/dashboard',
                element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
                children: [
                    {
                        path: 'profile',
                        Component: Profile,
                    },
                    {
                        path: 'manager_page',
                        Component: ManagerUser
                    },
                    {
                        path: 'be-a-chef',
                        element: <ChefRequests></ChefRequests>,
                    },
                    {
                        path: 'my-review',
                        Component: MyReview,
                    },
                ]
            },
        ]
    },

])