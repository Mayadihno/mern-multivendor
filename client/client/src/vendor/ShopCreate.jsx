import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/styles";
import { RxAvatar } from "react-icons/rx";
import axios from "axios";
import { toast } from "react-toastify";

const ShopCreate = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [shopName, setShopName] = useState("");
  const [address, setaddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [avatar, setAvatar] = useState();
  const [zipCode, setZipCode] = useState();
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const files = e.target.files[0];
    setAvatar(files);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const config = { headers: { "Content-type": "multipart/form-data" } };
    const newForm = new FormData();
    newForm.append("file", avatar);
    newForm.append("email", email);
    newForm.append("shopName", shopName);
    newForm.append("password", password);
    newForm.append("address", address);
    newForm.append("phoneNumber", phoneNumber);
    newForm.append("zipCode", zipCode);

    console.log(newForm);
    axios
      .post("/shop/create-seller", newForm, config)
      .then((res) => {
        console.log(res);
        toast.success("Please check your email to activate your account");
        navigate("/login");
        e.target.reset();
      })
      .catch((error) => {
        return (
          error.response.data.message ==
            "User already exist with this email address" &&
          toast.error("User already exists with this email address")
        );
      });
  };
  return (
    <React.Fragment>
      <div className="min-h-screen bg-gray-50 flex flex-col py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Register as a seller
          </h2>
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 sm:rounded-lg sm:px-10">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="">
                  <label
                    htmlFor="shopName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Shop Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="shopName"
                      id="shopName"
                      required
                      value={shopName}
                      onChange={(e) => setShopName(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div className="">
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Shop Phone number
                  </label>
                  <div className="mt-1">
                    <input
                      type="tel"
                      name="phoneNumber"
                      id="phoneNumber"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div className="">
                  <label
                    htmlFor="shopAddress"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Shop Address
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="shopAddress"
                      id="shopAddress"
                      required
                      value={address}
                      onChange={(e) => setaddress(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div className="">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Shop Email
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      placeholder="yourEmail@gmail.com"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div className="">
                  <label
                    htmlFor="zipCode"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Shop Zip code
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="zipCode"
                      id="zipCode"
                      required
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div className="">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type={!visible ? "password" : "text"}
                      name="password"
                      id="password"
                      required
                      placeholder="password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    {visible ? (
                      <AiOutlineEye
                        className="absolute top-2 right-2 cursor-pointer"
                        size={25}
                        onClick={() => setVisible(false)}
                      />
                    ) : (
                      <AiOutlineEyeInvisible
                        className="absolute top-2 right-2 cursor-pointer"
                        size={25}
                        onClick={() => setVisible(true)}
                      />
                    )}
                  </div>
                </div>
                <div className={`${styles.normalFlex} justify-between`}>
                  <div className={`${styles.normalFlex}`}>
                    <label
                      htmlFor="avatar"
                      className="block text-sm font-medium text-gray-700"
                    ></label>
                    <div className="mt-2 flex items-center">
                      <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                        {avatar ? (
                          <img
                            src={URL.createObjectURL(avatar)}
                            alt="avatar"
                            className="h-full w-full object-cover rounded-full"
                          />
                        ) : (
                          <RxAvatar className="h-8 w-8" />
                        )}
                      </span>
                      <label
                        htmlFor="file-input"
                        className="ml-5 flex cursor-pointer items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                      >
                        <span>Upload a file</span>
                        <input
                          type="file"
                          name="file"
                          id="file-input"
                          accept=".jpeg,.png,.jpg"
                          onChange={handleFileChange}
                          className="sr-only"
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className={`${styles.normalFlex} justify-between`}>
                  <div className={`${styles.normalFlex}`}>
                    <input
                      type="checkbox"
                      name="remember-me"
                      id="remember-me"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-600 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Remember Me
                    </label>
                  </div>
                  <div className="text-sm font-medium text-blue-600 hover:text-blue-500">
                    <Link>Forgot password</Link>
                  </div>
                </div>
                <div className="">
                  <button
                    type="submit"
                    className="group relative w-full h-[40px] flex justify-center py-2 px-4 border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 "
                  >
                    Submit
                  </button>
                </div>
                <div className={`${styles.normalFlex} w-full`}>
                  <h4>Already have an account ?</h4>
                  <Link to={"/shop-login"} className="text-blue-600 pl-2">
                    Sign in
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ShopCreate;
