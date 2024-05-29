import React from "react";
import CheckoutSteps from "../Checkout/CheckoutSteps";

const Success = () => {
  return (
    <React.Fragment>
      <div className="mt-3">
        <CheckoutSteps active={3} />
        <h5 className="text-center mb-14 text-[25px] mt-10 text-[#000000a1]">
          Your order is successful 😍
        </h5>
        <br />
        <br />
      </div>
    </React.Fragment>
  );
};

export default Success;
