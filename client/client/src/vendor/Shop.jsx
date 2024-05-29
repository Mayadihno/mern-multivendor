import React from "react";
import SellerProtectedRoute from "../SellerProtectedRoute";
import ShopHomePage from "./ShopHomePage";

const Shop = () => {
  return (
    <SellerProtectedRoute>
      <React.Fragment>
        <div>
          <ShopHomePage />
        </div>
      </React.Fragment>
    </SellerProtectedRoute>
  );
};

export default Shop;
