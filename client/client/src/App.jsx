import "./App.css";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Activation from "./Components/Activation";
import Home from "./Components/Home";
import { useEffect } from "react";
import Store from "./redux/store";
import { loadSeller, loadUser } from "./redux/actions/userActions";
import Header from "./HomeComp/Header";
import Footer from "./Components/Footer";
import ProductPage from "./Components/ProductPage";
import BestSellingPage from "./Pages/Others/BestSellingPage";
import EventPage from "./Pages/Others/EventPage";
import Faq from "./Pages/Others/Faq";
import ProductDetailsPage from "./product/ProductDetailsPage";
import Profile from "./profile/Profile";
import ShopCreate from "./vendor/ShopCreate";
import SellerActivation from "./vendor/SellerActivation";
import ShopLogin from "./vendor/ShopLogin";
import Shop from "./vendor/Shop";
import ShopDashboard from "./vendor/ShopDashboard";
import ShopCreateProduct from "./vendor/ShopCreateProduct";
import ShopAllProducts from "./vendor/ShopAllProducts";
import ShopEvent from "./vendor/Event/ShopEvent";
import ShopAllEvent from "./vendor/Event/ShopAllEvent";
import ShopCoupoun from "./vendor/CoupounCode/ShopCoupoun";
import Checkoutpage from "./Checkout/Checkoutpage";
import PaymentPage from "./Payment/PaymentPage";
import Success from "./Order/Success";
import ShopAllOrders from "./vendor/Allorders/ShopAllOrders";
import ShopOrderDetails from "./vendor/Allorders/ShopOrderDetails";
import UsersOrder from "./Order/UsersOrder";
import TrackOrder from "./Order/TrackOrder";
import AllRefunds from "./vendor/Refund/AllRefunds";
import ShopSettings from "./vendor/Settings/ShopSettings";
import AllWithraw from "./vendor/Withdraw/AllWithraw";
import AllShopInbox from "./vendor/ShopInbox/AllShopInbox";
import Inbox from "./Inbox/Inbox";

axios.defaults.baseURL = "http://localhost:8000/api/v2";
axios.defaults.withCredentials = true;

const Layout = () => {
  return (
    <div>
      <Header activeHeading={1} />
      <ScrollRestoration />
      <Outlet />
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/activation/:activation_token",
        element: <Activation />,
        caseSensitive: true,
      },
      {
        path: "/seller/activation/:activation_token",
        element: <SellerActivation />,
        caseSensitive: true,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/products",
        element: <ProductPage />,
      },
      {
        path: "/best-selling",
        element: <BestSellingPage />,
      },
      {
        path: "/events",
        element: <EventPage />,
      },
      {
        path: "/faq",
        element: <Faq />,
      },
      {
        path: "/product/:id",
        element: <ProductDetailsPage />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/shop-create",
        element: <ShopCreate />,
      },
      {
        path: "/shop-login",
        element: <ShopLogin />,
      },
      {
        path: "/shop/:id",
        element: <Shop />,
      },
      {
        path: "/shop/dashboard",
        element: <ShopDashboard />,
      },
      {
        path: "/shop/dashboard/create-product",
        element: <ShopCreateProduct />,
      },
      {
        path: "/shop/dashboard/products",
        element: <ShopAllProducts />,
      },
      {
        path: "/shop/dashboard/create-event",
        element: <ShopEvent />,
      },
      {
        path: "/shop/dashboard/events",
        element: <ShopAllEvent />,
      },
      {
        path: "/shop/dashboard/coupons",
        element: <ShopCoupoun />,
      },
      {
        path: "/shop/dashboard/orders",
        element: <ShopAllOrders />,
      },
      {
        path: "/checkout",
        element: <Checkoutpage />,
      },
      {
        path: "/payment",
        element: <PaymentPage />,
      },
      {
        path: "/order/success",
        element: <Success />,
      },
      {
        path: "/shop/order/:id",
        element: <ShopOrderDetails />,
      },
      {
        path: "/user/order/:id",
        element: <UsersOrder />,
      },
      {
        path: "/user/track-order/:id",
        element: <TrackOrder />,
      },
      {
        path: "/shop/dashboard/refunds",
        element: <AllRefunds />,
      },
      {
        path: "/shop/dashboard/settings",
        element: <ShopSettings />,
      },
      {
        path: "/shop/dashboard/withdraw-money",
        element: <AllWithraw />,
      },
      {
        path: "/shop/dashboard/messages",
        element: <AllShopInbox />,
      },
      {
        path: "/inbox",
        element: <Inbox />,
      },
    ],
  },
]);

function App() {
  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());
  }, []);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer theme="dark" position="bottom-center" />
    </>
  );
}

export default App;
