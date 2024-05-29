import React from "react";
import CheckoutSteps from "./CheckoutSteps";
import Checkout from "./Checkout";
import ProtectedRoute from "../ProtectedRoute";

const Checkoutpage = () => {
  return (
    <React.Fragment>
      <ProtectedRoute>
        <CheckoutSteps active={1} />
        <Checkout />
      </ProtectedRoute>
    </React.Fragment>
  );
};

export default Checkoutpage;
