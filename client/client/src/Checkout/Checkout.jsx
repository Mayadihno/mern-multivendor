import React, { useState } from "react";
import styles from "../styles/styles";
import { useNavigate } from "react-router-dom";
import ShippingInfo from "./ShippingInfo";
import CartData from "./CartData";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
const Checkout = () => {
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const [couponCode, setCouponCode] = useState("");
  const [couponCodeData, setCouponCodeData] = useState(null);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [zipCode, setZipCode] = useState(null);
  const [userInfo, setUserInfo] = useState(false);
  const [discountPrice, setDiscountPrice] = useState(null);
  const navigate = useNavigate();

  const subTotalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = couponCode;
    await axios.get(`/coupon/get-coupon-value/${name}`).then((res) => {
      const shopId = res.data.couponCode?.shopId;
      const couponCodeValue = res.data.couponCode?.value;

      if (res.data.couponCode !== null) {
        const isCouponValid =
          cart && cart?.filter((item) => item.shopId === shopId);
        if (isCouponValid.length === 0) {
          toast.error("Coupon code does not valid for this shop");
          setCouponCode("");
        } else {
          const eligibleprice = isCouponValid.reduce(
            (acc, item) => acc + item.qty * item.discountPrice,
            0
          );
          const discountPrice = (eligibleprice * couponCodeValue) / 100;
          setDiscountPrice(discountPrice);
          setCouponCodeData(res.data?.couponCode);
          setCouponCode("");
        }
      }
      if (res.data.couponCode === null) {
        toast.error("Coupon Code doesn't exist");
        setCouponCode("");
      }
    });
  };
  const shipping = subTotalPrice * 0.1; // 0.1 is 10% of the goods bought
  const discountPercentage = couponCodeData ? discountPrice : "";
  const totalPrice = couponCodeData
    ? (subTotalPrice + shipping - discountPercentage).toFixed(2)
    : (subTotalPrice + shipping).toFixed(2);

  const paymentSubmit = () => {
    if (address1 === "" || address2 === "" || country === "" || city === "") {
      toast.error("Please choose your delivery address");
    } else {
      const shippingAddress = {
        address1,
        address2,
        country,
        city,
        zipCode,
      };
      const orderData = {
        cart,
        totalPrice,
        subTotalPrice,
        discountPrice,
        shipping,
        user,
        shippingAddress,
      };
      //update local storage with latest order data
      localStorage.setItem("latestOrder", JSON.stringify(orderData));
      navigate("/payment");
    }
  };
  return (
    <React.Fragment>
      <div className="w-full flex flex-col items-center py-8">
        <div className="block w-[90%] 1000px:w-[70%] 800px:flex">
          <div className="w-full 800px:w-[65%]">
            <ShippingInfo
              country={country}
              setCountry={setCountry}
              setCity={setCity}
              city={city}
              setAddress1={setAddress1}
              address1={address1}
              setAddress2={setAddress2}
              address2={address2}
              zipCode={zipCode}
              setZipCode={setZipCode}
              setUserInfo={setUserInfo}
              userInfo={userInfo}
            />
          </div>
          <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
            <CartData
              handleSubmit={handleSubmit}
              totalPrice={totalPrice}
              shipping={shipping}
              subTotalPrice={subTotalPrice}
              couponCode={couponCode}
              setCouponCode={setCouponCode}
              discountPercentage={discountPercentage}
            />
          </div>
        </div>
        <div
          className={`${styles.button} w-[150px] mt-10 800px:w-[280px]`}
          onClick={paymentSubmit}
        >
          <h5 className="text-white">Go to payment</h5>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Checkout;
