/* eslint-disable react/prop-types */
import React from "react";
import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { VscNewFile } from "react-icons/vsc";
import { RxDashboard } from "react-icons/rx";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { Link } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";
import { HiOutlineReceiptRefund } from "react-icons/hi";

const DashboardSidebar = ({ active }) => {
  return (
    <React.Fragment>
      <div className=" h-[89vh] w-full overflow-y-scroll bg-white shadow-sm sticky top-0 left-0 z-10">
        {/* single item */}
        <div className="flex w-full items-center p-4">
          <Link to={"/shop/dashboard"} className=" w-full flex items-center">
            <RxDashboard
              color={`${active === 1 ? "#dc145c" : "#555"}`}
              size={25}
            />
            <h5
              className={`hidden 800px:block pl-2 text-[16px] font-[400] ${
                active === 1 ? " text-[crimson]" : "text-[#555]"
              }`}
            >
              Dashboard
            </h5>
          </Link>
        </div>
        <div className="flex w-full items-center p-4">
          <Link
            to={"/shop/dashboard/orders"}
            className=" w-full flex items-center"
          >
            <FiShoppingBag
              color={`${active === 2 ? "#dc145c" : "#555"}`}
              size={25}
            />
            <h5
              className={`hidden 800px:block pl-2 text-[16px] font-[400] ${
                active === 2 ? " text-[crimson]" : "text-[#555]"
              }`}
            >
              All Orders
            </h5>
          </Link>
        </div>
        <div className="flex w-full items-center p-4">
          <Link
            to={"/shop/dashboard/products"}
            className=" w-full flex items-center"
          >
            <FiPackage
              color={`${active === 3 ? "#dc145c" : "#555"}`}
              size={25}
            />
            <h5
              className={`hidden 800px:block pl-2 text-[16px] font-[400] ${
                active === 3 ? " text-[crimson]" : "text-[#555]"
              }`}
            >
              All Products
            </h5>
          </Link>
        </div>
        <div className="flex w-full items-center p-4">
          <Link
            to={"/shop/dashboard/create-product"}
            className=" w-full flex items-center"
          >
            <AiOutlineFolderAdd
              color={`${active === 4 ? "#dc145c" : "#555"}`}
              size={25}
            />
            <h5
              className={`hidden 800px:block pl-2 text-[16px] font-[400] ${
                active === 4 ? " text-[crimson]" : "text-[#555]"
              }`}
            >
              Create Product
            </h5>
          </Link>
        </div>
        <div className="flex w-full items-center p-4">
          <Link
            to={"/shop/dashboard/events"}
            className=" w-full flex items-center"
          >
            <MdOutlineLocalOffer
              color={`${active === 5 ? "#dc145c" : "#555"}`}
              size={25}
            />
            <h5
              className={`hidden 800px:block pl-2 text-[16px] font-[400] ${
                active === 5 ? " text-[crimson]" : "text-[#555]"
              }`}
            >
              All Events
            </h5>
          </Link>
        </div>
        <div className="flex w-full items-center p-4">
          <Link
            to={"/shop/dashboard/create-event"}
            className=" w-full flex items-center"
          >
            <VscNewFile
              color={`${active === 6 ? "#dc145c" : "#555"}`}
              size={25}
            />
            <h5
              className={`hidden 800px:block pl-2 text-[16px] font-[400] ${
                active === 6 ? " text-[crimson]" : "text-[#555]"
              }`}
            >
              Create Event
            </h5>
          </Link>
        </div>
        <div className="flex w-full items-center p-4">
          <Link
            to={"/shop/dashboard/withdraw-money"}
            className=" w-full flex items-center"
          >
            <CiMoneyBill
              color={`${active === 7 ? "#dc145c" : "#555"}`}
              size={25}
            />
            <h5
              className={`hidden 800px:block pl-2 text-[16px] font-[400] ${
                active === 7 ? " text-[crimson]" : "text-[#555]"
              }`}
            >
              Withdrawl Money
            </h5>
          </Link>
        </div>
        <div className="flex w-full items-center p-4">
          <Link
            to={"/shop/dashboard/messages"}
            className=" w-full flex items-center"
          >
            <BiMessageSquareDetail
              color={`${active === 8 ? "#dc145c" : "#555"}`}
              size={25}
            />
            <h5
              className={`hidden 800px:block pl-2 text-[16px] font-[400] ${
                active === 8 ? " text-[crimson]" : "text-[#555]"
              }`}
            >
              Shop Inbox
            </h5>
          </Link>
        </div>
        <div className="flex w-full items-center p-4">
          <Link
            to={"/shop/dashboard/coupons"}
            className=" w-full flex items-center"
          >
            <AiOutlineGift
              color={`${active === 9 ? "#dc145c" : "#555"}`}
              size={25}
            />
            <h5
              className={`hidden 800px:block pl-2 text-[16px] font-[400] ${
                active === 9 ? " text-[crimson]" : "text-[#555]"
              }`}
            >
              Discounts Codes
            </h5>
          </Link>
        </div>
        <div className="flex w-full items-center p-4">
          <Link
            to={"/shop/dashboard/refunds"}
            className=" w-full flex items-center"
          >
            <HiOutlineReceiptRefund
              color={`${active === 10 ? "#dc145c" : "#555"}`}
              size={25}
            />
            <h5
              className={`hidden 800px:block pl-2 text-[16px] font-[400] ${
                active === 10 ? " text-[crimson]" : "text-[#555]"
              }`}
            >
              Refunds
            </h5>
          </Link>
        </div>
        <div className="flex w-full items-center p-4">
          <Link
            to={"/shop/dashboard/settings"}
            className=" w-full flex items-center"
          >
            <CiSettings
              color={`${active === 11 ? "#dc145c" : "#555"}`}
              size={25}
            />
            <h5
              className={`hidden 800px:block pl-2 text-[16px] font-[400] ${
                active === 11 ? " text-[crimson]" : "text-[#555]"
              }`}
            >
              Settings
            </h5>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DashboardSidebar;
