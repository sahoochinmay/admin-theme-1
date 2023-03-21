import {
  PARKING_START,
  PARKING_END,
  FETCH_PARKING,
  RELOAD_PARKING,
} from "../constant/parking.constant";
import { showAlert } from "./alert.action";
import { db } from "../config/firebase";
import { v4 } from "uuid";

export const fetchParking = () => (dispatch) => {
  dispatch({
    type: PARKING_START,
    payload: null,
  });
  let arr = [];
  db.collection("parking")
    .get()
    .then((docs) => {
      docs.forEach((doc) => {
        arr.push(doc.data());
      });
      dispatch({
        type: FETCH_PARKING,
        payload: arr,
      });
    })
    .catch((err) => {
      dispatch(
        showAlert({
          type: "error",
          msg: err.message,
        })
      );
      dispatch({
        type: PARKING_END,
        payload: null,
      });
    });
};

export const addParking = (data) => (dispatch) => {
  dispatch({
    type: PARKING_START,
    payload: null,
  });
  const id = v4();
  db.collection("parking")
    .doc(id)
    .set({
        _id: id,
      ...data
    })
    .then(() => {
      dispatch(
        showAlert({
          type: "success",
          msg: "😄 Parking added successfully.",
        })
      );
      dispatch({
        type: RELOAD_PARKING,
        payload: null,
      });
    })
    .catch((err) => {
      dispatch(
        showAlert({
          type: "error",
          msg: err.message,
        })
      );
      dispatch({
        type: PARKING_END,
        payload: null,
      });
    });
};

export const updateParking = (data) => (dispatch) => {
  dispatch({
    type: PARKING_START,
    payload: null,
  });
  db.collection("parking")
    .doc(data?.id)
    .update({
      ...data?.data,
    })
    .then(() => {
      dispatch(
        showAlert({
          type: "success",
          msg: "😄 Parking updated successfully.",
        })
      );
      dispatch({
        type: RELOAD_PARKING,
        payload: null,
      });
    })
    .catch((err) => {
      dispatch(
        showAlert({
          type: "error",
          msg: err.message,
        })
      );
      dispatch({
        type: PARKING_END,
        payload: null,
      });
    });
};

export const deleteParking = (id) => (dispatch) => {
  dispatch({
    type: PARKING_START,
    payload: null,
  });
  db.collection("parking")
    .doc(id)
    .delete()
    .then(() => {
      dispatch(
        showAlert({
          type: "success",
          msg: "😄 Parking deleted successfully.",
        })
      );
      dispatch({
        type: RELOAD_PARKING,
        payload: null,
      });
    })
    .catch((err) => {
      dispatch(
        showAlert({
          type: "error",
          msg: err.message,
        })
      );
      dispatch({
        type: PARKING_END,
        payload: null,
      });
    });
};
