import React from "react";
import SellerProtectedRoute from "../../SellerProtectedRoute";
import DashboardHeader from "../DashboardHeader";
import DashboardSidebar from "../DashboardSidebar";
import CreateCoupoun from "./CreateCoupoun";

const ShopCoupoun = () => {
  return (
    <React.Fragment>
      <SellerProtectedRoute>
        <div className="">
          <DashboardHeader />
          <div className="flex justify-between w-full">
            <div className=" w-[80px] 800px:w-[300px]">
              <DashboardSidebar active={9} />
            </div>
            <div className="flex justify-center w-full">
              <CreateCoupoun />
            </div>
          </div>
        </div>
      </SellerProtectedRoute>
    </React.Fragment>
  );
};

export default ShopCoupoun;
