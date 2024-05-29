import React, { useEffect } from "react";
import Loader from "../../Components/Loader";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { AiOutlineArrowRight } from "react-icons/ai";
import styles from "../../styles/styles";
import { getAllSellerOrders } from "../../redux/actions/orderAction";
import { useDispatch, useSelector } from "react-redux";

const Refund = () => {
  const { isLoading, sellerOrders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSellerOrders(seller?._id));
  }, [dispatch, seller?._id]);

  const orderRedunds =
    sellerOrders &&
    sellerOrders.filter((item) => item.status === "Processing refund");
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
  orderRedunds &&
    orderRedunds.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <React.Fragment>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full pt-1 bg-white">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      )}
    </React.Fragment>
  );
};

export default Refund;
