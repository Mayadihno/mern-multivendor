/* eslint-disable react/prop-types */
import React, { useState } from "react";
import styles from "../styles/styles";
import { Link } from "react-router-dom";
import { backend } from "../../../server";
import Ratings from "../Components/Ratings";

const ProductDetailsInfo = ({ data, products }) => {
  const [active, setActive] = useState(1);
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
      <div className="px-3 bg-[#f5f6fb] 800px:px-10 py-2 rounded mt-5">
        <div className="flex w-full justify-between border-b pt-10 pb-2">
          <div className="relative">
            <h5
              className=" px-1 leading-5 text-[#000] text-[18px] font-[600] cursor-pointer 800px:text-[20px]"
              onClick={() => setActive(1)}
            >
              Product Details
            </h5>
            {active === 1 ? (
              <div className={`${styles.active_indicator}`} />
            ) : null}
          </div>
          <div className="relative">
            <h5
              className=" px-1 leading-5 text-[#000] text-[18px] font-[600] cursor-pointer 800px:text-[20px]"
              onClick={() => setActive(2)}
            >
              Product Reviews
            </h5>
            {active === 2 ? (
              <div className={`${styles.active_indicator}`} />
            ) : null}
          </div>
          <div className="relative">
            <h5
              className=" px-1 leading-5 text-[#000] text-[18px] font-[600] cursor-pointer 800px:text-[20px]"
              onClick={() => setActive(3)}
            >
              Seller Information
            </h5>
            {active === 3 ? (
              <div className={`${styles.active_indicator}`} />
            ) : null}
          </div>
        </div>
        {active === 1 ? (
          <div className="">
            <p className=" py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
              {data.description}
            </p>
          </div>
        ) : null}
        {active === 2 ? (
          <div className=" w-full flex flex-col items-center min-h-[40vh] py-3 overflow-y-scroll">
            {data &&
              data.reviews.map((item, index) => (
                <div key={index} className="w-full flex my-2">
                  <img
                    src={`${backend}/${item.user.avatar}`}
                    className="w-[50px] h-[50px] rounded-full"
                    alt=""
                  />
                  <div className="pl-2">
                    <div className="flex w-full items-center">
                      <h1 className="font-[500] capitalize mr-2">
                        {item.user.name}
                      </h1>
                      <Ratings rating={data.ratings} />
                    </div>
                    <p>{item.comment}</p>
                  </div>
                </div>
              ))}
            <div className="flex justify-center w-full">
              {data && data.reviews.length === 0 && (
                <h5>No reviews for this product</h5>
              )}
            </div>
          </div>
        ) : null}
        {active === 3 && (
          <div className="block w-full 800px:flex p-5">
            <div className="w-full 800px:w-[50%]">
              <div className="flex items-center">
                <img
                  src={`${backend}${data?.shop?.avatar}`}
                  className="w-[50px] h-[50px] rounded-full"
                  alt=""
                />
                <div className=" pl-3">
                  <h3 className={`${styles.shop_name} pb-1 pt-1`}>
                    {data?.shop?.shopName}
                  </h3>
                  <h5 className="pb-3 text-[15px]">
                    ({avgRating.toFixed(1)} / 5) Ratings
                  </h5>
                </div>
              </div>
              <p className="pt-2">{data.shop.description}</p>
            </div>
            <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex items-end flex-col">
              <div className="text-left">
                <h5 className="font-[600]">
                  Joined on:
                  <span className="font-[500] ml-1">
                    {data.shop?.createdAt?.slice(0, 10)}
                  </span>
                </h5>
                <h5 className="font-[600] pt-3">
                  Total Product:
                  <span className="font-[500] ml-1">
                    {products && products.length}
                  </span>
                </h5>
                <h5 className="font-[600] pt-3">
                  Total Reviews:
                  <span className="font-[500]">{totalProductReview}</span>
                </h5>
                <Link to={`/shop/${data.shop._id}`}>
                  <div
                    className={`${styles.button} !rounded-[4px] mt-3 !h-[39.5px]`}
                  >
                    <h4 className="text-white">Visit shop</h4>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default ProductDetailsInfo;
