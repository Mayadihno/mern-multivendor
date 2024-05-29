import axios from "axios";

export const getAllUserOrders = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: "getUserOrderRequest",
    });
    const { data } = await axios.get(`order/get-user-orders/${userId}`);
    dispatch({
      type: "getUserOrderSuccess",
      payload: data?.orders,
    });
  } catch (error) {
    dispatch({
      type: "getUserOrderFailed",
      payload: error.response.data.message,
    });
  }
};

export const getAllSellerOrders = (sellerId) => async (dispatch) => {
  try {
    dispatch({
      type: "getSellerOrderRequest",
    });
    const { data } = await axios.get(`order/get-seller-orders/${sellerId}`);
    dispatch({
      type: "getSellerOrderSuccess",
      payload: data?.orders,
    });
  } catch (error) {
    dispatch({
      type: "getSellerOrderFailed",
      payload: error.response.data.message,
    });
  }
};
