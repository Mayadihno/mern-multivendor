/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { AiOutlineClose, AiOutlineHeart } from "react-icons/ai";
import styles from "../styles/styles";
import { RxCross1 } from "react-icons/rx";
import { BsCartPlus } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { backend } from "../../../server";
import { removeFromWishlist } from "../redux/actions/wishlist";
import { toast } from "react-toastify";
import { addToCart } from "../redux/actions/cartAction";
const Wishlist = ({ setOpenWishList }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const removeCartHandler = (data) => {
    dispatch(removeFromWishlist(data));
    toast.success(`${data.name} removed from cart successfully`);
  };

  return (
    <React.Fragment>
      <div className=" fixed top-0 left-0 w-full bg-[#0000004d] h-screen z-10">
        <div className="fixed top-0 right-0 min-h-full w-[25%] bg-white flex-col flex justify-between shadow-sm">
          <div className="">
            <div className="flex justify-end pt-5 pr-5 w-full">
              <AiOutlineClose
                size={25}
                className=" cursor-pointer"
                onClick={() => setOpenWishList(false)}
              />
            </div>
            <div className={`${styles.normalFlex} p-4`}>
              <AiOutlineHeart size={25} />
              <h5 className=" pl-2 text-[20px] font-[500]">
                {wishlist.length} items
              </h5>
            </div>
            <div className="w-full border-t">
              {wishlist &&
                wishlist.map((data, index) => {
                  return (
                    <div className="" key={data.price}>
                      <SingleCart
                        data={data}
                        key={index}
                        removeCartHandler={removeCartHandler}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const SingleCart = ({ data, removeCartHandler }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [value, setValue] = useState(1);
  const totalPrice = data.discountPrice * value;
  const addToCartHandler = (id) => {
    const isItemExist = cart && cart.find((i) => i._id === id);
    if (isItemExist) {
      toast.error("Item already exist in cart");
    } else {
      if (data.stock < 1) {
        toast.error("Product Stock Limited");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addToCart(cartData));
        toast.success("Item added to cart successfully");
      }
    }
  };
  return (
    <div className="border p-4">
      <div className="w-full flex items-center justify-between">
        <RxCross1
          className=" cursor-pointer"
          onClick={() => removeCartHandler(data)}
        />
        <img
          src={`${backend}${data?.image[0]}`}
          className="w-[60px] h-[60px] ml-2 rounded-md"
          alt=""
        />
        <div className="pl-[5px]">
          <h1>{data.name}</h1>
          <h4 className="font-[600] text-[17px] pt-[3px] font-Roboto text-[#d02222]">
            US${totalPrice}
          </h4>
        </div>
        <BsCartPlus
          onClick={() => addToCartHandler(data._id)}
          size={20}
          className=" cursor-pointer"
          title="Add to cart"
        />
      </div>
    </div>
  );
};

export default Wishlist;
