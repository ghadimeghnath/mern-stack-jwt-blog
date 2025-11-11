import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
const Client = lazy(() => import("../client/Client"));
const Admin = lazy(() => import("../admin/Admin"));
import Create from "../components/Create";
import Delete from "../components/Delete";
import Card from "../components/Card";
import Loding from "../components/Loding";
import Register from "../auth/Register";
import LogIn from "../auth/Login";
import ProtectedRoute from "../components/ProtectedRoute";
import AdminLogin from "../components/AdminLogin";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loding />}>
        <Client />
      </Suspense>
    ),
  },
  {
    path: "/profile/register",
    element: <Register />,
  },
  {
    path: "/profile/login",
    element: <LogIn />,
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },

  {
    path: "/admin",
    element: (
      <Suspense fallback={<Loding />}>
        <ProtectedRoute>
          <Admin/>
        </ProtectedRoute>
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <Card/>
      },
      {
        path: "/admin/create",
        element: (
          <Suspense fallback={<Loding />}>
            <Create />
          </Suspense>
        ),
      },
      {
        path: "/admin/delete",
        element: (
          <Suspense fallback={<Loding />}>
            <Delete />
          </Suspense>
        ),
      },
    ],
  },
]);
export default router;
