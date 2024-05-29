/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);

  if (loading === false) {
    if (!isAuthenticated) {
      return <Navigate to={"/login"} />;
    }
    return children;
  }

  // Add a fallback for the loading state
  return null; // or a loading indicator
};

export default ProtectedRoute;
