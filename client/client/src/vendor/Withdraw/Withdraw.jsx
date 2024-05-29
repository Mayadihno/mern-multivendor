import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSellerOrders } from "../../redux/actions/orderAction";
import { getAllProductsShop } from "../../redux/actions/productActions";
import styles from "../../styles/styles";

const Withdraw = () => {
  const { sellerOrders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  const [deliveredOrder, setDeliveredOrder] = useState(null);

  useEffect(() => {
    dispatch(getAllSellerOrders(seller?._id));
    dispatch(getAllProductsShop(seller?._id));

    const orderData =
      sellerOrders &&
      sellerOrders.filter((item) => item.status === "Delivered");
    setDeliveredOrder(orderData);
  }, [dispatch, seller?._id, sellerOrders]);

  const totalEarningWithoutTax =
    deliveredOrder &&
    deliveredOrder.reduce((acc, item) => acc + item.totalPrice, 0);

  const serviceCharge = totalEarningWithoutTax * 0.1;
  const availableBalance = totalEarningWithoutTax - serviceCharge;
  return (
    <React.Fragment>
      <div className="w-full h-[90vh] p-8">
        <div className="w-full h-full bg-white rounded flex items-center justify-center flex-col">
          <h5 className="text-[20px] pb-4">
            Available Balance: ${availableBalance.toFixed(2)}
          </h5>
          <div
            className={`${styles.button} text-white !h-[42px] !rounded-[4px]`}
          >
            Withdraw
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Withdraw;
