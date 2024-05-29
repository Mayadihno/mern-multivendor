/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { BsFillBagFill } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllSellerOrders } from "../../redux/actions/orderAction";
import { backend } from "../../../../server";
import axios from "axios";
import { toast } from "react-toastify";

const OrderDetails = () => {
  const { sellerOrders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllSellerOrders(seller?._id));
  }, [dispatch, seller?._id]);

  const data = sellerOrders && sellerOrders.find((item) => item._id === id);

  const handleStatusUpdate = async () => {
    await axios
      .put(`/order/update-order-status/${id}`, { status })
      .then((res) => {
        toast.success("Order status updated");
        navigate("/shop/dashboard/orders");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  const handleRefundStatus = async () => {
    await axios
      .put(`/order/update-order-status/${id}`, { status })
      .then((res) => {
        toast.success("Order status updated");
        dispatch(getAllSellerOrders(seller?._id));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  return (
    <React.Fragment>
      <div className={`${styles.section} py-4 min-h-screen`}>
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center">
            <BsFillBagFill size={30} color="crimson" />
            <h1 className="pl-1 text-[25px]">Order Details</h1>
          </div>
          <Link to={"/shop/dashboard/orders"}>
            <div
              className={`${styles.button} !bg-[#fce1e6] !rounded-[4px] font-[600] text-[#e94560] !h-[45px] text-[18px]`}
            >
              Order List
            </div>
          </Link>
        </div>
        <div className="flex w-full justify-between items-center pt-6">
          <h5 className="text-[#00000089]">
            Order ID: <span>#{data?._id?.slice(0, 8)}</span>
          </h5>
          <h5 className="text-[#0000008b]">
            Placed On: <span>{data?.createdAt?.slice(0, 10)}</span>
          </h5>
        </div>
        <br />
        <br />
        {/* order items */}
        <div className="grid grid-cols-3 gap-6">
          {data &&
            data.cart.map((item) => {
              return (
                <div key={item._id} className="w-full mb-5">
                  <img
                    src={`${backend}/${item.image[0]}`}
                    className=" w-[220px] h-[220px] rounded-[4px]"
                    alt=""
                  />
                  <div className="w-full">
                    <h5 className="pl-3 text-[20px]">{item.name}</h5>
                    <h5 className="pl-3 text-[20px]">
                      ${item.discountPrice} X {item.qty}
                    </h5>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="border-t text-right w-full">
          <h5 className="pt-3 text-[18px]">
            Total price <strong>${data?.totalPrice}</strong>
          </h5>
        </div>
        <br />
        <br />
        <div className="w-full 800px:flex items-center">
          <div className="w-full 800px:w-[60%]">
            <h4 className="pt-3 text-[20px] font-[600]">Shipping Address</h4>
            <h4 className="pt-3 text-[20px]">
              {data?.shippingAddress?.address1},
              {data?.shippingAddress?.address2}
            </h4>
            <h4 className="text-[20px] pt-1">
              {data?.shippingAddress?.city},{data?.shippingAddress?.country}
            </h4>
            <h4 className="text-[20px] pt-1">
              Phone Number: {data?.user?.phoneNumber}
            </h4>
          </div>
          <div className="w-full 800px:w-[40%]">
            <h4 className="pt-3 text-[20px]">Payment Info:</h4>
            <h4>
              Status:
              {data?.paymentInfo?.status
                ? data?.paymentInfo?.status
                : "Not Paid"}
            </h4>
          </div>
        </div>
        <br />
        <br />
        {data.status !== "Processing refund" && (
          <>
            <h4 className="pt-3 text-[20px] font-[600]">Order Status</h4>
            <select
              className="w-[230px] mt-2 rounded-[4px] border h-[35px]"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              {[
                "Processing",
                "Transferred to delivery partner",
                "Shipping",
                "Received",
                "Delivered",
                "On the way",
              ]
                .slice(
                  [
                    "Processing",
                    "Transferred to delivery partner",
                    "Shipping",
                    "Received",
                    "Delivered",
                    "On the way",
                  ].indexOf(data.status)
                )
                .map((option, index) => (
                  <option value={option} key={index}>
                    {option}
                  </option>
                ))}
            </select>
          </>
        )}
        {data?.status === "Processing refund" ||
        data?.status === "Refund Success" ? (
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-[200px] mt-2 border h-[35px] rounded-[5px]"
          >
            {["Processing refund", "Refund Success"]
              .slice(
                ["Processing refund", "Refund Success"].indexOf(data?.status)
              )
              .map((option, index) => (
                <option value={option} key={index}>
                  {option}
                </option>
              ))}
          </select>
        ) : null}

        <div
          onClick={
            data?.status !== "Processing refund"
              ? handleStatusUpdate
              : handleRefundStatus
          }
          className={`${styles.button} !bg-[#fce1e6] !rounded-[4px] font-[600] text-[#e94560] !h-[45px] text-[18px]`}
        >
          Update Status
        </div>
      </div>
    </React.Fragment>
  );
};

export default OrderDetails;
