import React, { useEffect, useState } from "react";
import Payment from "./Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const PaymentPage = () => {
  const [stripeApiKey, setStripeApiKey] = useState("");
  async function getStripeApiKey() {
    const { data } = await axios.get("/payment/get-stripe-api-key");
    setStripeApiKey(data.stripeApiKey);
  }
  useEffect(() => {
    getStripeApiKey();
  }, []);

  return (
    <React.Fragment>
      <Elements stripe={loadStripe(stripeApiKey)}>
        <div className="">
          <Payment stripeApiKey={stripeApiKey} />
        </div>
      </Elements>
    </React.Fragment>
  );
};

export default PaymentPage;
