import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Dashboard from "../pages/Dashboard";
import CategoriesIndex from "../pages/Categories/Index";
import ProductsIndex from "../pages/Products/Index";
import ClientsIndex from "../pages/Clients/Index";
import OrdersIndex from "../pages/Orders/Index";
import OrdersCreate from "../pages/Orders/Create";
import OrdersShow from "../pages/Orders/Show";

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
            {
                path: "products",
                element: <ProductsIndex />,
            },
            {
                path: "clients",
                element: <ClientsIndex />,
            },
            {
                path: "orders",
                element: <OrdersIndex />,
            },
            {
                path: "orders/create",
                element: <OrdersCreate />,
            },
            {
                path: "orders/:id",
                element: <OrdersShow />,
            },
        ],
    },
]);
