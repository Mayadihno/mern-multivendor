import React from "react";
import SellerProtectedRoute from "../SellerProtectedRoute";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";
import ShopProducts from "./ShopProducts";

const ShopAllProducts = () => {
  return (
    <SellerProtectedRoute>
      <React.Fragment>
        <div>
          <DashboardHeader />
          <div className="flex justify-between w-full">
            <div className=" w-[80px] 800px:w-[300px]">
              <DashboardSidebar active={3} />
            </div>
            <div className="w-full flex justify-center">
              <ShopProducts />
            </div>
          </div>
        </div>
      </React.Fragment>
    </SellerProtectedRoute>
  );
};

export default ShopAllProducts;
