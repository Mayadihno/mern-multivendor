/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../styles/styles";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { backend } from "../../../server";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/actions/cartAction";
import { toast } from "react-toastify";
import { addToWishlist, removeFromWishlist } from "../redux/actions/wishlist";

const ProductDetailsCard = ({ setOpen, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const dispatch = useDispatch();
  //const [select, setSelect] = useState(false);
  const handleMessageSubmit = () => {};

  const decrementCount = () => {
    setCount((prev) => (prev === 1 ? 1 : prev - 1));
  };
  const incrementCount = () => {
    setCount((prev) => prev + 1);
  };
  const addToCartHandler = (id) => {
    const isItemExist = cart && cart.find((i) => i._id === id);
    if (isItemExist) {
      toast.error("Item already exist in cart");
    } else {
      if (data.stock < count) {
        toast.error("Product Stock Limited");
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addToCart(cartData));
        toast.success("Item added to cart successfully");
      }
    }
  };
  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);
  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };
  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };
  return (
    <React.Fragment>
      <div className=" bg-white">
        {data ? (
          <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-50 flex justify-center items-center">
            <div className=" relative w-[90%] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-md p-4 shadow-sm">
              <RxCross1
                size={30}
                className="absolute right-3 top-3 z-50"
                onClick={() => setOpen(false)}
              />
              <div className="block w-full 800px:flex">
                <div className="w-full 800px:w-[50%]">
                  <img
                    src={`${backend}${data?.image && data?.image[0]}`}
                    alt=""
                  />
                  <div className="flex">
                    <img
                      src={`${backend}${data?.shop?.avatar}`}
                      className="w-[50px] h-[50px] mr-2 rounded-full"
                      alt=""
                    />
                    <div className="">
                      <h3 className={`${styles.shop_name}`}>
                        {data.shop.shopName}
                      </h3>
                      <h5 className="pb-3 text-[15px]">
                        ({data.shop.ratings}) Ratings
                      </h5>
                    </div>
                  </div>
                  <div
                    onClick={handleMessageSubmit}
                    className={`${styles.button} rounded-[4px] bg-black mt-4 h-11`}
                  >
                    <span className="flex items-center text-white">
                      Send Message <AiOutlineMessage className="ml-1" />
                    </span>
                  </div>
                  <h5 className="text-[16px] text-[red] mt-5">
                    ({data.sold_out}) sold out
                  </h5>
                </div>
                <div className="w-full pt-5 800px:w-[50%] pl-[5px] pr-[5px] ">
                  <h1 className={`${styles.productTitle} text-[20px]`}>
                    {data.name}
                  </h1>
                  <p className="mt-1">{data.description}</p>
                  <div className="flex pt-3">
                    <h4 className={`${styles.productDiscountPrice}`}>
                      ${data.discountPrice}
                    </h4>
                    <h3 className={`${styles.price}`}>
                      {data.originalPrice ? data.originalPrice + "$" : null}
                    </h3>
                  </div>
                  <div className="flex items-center justify-between pr-3">
                    <div>
                      <button
                        className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                        onClick={decrementCount}
                      >
                        -
                      </button>
                      <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                        {count}
                      </span>
                      <button
                        className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                        onClick={incrementCount}
                      >
                        +
                      </button>
                    </div>
                    <div className="">
                      {click ? (
                        <AiFillHeart
                          size={30}
                          onClick={() => removeFromWishlistHandler(data)}
                          className=" cursor-pointer "
                          title="Remove from wishlist"
                          color={click ? "red" : "#333"}
                        />
                      ) : (
                        <AiOutlineHeart
                          size={30}
                          onClick={() => addToWishlistHandler(data)}
                          className=" cursor-pointer"
                          title="Add from wishlist"
                          color={click ? "red" : "#333"}
                        />
                      )}
                    </div>
                  </div>
                  <div
                    className={`${styles.button} mt-6 rounded-[4px] h-11 flex items-center`}
                    onClick={() => addToCartHandler(data._id)}
                  >
                    <span className=" text-white flex items-center">
                      Add to cart <AiOutlineShoppingCart className="ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </React.Fragment>
  );
};

export default ProductDetailsCard;
