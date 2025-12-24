import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";

export const router = createBrowserRouter([
    {
       index: true,
       Component: RootLayout,

    }
])