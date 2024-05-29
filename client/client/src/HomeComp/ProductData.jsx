/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/styles";
import {
  AiFillHeart,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import ProductDetailsCard from "./ProductDetailsCard";
import { backend } from "../../../server";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../redux/actions/wishlist";
import { toast } from "react-toastify";
import { addToCart } from "../redux/actions/cartAction";
import Ratings from "../Components/Ratings";

const ProductData = ({ data, isEvent }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  //const d = data.name;
  //const product_name = d.replace(/\s+/g, "-");
  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  const addToCartHandler = (id) => {
    const isItemExist = cart && cart.find((i) => i._id === id);
    if (isItemExist) {
      toast.error("Item already exist in cart");
    } else {
      const cartData = { ...data, qty: 1 };
      dispatch(addToCart(cartData));
      toast.success("Item added to cart successfully");
    }
  };

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
      <div className="w-full cursor-pointer bg-white rounded-lg shadow-sm p-3 relative h-[370px]">
        <div className="flex justify-end"></div>
        <Link
          to={`${
            isEvent === true
              ? `/product/${data?._id}?isEvent=true`
              : `/product/${data?._id}`
          }`}
        >
          <img
            src={`${backend}${data?.image && data?.image[0]}`}
            alt=""
            className="w-full object-contain h-[170px]"
          />
        </Link>
        <Link to={`shop/${data?.shop?._id}`}>
          <h5 className={`${styles.shop_name}`}>{data?.shop?.name}</h5>
        </Link>
        <Link to={`/product/${data?._id}`}>
          <h4 className=" pb-3 font-[500]">
            {data?.name?.length > 40
              ? data?.name.slice(0, 40) + "..."
              : data?.name}
          </h4>
          <div className="flex">
            <Ratings rating={data.ratings} />
          </div>
          <div className="flex items-center justify-between py-2">
            <div className="flex">
              <h5 className={`${styles.productDiscountPrice}`}>
                $
                {data?.originalPrice === 0
                  ? data?.originalPrice
                  : data?.discountPrice}
              </h5>
              <h4 className={`${styles.price}`}>
                {data?.originalPrice ? data?.originalPrice + " $" : null}
              </h4>
            </div>
            <span className="font-[400] text-[17px] text-[#68d284]">
              {data?.sold_out} sold
            </span>
          </div>
        </Link>
        {/* side option */}
        <div className="">
          {click ? (
            <AiFillHeart
              size={22}
              onClick={() => removeFromWishlistHandler(data)}
              className=" cursor-pointer absolute right-2 top-5"
              title="Remove from wishlist"
              color={click ? "red" : "#333"}
            />
          ) : (
            <AiOutlineHeart
              size={22}
              onClick={() => addToWishlistHandler(data)}
              className=" cursor-pointer absolute right-2 top-5"
              title="Add from wishlist"
              color={click ? "red" : "#333"}
            />
          )}
          <AiOutlineEye
            size={22}
            onClick={() => setOpen(!open)}
            className=" cursor-pointer absolute right-2 top-14"
            title="Quick View"
            color="#333"
          />
          <AiOutlineShoppingCart
            size={22}
            onClick={() => addToCartHandler(data._id)}
            className=" cursor-pointer absolute right-2 top-24"
            title="Add to Cart"
            color="#444"
          />
          {open ? (
            <ProductDetailsCard open={open} setOpen={setOpen} data={data} />
          ) : null}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductData;
