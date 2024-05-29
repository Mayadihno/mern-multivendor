/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "./Components/Loader";

const SellerProtectedRoute = ({ children }) => {
  const { isLoading, isSellerAuthenticated } = useSelector(
    (state) => state.seller
  );

  if (isLoading === true) {
    return <Loader />;
  } else {
    if (!isSellerAuthenticated) {
      return <Navigate to={"/shop-login"} />;
    }
    return children;

    // Add a fallback for the loading state
    // return null; // or a loading indicator
  }
};

export default SellerProtectedRoute;
