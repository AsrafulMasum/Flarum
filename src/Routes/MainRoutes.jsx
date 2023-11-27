import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import LogIn from "../Pages/LogIn/LogIn";
import SignUp from "../Pages/SignUp/SignUp";
import Dashboard from "../Pages/Dashboard/Dashboard";
import UserDashboard from "../Pages/Dashboard/UserDashboard.jsx/UserDashboard";
import PrivateRoutes from "./PrivateRoutes";
import Membership from "../Pages/Membership/Membership";

const MainRoutes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "membership",
        element: (
          <PrivateRoutes>
            <Membership></Membership>
          </PrivateRoutes>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <Dashboard></Dashboard>
      </PrivateRoutes>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoutes>
            <UserDashboard></UserDashboard>
          </PrivateRoutes>
        ),
      },
      // {
      //   path: "payment",
      //   element: (
      //     <PrivateRoutes>
      //       <Payment></Payment>
      //     </PrivateRoutes>
      //   ),
      // },
      // {
      //   path: "payments/history",
      //   element: (
      //     <PrivateRoutes>
      //       <PaymentsHistory></PaymentsHistory>
      //     </PrivateRoutes>
      //   ),
      // },
    ],
  },
  {
    path: "/logIn",
    element: <LogIn></LogIn>,
  },
  {
    path: "/signUp",
    element: <SignUp></SignUp>,
  },
]);

export default MainRoutes;
