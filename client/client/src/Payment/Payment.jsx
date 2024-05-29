/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import PaymentInfo from "./PaymentInfo";
import {
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import { useSelector } from "react-redux";
import CheckoutSteps from "../Checkout/CheckoutSteps";
import CartDatas from "./CartDatas";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Payment = ({ stripeApiKey }) => {
  const { user } = useSelector((state) => state.user);
  const [orderData, setOrderData] = useState([]);
  const [open, setOpen] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem("latestOrder"));
    setOrderData(orderData);
  }, []);

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: "Sunflower",
            amount: {
              currency_code: "USD",
              value: orderData?.totalPrice,
            },
          },
        ],
        // not needed if a shipping address is actually needed
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
      })
      .then((orderID) => {
        return orderID;
      });
  };

  const onApprove = async (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;

      let paymentInfo = payer;

      if (paymentInfo !== undefined) {
        paypalPaymentHandler(paymentInfo);
      }
    });
  };

  const paypalPaymentHandler = async (paymentInfo) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    order.paymentInfo = {
      id: paymentInfo.payer_id,
      status: "succeeded",
      type: "Paypal",
    };

    await axios.post("/order/create-order", order, config).then((res) => {
      setOpen(false);
      navigate("/order/success");
      toast.success("Order Successful!!!");
      localStorage.setItem("cartItems", JSON.stringify([]));
      localStorage.setItem("latestOrder", JSON.stringify([]));
      console.log(res);
      window.location.reload();
    });
  };

  const paymentData = {
    amount: Math.round(orderData?.totalPrice * 100),
  };

  const order = {
    cart: orderData?.cart,
    shippingAddress: orderData?.shippingAddress,
    user: user && user,
    totalPrice: orderData?.totalPrice,
  };

  const paymentHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/payment/payment-process",
        paymentData,
        config
      );

      const client_secret = data.client_secret;
      if (!stripe || !elements) return;
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
        },
      });

      if (result.error) {
        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
            type: "Credit Card",
          };
          await axios.post("/order/create-order", order, config).then((res) => {
            setOpen(false);
            navigate("/order/success");
            toast.success("Order Successful!!!");
            localStorage.setItem("cartItems", JSON.stringify([]));
            localStorage.setItem("latestOrder", JSON.stringify([]));
            console.log(res);
            window.location.reload();
          });
        }
      }
    } catch (error) {
      toast.error(error);
    }
  };
  const cashOnDeliveryHandler = async (e) => {
    e.preventDefault();
    order.paymentInfo = {
      type: "Cash on delivery",
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios.post("/order/create-order", order, config).then((res) => {
      setOpen(false);
      navigate("/order/success");
      toast.success("Order Successful!!!");
      localStorage.setItem("cartItems", JSON.stringify([]));
      localStorage.setItem("latestOrder", JSON.stringify([]));
      console.log(res);
      window.location.reload();
    });
  };
  return (
    <React.Fragment>
      {stripeApiKey && (
        <>
          <CheckoutSteps active={2} />
          <div className="w-full flex flex-col items-center py-8">
            <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
              <div className="w-full 800px:w-[65%]">
                <PaymentInfo
                  user={user}
                  setOpen={setOpen}
                  open={open}
                  createOrder={createOrder}
                  onApprove={onApprove}
                  paymentHandler={paymentHandler}
                  cashOnDeliveryHandler={cashOnDeliveryHandler}
                  paypalPaymentHandler={paypalPaymentHandler}
                />
              </div>
              <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
                <CartDatas orderData={orderData} />
              </div>
            </div>
          </div>
        </>
      )}
    </React.Fragment>
  );
};

export default Payment;
