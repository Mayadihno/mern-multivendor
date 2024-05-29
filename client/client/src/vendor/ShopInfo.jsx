/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { backend } from "../../../server";
import styles from "../styles/styles";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../redux/actions/productActions";

const ShopInfo = ({ isOwner }) => {
  const { products } = useSelector((state) => state.products);
  const { seller } = useSelector((state) => state.seller);
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const dispatch = useDispatch();
  // const [isLoading, setIsLoading] = useState(false);
  const handleLogout = async () => {
    axios.get("/shop/shop-logout");
    navigate("/", { replace: true });
    window.location.reload();
  };
  useEffect(() => {
    dispatch(getAllProductsShop(seller?._id));
  }, []);

  useEffect(() => {
    axios
      .get(`shop/get-shop-info/${id}`)
      .then((res) => {
        setData(res.data.shop);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
      <div className="">
        <div className="w-full py-5">
          <div className="w-full flex justify-center items-center">
            <img
              src={`${backend}${data?.avatar}`}
              alt=""
              className="w-[150px] h-[150px] object-cover rounded-full"
            />
          </div>
          <h3 className=" text-center py-2 text-[20px]">{data?.shopName}</h3>
          <p className=" text-[16px] text-[#000000a6] flex items-center p-[10px]">
            {data?.description}
          </p>
        </div>
        <div className="p-1">
          <h5 className="font-[600]">Address</h5>
          <h4 className="text-[#000000a6]">{data?.address}</h4>
        </div>
        <div className="p-1">
          <h5 className="font-[600]">Phone Number</h5>
          <h4 className="text-[#000000a6]">{data?.phoneNumber}</h4>
        </div>
        <div className="p-1">
          <h5 className="font-[600]">Total Products</h5>
          <h4 className="text-[#000000a6]">{products && products.length}</h4>
        </div>
        <div className="p-1">
          <h5 className="font-[600]">Shop Ratings</h5>
          <h4 className="text-[#000000a6]">
            ({avgRating.toFixed(1)}/5) Rating
          </h4>
        </div>
        <div className="p-1">
          <h5 className="font-[600]">Joined On</h5>
          <h4 className="text-[#000000a6]">{data?.createdAt?.slice(0, 10)}</h4>
        </div>
        {isOwner && (
          <div className="py-3 px-4">
            <Link to={"/shop/dashboard/settings"}>
              <div
                className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}
              >
                <span className="text-white">Edit Shop</span>
              </div>
            </Link>
            <div
              className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}
              onClick={handleLogout}
            >
              <span className="text-white">Log out</span>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default ShopInfo;
