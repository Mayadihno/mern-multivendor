import React from "react";
import SellerProtectedRoute from "../../SellerProtectedRoute";
import DashboardHeader from "../DashboardHeader";
import DashboardSidebar from "../DashboardSidebar";
import ShopMessages from "./ShopMessages";

const AllShopInbox = () => {
  return (
    <SellerProtectedRoute>
      <React.Fragment>
        <div>
          <DashboardHeader />
          <div className="flex justify-between w-full">
            <div className=" w-[80px] 800px:w-[300px]">
              <DashboardSidebar active={8} />
            </div>
            <div className="w-full flex justify-center">
              <ShopMessages />
            </div>
          </div>
        </div>
      </React.Fragment>
    </SellerProtectedRoute>
  );
};

export default AllShopInbox;
