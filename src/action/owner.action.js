import {
  OWNER_START,
  OWNER_END,
  FETCH_OWNER,
  RELOAD_OWNER,
} from "../constant/owner.constant";
import { showAlert } from "./alert.action";
import { db } from "../config/firebase";
import { v4 } from "uuid";

export const fetchOwner = () => (dispatch) => {
  dispatch({
    type: OWNER_START,
    payload: null,
  });
  let arr = [];
  db.collection("owner")
    .get()
    .then((doc) => {
      doc.forEach((docs) => {
        arr.push(docs.data());
      });
      dispatch({
        type: FETCH_OWNER,
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
        type: OWNER_END,
        payload: null,
      });
    });
};

export const addOwner = (data) => (dispatch) => {
  const id = v4();
  dispatch({
    type: OWNER_START,
    payload: null,
  });
  db.collection("owner")
    .doc(id)
    .set({
      _id: id,
      ...data,
    })
    .then((d) => {
      dispatch(
        showAlert({
          type: "success",
          msg: "😄 Owner added successfully.",
        })
      );
      dispatch({
        type: OWNER_END,
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
        type: OWNER_END,
        payload: null,
      });
    });
};

export const editOwner = (data) => (dispatch) => {
  dispatch({
    type: OWNER_START,
    payload: null,
  });
  db.collection("owner")
    .doc(data?.id)
    .update({
      ...data?.data,
    })
    .then(() => {
      dispatch(
        showAlert({
          type: "success",
          msg: "😄 Owner updated successfully.",
        })
      );
      dispatch({
        type: RELOAD_OWNER,
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
        type: OWNER_END,
        payload: null,
      });
    });
};

export const deleteOwner = (id) => (dispatch) => {
  dispatch({
    type: OWNER_START,
    payload: null,
  });
  db.collection("owner")
    .doc(id)
    .delete()
    .then(() => {
      dispatch(
        showAlert({
          type: "success",
          msg: "😄 Owner deleted successfully.",
        })
      );
      dispatch({
        type: RELOAD_OWNER,
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
        type: OWNER_END,
        payload: null,
      });
    });
};
