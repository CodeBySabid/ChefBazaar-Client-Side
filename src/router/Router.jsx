import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../page/home/Home/Home";
import Register from "../page/Auth/Register";
import Login from "../page/Auth/Login";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layout/DashboardLayout";
import Profile from "../page/Dashboard/Profile";
import MealDetails from "../page/MealDetails/MealDetails";
import MyReview from "../page/Dashboard/UserDashboard/MyReview";
import AllMeal from "../page/ShowAllMeal/AllMeal";
import OrderPage from "../page/OrderPage/OrderPage";
import AdminRouter from "./AdminRouter";
import UserRouter from "./UserRouter";
import UserFavoriteMeal from "../page/Dashboard/UserDashboard/UserFavoriteMeal";
import ManagerUser from "../page/Dashboard/AdminDashboard/ManagerUser";
import CreateMeals from "../page/Dashboard/ChefDashboard/CreateMeals";
import ChefRouter from "./ChefRouter";
import ChefMeals from "../page/Dashboard/ChefDashboard/ChefMeals";
import OrderRequests from "../page/Dashboard/ChefDashboard/OrderRequests";
import PlatformStatistics from "../page/Dashboard/AdminDashboard/PlatformStatistics/PlatformStatistics";
import MangerRequest from "../page/Dashboard/AdminDashboard/MangerRequest";
import UserOrder from "../page/Dashboard/UserDashboard/UserOrder";
import FraudPage from "../page/fraudPage/FraudPage";
import UpDateMeal from "../page/Dashboard/ChefDashboard/UpDateMeal";

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
                path: 'fraud',
                Component: FraudPage,
            },
            {
                path: 'meal-details/:id',
                element: <PrivateRoute><MealDetails></MealDetails></PrivateRoute>,
            },
            {
                path: 'order/:id',
                element: <PrivateRoute><OrderPage></OrderPage></PrivateRoute>,
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
                        element: <AdminRouter><ManagerUser></ManagerUser></AdminRouter>,
                    },
                    {
                        path: 'plat-form',
                        element: <AdminRouter><PlatformStatistics></PlatformStatistics></AdminRouter>,
                    },
                    {
                        path: 'manger-request',
                        element: <AdminRouter><MangerRequest></MangerRequest></AdminRouter>,
                    },
                    {
                        path: 'create-meal',
                        element: <ChefRouter><CreateMeals></CreateMeals></ChefRouter>
                    },
                    {
                        path: 'chef-meals',
                        element: <ChefRouter><ChefMeals></ChefMeals></ChefRouter>,
                    },
                    {
                        path: 'update-meals/:id',
                        element: <ChefRouter><UpDateMeal></UpDateMeal></ChefRouter>,
                    },
                    {
                        path: 'order-request',
                        element: <ChefRouter><OrderRequests></OrderRequests></ChefRouter>,
                    },
                    {
                        path: 'my-review',
                        element: <UserRouter><MyReview></MyReview></UserRouter>,
                    },
                    {
                        path: 'my-favorite',
                        element: <UserRouter><UserFavoriteMeal></UserFavoriteMeal></UserRouter> ,
                    },
                    {
                        path: 'my-order',
                        element: <UserRouter><UserOrder></UserOrder></UserRouter> ,
                    },
                ]
            },
        ]
    },

])