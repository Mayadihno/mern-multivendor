import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducer/userReducers";
import { sellerReducer } from "./reducer/sellerReducers";
import { productReducer } from "./reducer/productReducers";
import { eventReducer } from "./reducer/eventREducer";
import { createCartReducer } from "./reducer/cart";
import { createWishlistReducer } from "./reducer/whishlist";
import { orderReducer } from "./reducer/order";

const Store = configureStore({
  reducer: {
    user: userReducer,
    seller: sellerReducer,
    products: productReducer,
    event: eventReducer,
    cart: createCartReducer,
    wishlist: createWishlistReducer,
    order: orderReducer,
  },
});

export default Store;
