/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { AiOutlineDelete } from "react-icons/ai";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import Loader from "../../Components/Loader";
import styles from "../../styles/styles";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";

const CreateCoupoun = () => {
  const { products } = useSelector((state) => state.products);
  const { seller } = useSelector((state) => state.seller);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [value, setValue] = useState(null);
  const [selected, setSelected] = useState(null);
  const [minAmount, setMinAmount] = useState(null);
  const [maxAmount, setMaxAmount] = useState(null);
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`coupon/get-all-coupon-codes/${seller._id}`)
      .then((res) => {
        console.log(res.data.couponCode);
        setCoupons(res.data.couponCode);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    axios.delete(`/coupon/delete-coupon/${id}`).then((res) => {
      toast.success("Coupon code deleted succesfully!");
      console.log(res);
    });
    window.location.reload();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("coupon/create-coupoun-code", {
        name,
        value,
        selected,
        minAmount,
        maxAmount,
        shopId: seller,
      })
      .then((res) => {
        toast.success("Coupon Created successfully");
        console.log(res.data);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
    setOpen(false);
    e.target.reset();
  };
  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "discount",
      headerName: "Discount percent",
      minWidth: 100,
      flex: 0.6,
    },

    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "Delete",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleDelete(params.id)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];

  coupons &&
    coupons.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        discount: item.value + "%",
      });
    });
  return (
    <React.Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full pt-1 bg-white">
          <div className="w-full flex justify-end">
            <div
              className={`${styles.button} !w-max !h-[45px] !rounded-[4px] mr-3 px-3 mb-3`}
              onClick={() => setOpen(true)}
            >
              <span className="text-white">Create coupon code</span>
            </div>
          </div>
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
          {open && (
            <div className="flex justify-center items-center w-full top-0 left-0 h-screen bg-[#00000063] fixed z-[2000]">
              <div className="shadow w-[90%] 800px:w-[40%] h-[92vh] bg-white rounded-md p-3">
                <div className="flex w-full justify-end">
                  <RxCross1
                    size={30}
                    className="cursor-pointer"
                    onClick={() => setOpen(false)}
                  />
                </div>
                <h5 className="text-center font-Poppins text-[30px]">
                  Create Coupon code
                </h5>
                <form onSubmit={handleSubmit} aria-required={true}>
                  <br />
                  <div className="">
                    <label htmlFor="name" className="">
                      Coupon code name <span className=" text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      id="name"
                      required
                      onChange={(e) => setName(e.target.value)}
                      className=" mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Enter coupon code name..."
                    />
                  </div>
                  <br />
                  <div className="">
                    <label htmlFor="value" className="">
                      Discount Percentage
                      <span className=" text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="value"
                      value={value}
                      id="name"
                      required
                      onChange={(e) => setValue(e.target.value)}
                      className="appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Enter coupon discount percentage value..."
                    />
                  </div>
                  <br />
                  <div className="">
                    <label htmlFor="maxa" className="">
                      Minimun Amount
                    </label>
                    <input
                      type="number"
                      name="maxa"
                      value={minAmount}
                      id="maxa"
                      onChange={(e) => setMinAmount(e.target.value)}
                      className="appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Enter coupon code minimum amount..."
                    />
                  </div>
                  <br />
                  <div className="">
                    <label htmlFor="maxa" className="">
                      Maximum Amount
                    </label>
                    <input
                      type="text"
                      name="maxa"
                      value={maxAmount}
                      id="maxa"
                      onChange={(e) => setMaxAmount(e.target.value)}
                      className="appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Enter coupon code maximum amount..."
                    />
                  </div>
                  <br />
                  <div className="">
                    <label htmlFor="selected" className="">
                      Selected Product
                    </label>
                    <select
                      name="selected"
                      id="selected"
                      className=" w-full mt-2 border h-[35px] rounded-[5px]"
                      value={selected}
                      onChange={(e) => setSelected(e.target.value)}
                    >
                      <option value="choose product to be selected">
                        choose product to be selected
                      </option>
                      {products &&
                        products.map((i) => (
                          <option value={i.name} key={i.name}>
                            {i.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <br />
                  <div className="">
                    <input
                      type="submit"
                      value={"Create"}
                      className="appearance-none block w-full px-3 h-[35px] border cursor-pointer border-gray-300 rounded-[3px] placeholder-gray-400  sm:text-sm"
                    />
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default CreateCoupoun;
