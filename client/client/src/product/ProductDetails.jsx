/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import styles from "../styles/styles";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import ProductDetailsInfo from "./ProductDetailsInfo";
import { backend } from "../../../server";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../redux/actions/productActions";
import { addToWishlist, removeFromWishlist } from "../redux/actions/wishlist";
import { toast } from "react-toastify";
import { addToCart } from "../redux/actions/cartAction";
import axios from "axios";

const ProductDetails = ({ data }) => {
  const { products } = useSelector((state) => state.products);
  const { cart } = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { wishlist } = useSelector((state) => state.wishlist);
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(data && data.shop._id));
  }, [dispatch, data]);

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data?._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);
  const decrementCount = () => {
    setCount((prev) => (prev === 1 ? 1 : prev - 1));
  };
  const incrementCount = () => {
    setCount((prev) => prev + 1);
  };
  const handleMessageSubmit = async () => {
    if (isAuthenticated) {
      const groupTitle = data._id + user?._id;
      const sellerId = data.shop?._id;
      const userId = user?._id;
      await axios
        .post("/conversation/create-new-conversation", {
          groupTitle,
          sellerId,
          userId,
        })
        .then((res) => {
          navigate(`/conversation/${res.data.conversation?._id}`);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else {
      toast.error("Login to start conversation with this seller");
    }
  };
  const addToCartHandler = (id) => {
    console.log("from here");
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

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };
  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };
  const totalProductReview =
    products &&
    products.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );

  const avgRating = totalRatings / totalProductReview || 0;
  return (
    <React.Fragment>
      <div className=" bg-white pb-10">
        {data ? (
          <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
            <div className=" w-full py-5">
              <div className="block w-full 800px:flex">
                {/* <div className="w-full 800px:w-[50%]">
                  <img
                    // src={`${backend}${data?.image && data?.image[0]}`}
                    src={`${backend}${data.image && data?.image[select]}`}
                    alt=""
                    className="w-[80%]"
                  />
                  <div className="flex w-full">
                    <div
                      className={`${
                        select === 0 ? "border" : "null"
                      } cursor-pointer`}
                    >
                      <img
                        src={`${backend}${data?.image && data?.image[0]}`}
                        alt=""
                        className="h-[180px]"
                        onClick={() => setSelect(0)}
                      />
                    </div>
                    <div
                      className={`${
                        select === 1 ? "border" : "null"
                      } cursor-pointer`}
                    >
                      <img
                        src={`${backend}${data?.image && data?.image[1]}`}
                        alt=""
                        className="h-[180px]"
                        onClick={() => setSelect(1)}
                      />
                    </div>
                    <div
                      className={`${
                        select === 2 ? "border" : "null"
                      } cursor-pointer`}
                    >
                      <img
                        src={`${backend}${data?.image && data?.image[2]}`}
                        alt=""
                        className="h-[180px]"
                        onClick={() => setSelect(2)}
                      />
                    </div>
                  </div>
                </div> */}
                <div className="w-full 800px:w-[50%]">
                  <img
                    src={`${backend}${data && data.image[select]}`}
                    alt=""
                    className="w-[80%]"
                  />
                  <div className="w-full flex mr-2">
                    {data &&
                      data.image.map((i, index) => (
                        <div
                          key={index}
                          className={`${
                            select === 0 ? "border" : "null"
                          } cursor-pointer`}
                        >
                          <img
                            src={`${backend}${i}`}
                            alt=""
                            className="h-[200px] overflow-hidden mr-3 mt-3"
                            onClick={() => setSelect(index)}
                          />
                        </div>
                      ))}
                    <div
                      className={`${
                        select === 1 ? "border" : "null"
                      } cursor-pointer`}
                    ></div>
                  </div>
                </div>
                <div className="w-full 800px:w-[50%] pt-5">
                  <h1 className={`${styles.productTitle}`}>{data.name}</h1>
                  <p>{data.description}</p>
                  <div className="flex pt-3">
                    <h4 className={`${styles.productDiscountPrice}`}>
                      ${data.discountPrice}
                    </h4>
                    <h3 className={`${styles.price}`}>
                      {data.originalPrice ? data.originalPrice + "$" : null}
                    </h3>
                  </div>
                  <div className="flex items-center justify-between pr-3 mt-5">
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
                    className={`${styles.button} mt-6 !rounded !h-11 flex items-center`}
                    onClick={() => addToCartHandler(data._id)}
                  >
                    <span className="text-white flex items-center">
                      Add to cart
                      <AiOutlineShoppingCart className="ml-1" />
                    </span>
                  </div>
                  <div className="flex items-center pt-8">
                    <Link to={`/shop/${data.shop._id}`}>
                      <img
                        src={`${backend}${data?.shop?.avatar}`}
                        alt=""
                        className="w-[50px] h-[50px] rounded-full"
                      />
                    </Link>
                    <div className=" pl-3">
                      <h3 className={`${styles.shop_name} pb-1 pt-1`}>
                        <Link to={`/shop/${data.shop._id}`}>
                          {data.shop.shopName}
                        </Link>
                      </h3>
                      <h5 className="pb-3 text-[15px]">
                        ({avgRating.toFixed(1)} / 5) Ratings
                      </h5>
                    </div>
                    <div
                      className={`${styles.button} bg-[#6443d1] mt-4 ml-4 !rounded !h-11`}
                      onClick={handleMessageSubmit}
                    >
                      <span className="flex items-center text-white">
                        Send Message <AiOutlineMessage className="ml-1" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ProductDetailsInfo data={data} products={products} />
          </div>
        ) : null}
      </div>
    </React.Fragment>
  );
};

export default ProductDetails;
