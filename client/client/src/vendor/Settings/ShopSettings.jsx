import React from "react";
import SellerProtectedRoute from "../../SellerProtectedRoute";
import DashboardHeader from "../DashboardHeader";
import DashboardSidebar from "../DashboardSidebar";
import Settings from "../Allorders/Settings";

const ShopSettings = () => {
  return (
    <SellerProtectedRoute>
      <React.Fragment>
        <div>
          <DashboardHeader />
          <div className="flex justify-between w-full">
            <div className=" w-[80px] 800px:w-[300px]">
              <DashboardSidebar active={11} />
            </div>
            <div className="w-full flex justify-center">
              <Settings />
            </div>
          </div>
        </div>
      </React.Fragment>
    </SellerProtectedRoute>
  );
};

export default ShopSettings;
