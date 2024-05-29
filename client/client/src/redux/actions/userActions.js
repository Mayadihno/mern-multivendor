import axios from "axios";

//load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });
    const { data } = await axios.get("/user/getuser-data");
    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFailed",
      payload: error?.response?.data?.message,
    });
  }
};

//load seller
export const loadSeller = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadSellerRequest",
    });
    const { data } = await axios.get("/shop/getseller-data");
    dispatch({
      type: "LoadSellerSuccess",
      payload: data.seller,
    });
  } catch (error) {
    dispatch({
      type: "LoadSellerFailed",
      payload: error?.response?.data?.message,
    });
  }
};

//update user information
export const updateUserInformation =
  (email, password, phoneNumber, name) => async (dispatch) => {
    try {
      dispatch({
        type: " UpdateUserInfoRequest",
      });
      const { data } = await axios.put("/user/update-user-info", {
        email,
        password,
        phoneNumber,
        name,
      });
      dispatch({
        type: "UpdateUserInfoSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "UpdateUserInfoFailed",
        payload: error?.response?.data?.message,
      });
    }
  };

//update user information address
export const updateUserAddress =
  (country, city, city1, address1, address2, addressType, zipCode) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "UpdateUserAddressRequest",
      });
      const { data } = await axios.put("/user/update-user-address", {
        country,
        city,
        city1,
        address1,
        address2,
        addressType,
        zipCode,
      });
      dispatch({
        type: "UpdateUserAddressSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "UpdateUserAddressFailed",
        payload: error?.response?.data?.message,
      });
    }
  };

//delete user information address
export const DeleteUserAddress = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "DeleteUserAddressRequest",
    });
    const { data } = await axios.delete(`/user/delete-user-address/${id}`);
    dispatch({
      type: "DeleteUserAddressSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "DeleteUserAddressFailed",
      payload: error?.response?.data?.message,
    });
  }
};
