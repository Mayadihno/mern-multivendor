import React from "react";
import SellerProtectedRoute from "../SellerProtectedRoute";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHero from "./DashboardHero";

const ShopDashboard = () => {
  return (
    <SellerProtectedRoute>
      <React.Fragment>
        <div>
          <DashboardHeader />
          <div className="flex justify-between items-start w-full">
            <div className=" w-[80px] 800px:w-[300px]">
              <DashboardSidebar active={1} />
            </div>
            <DashboardHero />
          </div>
        </div>
      </React.Fragment>
    </SellerProtectedRoute>
  );
};

export default ShopDashboard;
