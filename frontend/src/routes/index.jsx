import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Dashboard from "../pages/Dashboard";
import CategoriesIndex from "../pages/Categories/Index";
import CategoriesCreate from "../pages/Categories/Create";
import ProductsIndex from "../pages/Products/Index";
import ProductsCreate from "../pages/Products/Create";
import ProductsEdit from "../pages/Products/Edit";
import ClientsIndex from "../pages/Clients/Index";
import OrdersIndex from "../pages/Orders/Index";
import OrdersCreate from "../pages/Orders/Create";
import OrdersShow from "../pages/Orders/Show";
import CategoriesEdit from "../pages/Categories/Edit";
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
                path: "categories/create",
                element: <CategoriesCreate />,
            },

            {
                path: "categories/:id/edit",
                element: <CategoriesEdit />,
            },
            {
                path: "products",
                element: <ProductsIndex />,
            },
            {
                path: "products/create",
                element: <ProductsCreate />,
            },
            {
                path: "products/:id/edit",
                element: <ProductsEdit />,
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
