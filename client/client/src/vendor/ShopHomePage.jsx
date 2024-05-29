import React from "react";
import styles from "../styles/styles";
import ShopInfo from "./ShopInfo";
import ShopProfileData from "./ShopProfileData";

const ShopHomePage = () => {
  return (
    <React.Fragment>
      <div className={`${styles.section} bg-[#f5f5f5f5]`}>
        <div className="flex w-full justify-between py-10">
          <div className=" sticky top-10 bg-white shadow-sm overflow-y-scroll h-[90vh] left-0 z-10 w-[25%] rounded-[4px]">
            <ShopInfo isOwner={true} />
          </div>
          <div className="800px:w-[72%] mt-5 800px:mt-['unset'] rounded-[4px]">
            <ShopProfileData isOwner={true} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ShopHomePage;
