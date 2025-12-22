import { createBrowserRouter } from "react-router";
import HomepageLayout from "../Layout/HomepageLayout/HomepageLayout";
import Home from "../Components/Homepage/Home";
import Register from "../Components/Homepage/Register";
import Login from "../Components/Homepage/Login";
import DashBoardLayOut from "../Layout/DashboardLayout/DashboardLayout";
import Dashboard from "../Components/Dashboard/Dashboard";
import AddRequests from "../Components/Dashboard/AddRequests";
import MyRequests from "../Components/Dashboard/MyRequests";
import AllUsers from "../Components/Dashboard/AllUsers";
import Profile from "../Components/Dashboard/Profile";
import Blogs from "../Components/Homepage/Blogs";
import Fundings from '../Components/Homepage/Fundings'
import DonationRequests from "../Components/Homepage/DonationRequests";
import SearchRequests from "../Components/Homepage/SearchRequests";
import PrivateRoute from "../Provider/PrivateRoute";
import DonationRequestsDetails from "../Components/Homepage/DonationRequestsDetails";
import MyDonationRequests from "../Components/Dashboard/MyDonationRequests";
import PaymentCancelled from "../Components/Homepage/PaymentCancelled";
import PaymentSuccess from "../Components/Homepage/PaymentSuccess";


const router = createBrowserRouter([
    {
        path : "/",
        element : <HomepageLayout></HomepageLayout>,
        children :[
            {
                path :"/",
                element : <Home></Home>
            },
            {
                path:'/search-requests',
                element:<SearchRequests></SearchRequests>

            },
            {
                path :"/register",
                element :<Register></Register>
            },
            {
                path :"/login",
                element : <Login></Login>
            },
            {
                path: '/donation-requests',
                element:<DonationRequests></DonationRequests>
            },
            {
                path: '/request-details/:id',
                element:<PrivateRoute><DonationRequestsDetails></DonationRequestsDetails></PrivateRoute>
            },
            {
                path:'/create-payment-checkout',
                element: <PrivateRoute><Fundings></Fundings></PrivateRoute>
            },
             {
                path :'/payment-success',
                element: <PaymentSuccess></PaymentSuccess>
            },
            {
                path :'/payment-cancelled',
                element: <PaymentCancelled></PaymentCancelled>
            },
            { 
                path : '/blogs',
                element:<Blogs></Blogs>
            }

        ]
    },
    {
        path : 'dashboard',
        element : <PrivateRoute><DashBoardLayOut></DashBoardLayOut></PrivateRoute>,
        children : [
            {
                index :true,
                element : <Dashboard></Dashboard>
            },
            {
                path:"add-requests",
                element : <AddRequests></AddRequests>
            },
            {
                path : 'my-donation-requests',
                element : <MyDonationRequests></MyDonationRequests>
            },
            {
                path :"all-users",
                element : <AllUsers></AllUsers>
            },
            {
                path :"profile",
                element : <Profile></Profile>
            }
        ]

    }

])

export default router;