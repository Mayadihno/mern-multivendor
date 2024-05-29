import React, { useEffect, useState } from "react";
import { AiOutlineArrowRight, AiOutlineMoneyCollect } from "react-icons/ai";
import styles from "../styles/styles";
import { Link } from "react-router-dom";
import { MdBorderClear, MdPallet } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getAllSellerOrders } from "../redux/actions/orderAction";
import { getAllProductsShop } from "../redux/actions/productActions";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const DashboardHero = () => {
  const { sellerOrders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.products);
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

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      getCellClassName: (params) => {
        return params.value === "Delivered"
          ? `${styles.greenColor}`
          : `${styles.redColor}`;
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/shop/order/${params.id}`}>
              <Button variant="outlined">
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];
  sellerOrders &&
    sellerOrders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <React.Fragment>
      <div className="w-full p-8">
        <h3 className=" font-Poppins text-[22px] pb-2">Overview</h3>
        <div className="block w-full 800px:flex items-center justify-between">
          <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow px-2 rounded py-5">
            <div className="flex items-center">
              <AiOutlineMoneyCollect
                size={30}
                className="mr-2"
                color="#00000085"
              />
              <h3
                className={`${styles.productTitle} !text-[18px] leading-5 !font-[500] text-[#00000085]`}
              >
                Account Balance{" "}
                <span className="text-[14px]">(with 10% service charge)</span>
              </h3>
            </div>
            <h5 className=" pt-2 pl-[36px] text-[22px] font-[500]">
              ${availableBalance.toFixed(2)}
            </h5>
            <Link to={"/shop/dashboard/withdraw"}>
              <h5 className="pt-4 pl-2 text-[#077f9c]">Withdraw Money</h5>
            </Link>
          </div>
          <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow px-2 rounded py-5">
            <div className="flex items-center">
              <MdBorderClear size={30} className="mr-2" color="#00000085" />
              <h3
                className={`${styles.productTitle} !text-[18px] leading-5 !font-[500] text-[#00000085]`}
              >
                All Orders
              </h3>
            </div>
            <h5 className=" pt-2 pl-[36px] text-[22px] font-[500]">
              {sellerOrders && sellerOrders.length}
            </h5>
            <Link to={"/shop/dashboard/orders"}>
              <h5 className="pt-4 pl-2 text-[#077f9c]">View Orders</h5>
            </Link>
          </div>
          <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow px-2 rounded py-5">
            <div className="flex items-center">
              <MdPallet size={30} className="mr-2" color="#00000085" />
              <h3
                className={`${styles.productTitle} !text-[18px] leading-5 !font-[500] text-[#00000085]`}
              >
                All Products
              </h3>
            </div>
            <h5 className=" pt-2 pl-[36px] text-[22px] font-[500]">
              {products && products.length}
            </h5>
            <Link to={"/shop/dashboard/products"}>
              <h5 className="pt-4 pl-2 text-[#077f9c]">View Products</h5>
            </Link>
          </div>
        </div>
        <br />
        <h3 className=" font-Poppins pb-2 text-[22px]">Latest Orders</h3>
        <div className="w-full min-h-[45vh] bg-white rounded">
          <div className="w-full pt-1 bg-white">
            <DataGrid
              rows={row}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              autoHeight
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DashboardHero;
