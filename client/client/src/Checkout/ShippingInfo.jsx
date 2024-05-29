/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React from "react";
import { Country, State } from "country-state-city";
import { useSelector } from "react-redux";
import styles from "../styles/styles";
const ShippingInfo = ({
  country,
  city,
  address1,
  address2,
  zipCode,
  userInfo,
  setCountry,
  setAddress1,
  setAddress2,
  setCity,
  setUserInfo,
  setZipCode,
}) => {
  const { user } = useSelector((state) => state.user);

  return (
    <React.Fragment>
      <div className="w-full 800px:w-[95%] bg-white rounded-md p-5 pb-8">
        <h5 className="text-[18px] font-[500]">Shipping Address</h5>
        <br />
        <form>
          <div className="w-full flex pb-3">
            <div className="w-[50%]">
              <label className="block pb-2">Full Name</label>
              <input
                type="text"
                value={user && user.name}
                required
                className={`${styles.input} !w-[95%]`}
              />
            </div>
            <div className="w-[50%]">
              <label className="block pb-2">Email Address</label>
              <input
                type="email"
                value={user && user.email}
                required
                className={`${styles.input}`}
              />
            </div>
          </div>

          <div className="w-full flex pb-3">
            <div className="w-[50%]">
              <label className="block pb-2">Phone Number</label>
              <input
                type="number"
                required
                value={user && user.phoneNumber}
                className={`${styles.input} !w-[95%]`}
              />
            </div>
            <div className="w-[50%]">
              <label className="block pb-2">Zip Code</label>
              <input
                type="number"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                required
                className={`${styles.input}`}
              />
            </div>
          </div>

          <div className="w-full flex pb-3">
            <div className="w-[50%]">
              <label className="block pb-2">Country</label>
              <select
                className="w-[95%] border h-[40px] rounded-[5px]"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option className="block pb-2" value="">
                  Choose your country
                </option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="w-[50%]">
              <label className="block pb-2">City</label>
              <select
                className="w-[95%] border h-[40px] rounded-[5px]"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                <option className="block pb-2" value="">
                  Choose your City
                </option>
                {State &&
                  State.getStatesOfCountry(country).map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="w-full flex pb-3">
            <div className="w-[50%]">
              <label className="block pb-2">Address1</label>
              <input
                type="address"
                required
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                className={`${styles.input} !w-[95%]`}
              />
            </div>
            <div className="w-[50%]">
              <label className="block pb-2">Address2</label>
              <input
                type="address"
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                required
                className={`${styles.input}`}
              />
            </div>
          </div>
        </form>
        <h5
          className=" cursor-pointer inline-block text-[16px]"
          onClick={() => setUserInfo(!userInfo)}
        >
          Choose from saved address
        </h5>
        {userInfo && (
          <div className="">
            {user &&
              user.addresses.map((item, index) => (
                <div key={index} className="flex w-full mt-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    className="mr-3 cursor-pointer"
                    value={item.addressType}
                    onClick={() =>
                      setAddress1(item.address1) ||
                      setAddress2(item.address2) ||
                      setCity(item.city) ||
                      setCountry(item.country) ||
                      setZipCode(item.zipCode)
                    }
                  />
                  <h2>{item.addressType}</h2>
                </div>
              ))}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default ShippingInfo;
