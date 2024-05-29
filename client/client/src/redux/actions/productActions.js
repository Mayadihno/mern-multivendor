import axios from "axios";

//create products
export const createProduct = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: " productCreateRequest",
    });
    //only to fetch data from the backend does not belong to redux
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.post(
      "/product/create-product",
      newForm,
      config
    );
    dispatch({
      type: "productCreateSuccess",
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: "productCreateFailed",
      payload: error.response.data.message,
    });
  }
};

//get all products by id
export const getAllProductsShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsShopRequest",
    });
    const { data } = await axios.get(`product/getAllProductsShop/${id}`);
    dispatch({
      type: "getAllProductsShopSuccess",
      payload: data?.products,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsShopFailed",
      payload: error.response.data.message,
    });
  }
};

// get all products
export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsRequest",
    });

    const { data } = await axios.get("/product/get-all-products");
    dispatch({
      type: "getAllProductsSuccess",
      payload: data?.allProducts,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsFailed",
      payload: error.response.data.message,
    });
  }
};

//delete a product from shop
export const deleteProductFromShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteProductFromShopRequest",
    });
    const { data } = await axios.delete(
      `product/delete-product-from-shop/${id}`
    );
    dispatch({
      type: "deleteProductFromShopSuccess",
      payload: data?.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteProductFromShopFailed",
      payload: error.response.data.message,
    });
  }
};
