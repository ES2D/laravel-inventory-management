import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Dashboard from "../pages/Dashboard";
import CategoriesIndex from "../pages/Categories/Index";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Dashboard />,
            },
            {
                path: "categories",
                element: <CategoriesIndex />,
            },
        ],
    },
]);
