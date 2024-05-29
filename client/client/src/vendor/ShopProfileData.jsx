/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import ProductData from "../HomeComp/ProductData";
import { Link, useParams } from "react-router-dom";
import styles from "../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../redux/actions/productActions";
import { getAlleventShop } from "../redux/actions/eventAction";
import { backend } from "../../../server";
import Ratings from "../Components/Ratings";

const ShopProfileData = ({ isOwner }) => {
  const { products } = useSelector((state) => state.products);
  const { events } = useSelector((state) => state.event);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [active, setActive] = useState(1);

  useEffect(() => {
    dispatch(getAllProductsShop(id));
    dispatch(getAlleventShop(id));
  }, [dispatch, id]);

  const allReviews =
    products && products.map((product) => product.reviews).flat();

  return (
    <React.Fragment>
      <div className="w-full">
        <div className="flex w-full items-center justify-between">
          <div className="flex w-full">
            <div className="flex items-center" onClick={() => setActive(1)}>
              <h5
                className={`cursor-pointer ${
                  active === 1 ? "text-red-500" : "text-[#333]"
                } text-[20xp] font-[500] pr-[20px]`}
              >
                Shop Prodcuts
              </h5>
            </div>
            <div className="flex items-center" onClick={() => setActive(2)}>
              <h5
                className={`cursor-pointer ${
                  active === 2 ? "text-red-500" : "text-[#333]"
                } text-[20xp] font-[500] pr-[20px]`}
              >
                Running Events
              </h5>
            </div>
            <div className="flex items-center" onClick={() => setActive(3)}>
              <h5
                className={`cursor-pointer ${
                  active === 3 ? "text-red-500" : "text-[#333]"
                } text-[20xp] font-[500] pr-[20px]`}
              >
                Shop Reviews
              </h5>
            </div>
          </div>
          {isOwner && (
            <div className="">
              <Link to={"/shop/dashboard"}>
                <div className={`${styles.button} !rounded-[4px] !h-[42px]`}>
                  <span className="text-white">Go Dashboard</span>
                </div>
              </Link>
            </div>
          )}
        </div>
        <br />
        {active === 1 && (
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
            {products &&
              products.map((i, index) => (
                <ProductData data={i} key={index} isShop={true} />
              ))}
          </div>
        )}
        {active === 2 && (
          <div className="w-full">
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
              {events &&
                events.map((i, index) => (
                  <ProductData
                    data={i}
                    key={index}
                    isShop={true}
                    isEvent={true}
                  />
                ))}
            </div>
            {events && events.length === 0 && (
              <h5 className="w-full text-center py-5 text-[18px]">
                No Events have for this shop!
              </h5>
            )}
          </div>
        )}
        {active === 3 && (
          <div className="w-full">
            {allReviews.map((item, index) => (
              <div key={index} className="w-full flex my-3">
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
                    <Ratings rating={item.rating} />
                  </div>
                  <p>{item.comment}</p>
                  <p className="text-[14px] text-[#0000008f]">
                    {item.createdAt
                      ? item.createdAt.slice(0, 10)
                      : "2 days ago"}
                  </p>
                </div>
              </div>
            ))}
            <div className="flex justify-center w-full">
              {allReviews.length === 0 && <h5>No reviews for this product</h5>}
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default ShopProfileData;
