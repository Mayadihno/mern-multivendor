import React from "react";
import SellerProtectedRoute from "../../SellerProtectedRoute";
import DashboardHeader from "../DashboardHeader";
import DashboardSidebar from "../DashboardSidebar";
import Refund from "./Refund";

const AllRefunds = () => {
  return (
    <React.Fragment>
      <SellerProtectedRoute>
        <div className="">
          <DashboardHeader />
          <div className="flex justify-between w-full">
            <div className=" w-[80px] 800px:w-[300px]">
              <DashboardSidebar active={10} />
            </div>
            <div className="flex justify-center w-full">
              <Refund />
            </div>
          </div>
        </div>
      </SellerProtectedRoute>
    </React.Fragment>
  );
};

export default AllRefunds;
