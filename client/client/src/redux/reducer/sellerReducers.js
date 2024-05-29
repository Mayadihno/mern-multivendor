import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  seller: [],
};

export const sellerReducer = createReducer(initialState, {
  LoadSellerRequest: (state) => {
    state.isLoading = true;
  },
  LoadSellerSuccess: (state, action) => {
    state.isSellerAuthenticated = true;
    state.isLoading = false;
    state.seller = action.payload;
  },
  LoadSellerFailed: (state, action) => {
    state.isSellerAuthenticated = false;
    state.isLoading = false;
    state.error = action.payload;
  },
  clearError: (state) => {
    state.error = null;
  },
});
