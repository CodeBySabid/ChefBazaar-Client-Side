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
                path: 'meal-details',
                element: <PrivateRoute><MealDetails></MealDetails></PrivateRoute>
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
                    }
                ]
            },
            // {
            //     path: '/dashboards',
            //     Component: OrderRequests,
            // },
            // {
            //     path: 'admin_dashboard',
            //     element: <PrivateRoute><AdminLayout></AdminLayout></PrivateRoute>,
            //     children: [
            //         {
            //             path: '/admin_dashboard/admin_profile',
            //             Component: AdminProfile,
            //         },
            //         {
            //             path: '/admin_dashboard/manager_page',
            //             Component: ManagerUser,
            //         },
            //         {
            //             path: '/admin_dashboard/manager_request',
            //             Component: MangerRequest,
            //         },
            //         {
            //             path: '/admin_dashboard/admin_statistics',
            //             Component: PlatformStatistics,
            //         }
            //     ]
            // },
            // {
            //     path: 'user_dashboard',
            //     element: <PrivateRoute><UserLayout></UserLayout></PrivateRoute>,
            //     children: [
            //         {
            //             path: '/user_dashboard/user_profile',
            //             Component: AdminProfile,
            //         },
            //         {
            //             path: '/user_dashboard/orders_page',
            //             Component: ManagerUser,
            //         },
            //         {
            //             path: '/user_dashboard/review',
            //             Component: MangerRequest,
            //         },
            //         {
            //             path: '/user_dashboard/favorite',
            //             Component: PlatformStatistics,
            //         }
            //     ]
            // },
            // {
            //     path: 'chef_dashboard',
            //     element: <PrivateRoute><ChefLayout></ChefLayout></PrivateRoute>,
            //     children: [
            //     ]
            // },
            // {
            //     path: 'fooddetails',
            //     Component: MealDetails,
            // },
            // {
            //     path: '/orderpage',
            //     Component: OrderPage,
            // },
        ]
    },

])