import {
  REGION_END,
  REGION_START,
  FETCH_REGION,
  RELOAD_REGION
} from "../constant/region.constant";
import { showAlert } from "./alert.action";
import { db } from "../config/firebase";
import { v4 } from "uuid";

export const fetchRegion = () => (dispatch) => {
  dispatch({
    type: REGION_START,
    payload: null,
  });
  let arr = [];
  db.collection("region")
    .get()
    .then((docs) => {
      docs.forEach((doc) => {
        arr.push(doc.data());
      });
      dispatch({
        type: FETCH_REGION,
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
        type: REGION_END,
        payload: null,
      });
    });
};

export const addRegion = (data) => (dispatch) => {
  dispatch({
    type: REGION_START,
    payload: null,
  });
  const id = v4();
  db.collection("region")
    .doc(id)
    .set({
      _id: id,
      ...data,
    })
    .then(() => {
      dispatch(
        showAlert({
          type: "success",
          msg: "😄 Region added successfully.",
        })
      );
      dispatch({
        type: RELOAD_REGION,
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
        type: REGION_END,
        payload: null,
      });
    });
};

export const deleteRegion = (id) => (dispatch) => {
  dispatch({
    type: REGION_START,
    payload: null,
  });
  db.collection("region")
    .doc(id)
    .delete()
    .then(() => {
      dispatch(
        showAlert({
          type: "success",
          msg: "😄 Region deleted successfully.",
        })
      );
      dispatch({
        type: RELOAD_REGION,
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
        type: REGION_END,
        payload: null,
      });
    });
};

export const editRegion = (data) => (dispatch) => {
  dispatch({
    type: REGION_START,
    payload: null,
  });
  db.collection("region")
    .doc(data?.id)
    .update({
      name: data?.data
    })
    .then(() => {
      dispatch(
        showAlert({
          type: "success",
          msg: "😄 Region updated successfully.",
        })
      );
      dispatch({
        type: RELOAD_REGION,
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
        type: REGION_END,
        payload: null,
      });
    });
};
