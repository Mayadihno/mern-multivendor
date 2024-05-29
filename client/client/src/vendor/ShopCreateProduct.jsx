import React from "react";
import SellerProtectedRoute from "../SellerProtectedRoute";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";
import CreateProduct from "./CreateProduct";

const ShopCreateProduct = () => {
  return (
    <React.Fragment>
      <SellerProtectedRoute>
        <div className="">
          <DashboardHeader />
          <div className="flex justify-between items-center w-full">
            <div className=" w-[80px] 800px:w-[300px]">
              <DashboardSidebar active={4} />
            </div>
            <div className="flex justify-center w-full">
              <CreateProduct />
            </div>
          </div>
        </div>
      </SellerProtectedRoute>
    </React.Fragment>
  );
};

export default ShopCreateProduct;
