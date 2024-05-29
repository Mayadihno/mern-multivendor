import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const orderReducer = createReducer(initialState, {
  //get all order for a user
  getUserOrderRequest: (state) => {
    state.isLoading = true;
  },
  getUserOrderSuccess: (state, action) => {
    state.isLoading = false;
    state.orders = action.payload;
  },
  getUserOrderFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  //get all order for a seller
  getSellerOrderRequest: (state) => {
    state.isLoading = true;
  },
  getSellerOrderSuccess: (state, action) => {
    state.isLoading = false;
    state.sellerOrders = action.payload;
  },
  getSellerOrderFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  clearErrors: (state) => {
    state.error = null;
  },
});
