/* eslint-disable react/prop-types */
import React from "react";
import styles from "../styles/styles";
import CountDown from "./CountDown";
import { backend } from "../../../server";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { addToCart } from "../redux/actions/cartAction";
import { useDispatch, useSelector } from "react-redux";

const EventCard = ({ active, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const handleAddToCart = (data) => {
    const isItemExist = cart && cart.find((i) => i._id === data._id);
    if (isItemExist) {
      toast.error("Item already exist in cart");
    } else {
      const cartData = { ...data, qty: 1 };
      dispatch(addToCart(cartData));
      toast.success("Item added to cart successfully");
    }
  };
  return (
    <React.Fragment>
      <div
        className={`w-full block bg-white rounded-lg ${
          active ? "unset" : "mb-12"
        } lg:flex p-2 `}
      >
        <div className="w-full lg:w-[50%] m-auto">
          <img src={`${backend}${data?.image[0]}`} alt="" />
        </div>
        <div className="w-full lg:w-[50%] flex flex-col justify-center">
          <h2 className={`${styles.productTitle}`}>{data?.name}</h2>
          <p>{data?.description}</p>
          <div className="flex py-2 justify-between">
            <div className="flex">
              <h5 className=" font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
                ${data?.originalPrice}
              </h5>
              <h5 className="font-bold text-[20px] font-Roboto text-[#333]">
                ${data?.discountPrice}
              </h5>
            </div>
            <span className=" pr-3 font-[400] text-[17px] text-[#44a55e]">
              120 sold
            </span>
          </div>
          <CountDown data={data} />
          <br />
          <div className="flex items-center">
            <Link to={`/product/${data?._id}?isEvent=true`}>
              <div className={`${styles.button} text-white`}>See Details</div>
            </Link>
            <div
              className={`${styles.button} text-white ml-5`}
              onClick={() => handleAddToCart(data)}
            >
              Add to cart
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default EventCard;
