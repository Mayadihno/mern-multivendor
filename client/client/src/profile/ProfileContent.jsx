/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { backend } from "../../../server";
import { useDispatch, useSelector } from "react-redux";
import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
} from "react-icons/ai";
import styles from "../styles/styles";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { MdTrackChanges } from "react-icons/md";
import {
  DeleteUserAddress,
  updateUserAddress,
  updateUserInformation,
} from "../redux/actions/userActions";
import { toast } from "react-toastify";
import axios from "axios";
import { RxCross1 } from "react-icons/rx";
import { Country, State, City } from "country-state-city";
import { getAllUserOrders } from "../redux/actions/orderAction";
import { v4 as uuidv4 } from "uuid";

const ProfileContent = ({ active }) => {
  const { user, error } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [password, setPassword] = useState();
  const [avatar, setAvatar] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleImage = async (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    await axios
      .put("/user/update-user-avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        window.location.reload();
        toast.success("avatar updated successfully!");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserInformation(email, password, phoneNumber, name));
    toast.success("Profile updated successfully");
    navigate("/");
  };
  return (
    <React.Fragment>
      <div className="w-full">
        {active === 1 && (
          <>
            <div className="flex justify-center w-full">
              <div className="relative">
                <img
                  src={`${backend}${user.avatar}`}
                  alt=""
                  className=" rounded-full w-[150px] h-[150px] object-cover border-[3px] border-[#3ad132]"
                />
                <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                  <input
                    type="file"
                    id="image"
                    className="hidden"
                    onChange={handleImage}
                  />
                  <label htmlFor="image">
                    <AiOutlineCamera />
                  </label>
                </div>
              </div>
            </div>
            <div className="w-full px-5">
              <br />
              <br />
              <form onSubmit={handleSubmit} aria-required={true}>
                <div className="800px:flex block pb-3 w-full">
                  <div className="800px:w-[50%] w-full">
                    <label className="pb-2 block">Full name</label>
                    <input
                      type="text"
                      className={`${styles.input} mb-4 800px:mb-0 !w-[95%] capitalize`}
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="800px:w-[50%] w-full">
                    <label className="pb-2 block">Email</label>
                    <input
                      type="email"
                      className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="800px:flex block pb-1 w-full">
                  <div className="800px:w-[50%] w-full">
                    <label className="pb-2 block">Phone Number</label>
                    <input
                      type="tel"
                      className={`${styles.input} !w-[95%] 800px:mb-0`}
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div className="800px:w-[50%] w-full">
                    <label className="pb-2 block">Enter your password</label>
                    <input
                      type="password"
                      className={`${styles.input} !w-[95%] 800px:mb-0`}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <input
                  className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
                  required
                  value="Update"
                  type="submit"
                />
              </form>
            </div>
          </>
        )}
        {active === 2 && (
          <div>
            <Allorders />
          </div>
        )}
        {active === 3 && (
          <div>
            <AllRefundsorders />
          </div>
        )}
        {active === 5 && (
          <div>
            <TrackOrders />
          </div>
        )}
        {active === 6 && (
          <div>
            <ChangePassword />
          </div>
        )}
        {active === 7 && (
          <div>
            <Address />
          </div>
        )}
      </div>
    </React.Fragment>
  );
};
const Allorders = () => {
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUserOrders(user._id));
  }, [dispatch, user._id]);

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
            <Link to={`/user/order/${params.id}`}>
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
  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        autoHeight
        disableRowSelectionOnClick
      />
    </div>
  );
};
const AllRefundsorders = () => {
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUserOrders(user._id));
  }, [dispatch, user._id]);

  const eligibleOrder =
    orders && orders.filter((item) => item.status === "Processing refund");

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
            <Link to={`/user/order/${params.id}`}>
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
  eligibleOrder &&
    eligibleOrder.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        autoHeight
        disableRowSelectionOnClick
      />
    </div>
  );
};
const TrackOrders = () => {
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUserOrders(user._id));
  }, [dispatch, user._id]);

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
            <Link to={`/user/track-order/${params.id}`}>
              <Button variant="outlined">
                <MdTrackChanges size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];
  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        autoHeight
        disableRowSelectionOnClick
      />
    </div>
  );
};
const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Confirm password and new password are not the same");
      return;
    }
    await axios
      .put("/user/update-user-password", {
        oldPassword,
        newPassword,
        confirmPassword,
      })
      .then((res) => {
        toast.success(res.data.message);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  return (
    <div className=" px-5 w-full">
      <h1 className="text-[25px] text-center font-[600] pb-2 text-[#000000ba">
        Change password
      </h1>
      <div className="w-full">
        <form
          onSubmit={handlePasswordChange}
          className="flex flex-col items-center"
        >
          <div className="800px:w-[50%] w-full mt-4">
            <label className="pb-2 block">Enter your old password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] 800px:mb-0`}
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className="800px:w-[50%] w-full mt-4">
            <label className="pb-2 block">Enter your new password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] 800px:mb-0`}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="800px:w-[50%] w-full mt-4">
            <label className="pb-2 block">Confirm your new password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] 800px:mb-0`}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <input
            className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
            required
            value="Update"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};
const Address = () => {
  const { user } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [city1, setCity1] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [addressType, setAddressType] = useState("");
  const dispatch = useDispatch();

  const addressTypeData = [
    {
      name: "Default",
    },
    {
      name: "Home",
    },
    {
      name: "Office",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (addressType === "" || city === "" || country === "") {
      toast.error("Please fill all the empty fileds");
    } else {
      dispatch(
        updateUserAddress(
          country,
          city,
          city1,
          address1,
          address2,
          addressType,
          zipCode
        )
      );
      toast.success("Address Added successfully");
      setOpen(false);
    }
  };
  const handleDeleteAddress = (item) => {
    dispatch(DeleteUserAddress(item._id));
    toast.success("Address deleted successfully");
  };
  return (
    <div className=" px-5 w-full">
      {open && (
        <div className="flex items-center justify-center fixed w-full h-screen bg-[#0000004b] top-0 left-0">
          <div className="w-[45%] h-[80vh] bg-white rounded shadow relative overflow-y-scroll">
            <div className="flex w-full justify-end">
              <RxCross1
                size={30}
                className=" cursor-pointer py-2 pr-2"
                onClick={() => setOpen(false)}
              />
            </div>
            <h1 className="text-center text-[25px] font-Poppins">
              Add new address
            </h1>
            <div className="w-full">
              <form onSubmit={handleSubmit}>
                <div className="block w-full p-4">
                  <div className="w-full pb-2">
                    <label htmlFor="" className="block pb-2">
                      Country
                    </label>
                    <select
                      name=""
                      id=""
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-[95%] border h-[40px] rounded-[5px]"
                    >
                      <option value="" className="block pb-2">
                        choose your country
                      </option>
                      {Country &&
                        Country.getAllCountries().map((item) => (
                          <option
                            className="block pb-2"
                            value={item.isoCode}
                            key={item.isoCode}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="w-full pb-2">
                    <label htmlFor="" className="block pb-2">
                      State
                    </label>
                    <select
                      name=""
                      id=""
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-[95%] border h-[40px] rounded-[5px]"
                    >
                      <option value="" className="block pb-2">
                        choose your city
                      </option>
                      {State &&
                        State.getStatesOfCountry(country).map((item) => (
                          <option
                            className="block pb-2"
                            value={item.isoCode}
                            key={item.isoCode}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="w-full pb-2">
                    <label htmlFor="" className="block pb-2">
                      City
                    </label>
                    <select
                      name=""
                      id=""
                      value={city1}
                      onChange={(e) => setCity1(e.target.value)}
                      className="w-[95%] border h-[40px] rounded-[5px]"
                    >
                      <option value="" className="block pb-2">
                        choose your city
                      </option>
                      {City &&
                        City.getCitiesOfState(country, city).map((item) => (
                          <option
                            className="block pb-2"
                            value={item.isoCode}
                            key={item.isoCode}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="w-full pb-2">
                    <label htmlFor="" className="block pb-2">
                      Adddress 1
                    </label>
                    <input
                      type="text"
                      className={`${styles.input}`}
                      value={address1}
                      required
                      onChange={(e) => setAddress1(e.target.value)}
                    />
                  </div>
                  <div className="w-full pb-2">
                    <label htmlFor="" className="block pb-2">
                      Adddress 2
                    </label>
                    <input
                      type="text"
                      className={`${styles.input}`}
                      value={address2}
                      required
                      onChange={(e) => setAddress2(e.target.value)}
                    />
                  </div>
                  <div className="w-full pb-2">
                    <label htmlFor="" className="block pb-2">
                      Zip code
                    </label>
                    <input
                      type="number"
                      className={`${styles.input}`}
                      value={zipCode}
                      required
                      onChange={(e) => setZipCode(e.target.value)}
                    />
                  </div>
                  <div className="w-full pb-2">
                    <label htmlFor="" className="block pb-2">
                      Address Type
                    </label>
                    <select
                      name=""
                      id=""
                      value={addressType}
                      onChange={(e) => setAddressType(e.target.value)}
                      className="w-[95%] border h-[40px] rounded-[5px]"
                    >
                      <option value="" className="block pb-2">
                        choose your address type
                      </option>
                      {addressTypeData &&
                        addressTypeData.map((item) => (
                          <option
                            className="block pb-2"
                            value={item.name}
                            key={item.name}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="w-full pb-2">
                    <input
                      type="submit"
                      value="Submit"
                      className={`${styles.input} cursor-pointer mt-5`}
                      required
                      readOnly
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-between w-full items-center">
        <h1 className="text-[25px] font-[600] pb-2 text-[#000000ba]">
          My Addresses
        </h1>
        <div
          className={`${styles.button} !rounded-md`}
          onClick={() => setOpen(true)}
        >
          <span className=" text-white">Add new</span>
        </div>
      </div>
      <br />
      {user.addresses.length === 0 && (
        <div className="text-center text-[18px] pt-6">
          <h2>No saved Address available. Kindly add new address</h2>
        </div>
      )}

      {user &&
        user.addresses.map((item, index) => {
          return (
            <div
              key={index}
              className="w-full bg-white mb-5 h-[70px] rounded-[4px] flex items-center px-3 shadow-sm justify-between pr-10"
            >
              <div className="flex items-center">
                <h5 className=" pl-5 font-[600]">{item.addressType}</h5>
              </div>
              <div className="flex items-center pl-8">
                <h6>
                  {item.address1},{item.address2},{item.city1},{item.city},
                  {item.country}
                </h6>
                <h5 className="pl-6">{user && user.phoneNumber}</h5>
              </div>
              <div className="flex items-center justify-center min-w-[10%] pl-8">
                <AiOutlineDelete
                  size={25}
                  className=" cursor-pointer"
                  onClick={() => handleDeleteAddress(item)}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
};
export default ProfileContent;
