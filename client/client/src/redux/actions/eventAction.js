import axios from "axios";

//create event
export const createEvent = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: " eventCreateRequest",
    });
    //only to fetch data from the backend does not belong to redux
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.post(
      "/event/create-event-product",
      newForm,
      config
    );
    dispatch({
      type: "eventCreateSuccess",
      payload: data.event,
    });
  } catch (error) {
    dispatch({
      type: "eventCreateFailed",
      payload: error.response.data.message,
    });
  }
};

//get all event by id
export const getAlleventShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAlleventsShopRequest",
    });
    const { data } = await axios.get(`/event/getAllEventShop/${id}`);
    dispatch({
      type: "getAlleventsShopSuccess",
      payload: data?.events,
    });
  } catch (error) {
    dispatch({
      type: " getAlleventsShopFailed",
      payload: error.response.data.message,
    });
  }
};
//get all event
export const getAllevent = () => async (dispatch) => {
  try {
    dispatch({
      type: " getAlleventsRequest",
    });
    const { data } = await axios.get(`/event/get-all-events`);
    dispatch({
      type: "getAlleventsSuccess",
      payload: data?.allEvents,
    });
  } catch (error) {
    dispatch({
      type: " getAlleventsFailed",
      payload: error.response.data.message,
    });
  }
};

//delete a event from shop
export const deleteeventFromShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: " deleteeventFromShopRequest",
    });
    const { data } = await axios.delete(`event/delete-event-from-shop/${id}`);
    dispatch({
      type: "deleteeventFromShopSuccess",
      payload: data?.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteeventFromShopFailed",
      payload: error.response.data.message,
    });
  }
};
