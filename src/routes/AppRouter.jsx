// src/routes/AppRouter.jsx
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import useUserStore from "../stores/userStore";
import App from "../App";
import Products from "../pages/Products";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import ProductList from "../pages/admin/ProductList";
import ProductForm from "../pages/admin/ProductForm";
import OrderList from "../pages/admin/OrderList";
import OrderDetail from "../pages/admin/OrderDetail";

const guestRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Products /> },
      { path: "/login", element: <p>login</p> },
      { path: "/register", element: <p>register</p> },
      { path: "*", element: <Navigate to="/login" /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Navigate to="/admin/dashboard" /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "products", element: <ProductList /> },
      { path: "products/add", element: <ProductForm /> },
      { path: "products/edit/:id", element: <ProductForm /> },
      { path: "orders", element: <OrderList /> },
      { path: "orders/pending", element: <OrderList /> },
      { path: "orders/delivered", element: <OrderList /> },
      { path: "orders/:id", element: <OrderDetail /> },
      { path: "customers", element: <p>Customer Management (Coming Soon)</p> },
    ],
  },
]);

// Create an admin router with authentication protection
const adminRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Products /> },
      { path: "/login", element: <p>login</p> },
      { path: "/register", element: <p>register</p> },
      { path: "*", element: <Navigate to="/login" /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Navigate to="/admin/dashboard" /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "products", element: <ProductList /> },
      { path: "products/add", element: <ProductForm /> },
      { path: "products/edit/:id", element: <ProductForm /> },
      { path: "orders", element: <OrderList /> },
      { path: "orders/pending", element: <OrderList /> },
      { path: "orders/delivered", element: <OrderList /> },
      { path: "orders/:id", element: <OrderDetail /> },
      { path: "customers", element: <p>Customer Management (Coming Soon)</p> },
    ],
  },
]);

export default function AppRouter() {
  const user = useUserStore((state) => state.user);
  // For now, we'll use guestRouter for all users
  // Later you can implement proper authentication checks
  // const finalRouter = user?.role === 'Admin' ? adminRouter : guestRouter;
  const finalRouter = guestRouter;

  return <RouterProvider key={user?.id} router={finalRouter} />;
}
