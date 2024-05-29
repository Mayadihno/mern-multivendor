/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { IoBagHandleOutline } from "react-icons/io5";
import styles from "../styles/styles";
import { FiMinus, FiPlus } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { backend } from "../../../server";
import { addToCart, removeFromCart } from "../redux/actions/cartAction";
import { toast } from "react-toastify";
const Cart = ({ setOpenCart }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const qtyChangeHandler = (data) => {
    dispatch(addToCart(data));
  };
  const removeCartHandler = (data) => {
    dispatch(removeFromCart(data));
    toast.success(`${data.name} removed from cart successfully`);
  };
  const totalPrices = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  return (
    <React.Fragment>
      <div className=" fixed top-0 left-0 w-full bg-[#0000004d] h-screen z-10">
        <div className="fixed top-0 right-0 h-[100vh] overflow-y-scroll w-[25%] bg-white flex-col flex justify-between shadow-sm">
          {cart && cart.length === 0 ? (
            <div className="flex w-full h-screen items-center justify-center">
              <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
                <RxCross1
                  size={25}
                  className=" cursor-pointer"
                  onClick={() => setOpenCart(false)}
                />
              </div>
              <h4>Cart Item is empty!</h4>
            </div>
          ) : (
            <div className="">
              <div className="flex justify-end pt-5 pr-5 w-full">
                <AiOutlineClose
                  size={25}
                  className=" cursor-pointer"
                  onClick={() => setOpenCart(false)}
                />
              </div>
              <div className={`${styles.normalFlex} p-4`}>
                <IoBagHandleOutline size={25} />
                <h5 className=" pl-2 text-[20px] font-[500]">
                  {cart?.length} items
                </h5>
              </div>
              <div className="w-full border-t">
                {cart &&
                  cart?.map((data, index) => {
                    return (
                      <div className="" key={data.price}>
                        <SingleCart
                          data={data}
                          key={index}
                          qtyChangeHandler={qtyChangeHandler}
                          removeCartHandler={removeCartHandler}
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
          <div className="px-5 mb-3">
            <Link to="/checkout">
              <div
                className={`h-[45px] flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px]`}
              >
                <h1
                  className="text-[#fff] text-[18px] font-[600]"
                  onClick={() => setOpenCart(false)}
                >
                  Checkout Now (${totalPrices})
                </h1>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const SingleCart = ({ data, removeCartHandler, qtyChangeHandler }) => {
  const [value, setValue] = useState(data.qty);
  const totalPrice = data.discountPrice * value;
  const increment = () => {
    setValue(value + 1);
    const updateCartData = { ...data, qty: value + 1 };
    qtyChangeHandler(updateCartData);
  };
  const decrement = () => {
    setValue(value === 1 ? 1 : value - 1);
    const updateCartData = { ...data, qty: value === 1 ? 1 : value - 1 };
    qtyChangeHandler(updateCartData);
  };
  const removeCartHandle = (data) => {
    removeCartHandler(data);
  };
  return (
    <div className="border p-4">
      <div className="w-full flex items-center">
        <div className="">
          <div
            className={`border w-[25px] h-[25px] justify-center cursor-pointer rounded-full bg-[#e44343] border-[#e4434373] ${styles.normalFlex}`}
            onClick={() => increment(data)}
          >
            <FiPlus size={18} color="#fff" />
          </div>
          <span className="pl-[10px]">{value}</span>
          <div
            className="flex items-center rounded-full w-[25px] h-[25px] justify-center cursor-pointer bg-[#a7abb14f]"
            onClick={() => decrement(data)}
          >
            <FiMinus size={18} color="#7d879c" />
          </div>
        </div>
        <img
          src={`${backend}${data?.image[0]}`}
          className="w-[80px] h-[80px] ml-5 rounded-md"
          alt=""
        />
        <div className="pl-[10px]">
          <h1>{data.name}</h1>
          <h4 className="font-[400] text-[15px] text-[#00000082]">
            ${data.discountPrice} * {value}
          </h4>
          <h4 className="font-[600] text-[17px] pt-[3px] font-Roboto text-[#d02222]">
            US${totalPrice}
          </h4>
        </div>
        <RxCross1
          className=" cursor-pointer flex justify-end"
          onClick={() => removeCartHandle(data)}
        />
      </div>
    </div>
  );
};

export default Cart;
