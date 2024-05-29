import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getAllUserOrders } from "../redux/actions/orderAction";
import styles from "../styles/styles";
import { BsFillBagFill } from "react-icons/bs";
import { backend } from "../../../server";
import { RxCross1 } from "react-icons/rx";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";

const UsersOrder = () => {
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");

  const { id } = useParams();
  useEffect(() => {
    dispatch(getAllUserOrders(user?._id));
  }, [dispatch, user?._id]);

  const data = orders && orders.find((item) => item._id === id);

  const handleSubmit = async (e) => {
    await axios
      .put("/product/create-new-review", {
        user,
        rating,
        comment,
        productId: selectedItem?._id,
        orderId: id,
      })
      .then((res) => {
        toast.success(res.data.message);
        dispatch(getAllUserOrders(user?._id));
        setOpen(false);
        setComment("");
        setRating(1);
        e.target.reset();
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  const refundHandler = async () => {
    await axios
      .put(`/order/order-refund/${id}`, {
        status: "Processing refund",
      })
      .then((res) => {
        toast.success(res.data.message);
        dispatch(getAllUserOrders(user?._id));
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
          <Link to={"/profile"}>
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
                  {!item.isReviewed && data?.status === "Delivered" ? (
                    <div
                      className={`${styles.button} text-[#fff]`}
                      onClick={() => setOpen(true) || setSelectedItem(item)}
                    >
                      Write a review
                    </div>
                  ) : null}
                </div>
              );
            })}
        </div>
        {/* review pop modal */}
        {open && (
          <div className="w-full fixed top-0 left-0 h-screen bg-[#00000054] z-50 flex items-center justify-center">
            <div className="w-[50%] h-min bg-white shadow rounded-md p-3">
              <div className="w-full flex justify-end">
                <RxCross1
                  onClick={() => setOpen(false)}
                  size={30}
                  className="pr-2 cursor-pointer"
                />
              </div>
              <h2 className=" text-center font-Poppins font-[500] text-[30px]">
                Give a Review
              </h2>
              <br />
              <div className="flex w-full justify-between">
                <img
                  src={`${backend}/${selectedItem?.image[0]}`}
                  className="w-[100px] h-[100px]"
                  alt=""
                />
                <div className="pl-3 text-[20px]">{selectedItem.name}</div>
                <h4 className="pl-3 text-[20px]">
                  ${selectedItem.discountPrice} X {selectedItem.qty}
                </h4>
              </div>
              <br />
              {/* ratings */}
              <h5 className="pl-3 text-[20px] font-[500]">
                Give a Rating <span className="text-red-500">*</span>
              </h5>
              <div className="flex w-full ml-2 pt-1">
                {[1, 2, 3, 4, 5].map((i) =>
                  rating >= i ? (
                    <AiFillStar
                      size={25}
                      color="rgb(246,186,0)"
                      className="mr-1 cursor-pointer"
                      key={i}
                      onClick={() => setRating(i)}
                    />
                  ) : (
                    <AiOutlineStar
                      size={25}
                      color="rgb(246,186,0)"
                      className="mr-1 cursor-pointer"
                      key={i}
                      onClick={() => setRating(i)}
                    />
                  )
                )}
              </div>
              <br />
              <div className="w-full ml-3">
                <label className="block text-[20px] font-[500] mb-2">
                  write a comment
                  <span className="font-[400] text[16px] ml-1 text-[#0000005c]">
                    (optional)
                  </span>
                </label>
                <textarea
                  name="commet"
                  placeholder="Say something about this product"
                  cols="50"
                  rows="4"
                  className="w-[95%] p-2 border outline-none"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </div>
              <div
                className={`${styles.button} text-white ml-3 text-[20px]`}
                onClick={rating > 1 ? handleSubmit : null}
              >
                Submit
              </div>
            </div>
          </div>
        )}
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
            <br />
            {data.status === "Delivered" && (
              <div
                className={`${styles.button} text-white`}
                onClick={refundHandler}
              >
                Give a refund
              </div>
            )}
          </div>
        </div>
        <br />
        <Link to={"/"}>
          <div className={`${styles.button} text-white`}>Send Message</div>
        </Link>
      </div>
    </React.Fragment>
  );
};

export default UsersOrder;
