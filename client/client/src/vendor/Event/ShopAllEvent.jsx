import React from "react";
import CreateAllEvent from "./CreateAllEvent";
import SellerProtectedRoute from "../../SellerProtectedRoute";
import DashboardHeader from "../DashboardHeader";
import DashboardSidebar from "../DashboardSidebar";

const ShopAllEvent = () => {
  return (
    <React.Fragment>
      <SellerProtectedRoute>
        <div className="">
          <DashboardHeader />
          <div className="flex justify-between w-full">
            <div className=" w-[80px] 800px:w-[300px]">
              <DashboardSidebar active={5} />
            </div>
            <div className="flex justify-center w-full">
              <CreateAllEvent />
            </div>
          </div>
        </div>
      </SellerProtectedRoute>
    </React.Fragment>
  );
};

export default ShopAllEvent;
