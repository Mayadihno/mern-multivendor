import React from "react";
import { AiOutlineGift } from "react-icons/ai";
import { BiMessageDetail } from "react-icons/bi";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { backend } from "../../../server";

const DashboardHeader = () => {
  const { seller } = useSelector((state) => state.seller);
  return (
    <React.Fragment>
      <div className=" w-full h-[80px] bg-white shadow top-0 left-0 z-30 flex items-center justify-between sticky px-4">
        <div className="">
          <Link to={"/shop/dashboard"}>
            <img
              src="https://shopo.quomodothemes.website/assets/images/logo.svg"
              alt=""
            />
          </Link>
        </div>
        <div className="flex items-center">
          <div className="flex items-center mr-4">
            <Link
              to={"/shop/dashboard/coupons"}
              className=" 800px:block hidden"
            >
              <AiOutlineGift
                color="#555"
                size={30}
                className="mx-5 cursor-pointer"
              />
            </Link>
            <Link to={"/shop/dashboard/events"} className=" 800px:block hidden">
              <MdOutlineLocalOffer
                color="#555"
                size={30}
                className="mx-5 cursor-pointer"
              />
            </Link>
            <Link
              to={"/shop/dashboard/products"}
              className=" 800px:block hidden"
            >
              <FiShoppingBag
                color="#555"
                size={30}
                className="mx-5 cursor-pointer"
              />
            </Link>
            <Link to={"/shop/dashboard/orders"} className=" 800px:block hidden">
              <FiPackage
                color="#555"
                size={30}
                className="mx-5 cursor-pointer"
              />
            </Link>
            <Link
              to={"/shop/dashboard/messages"}
              className=" 800px:block hidden"
            >
              <BiMessageDetail
                color="#555"
                size={30}
                className="mx-5 cursor-pointer"
              />
            </Link>
            <Link to={`/shop/${seller?._id}`}>
              <img
                src={`${backend}${seller?.avatar}`}
                alt=""
                className=" w-[50px] h-[50px] rounded-full object-cover"
              />
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DashboardHeader;
