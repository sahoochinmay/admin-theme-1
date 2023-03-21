import {
  EMPLOYEE_END,
  EMPLOYEE_START,
  FETCH_EMPLOYEE,
  RELOAD_EMPLOYEE,
} from "../constant/employees.constant";
import { showAlert } from "./alert.action";
import { db } from "../config/firebase";
import { v4 } from "uuid";

export const fetchEmployees = () => (dispatch) => {
  dispatch({
    type: EMPLOYEE_START,
    payload: null,
  });
  let arr = [];
  db.collection("employees")
    .get()
    .then((docs) => {
      docs.forEach((doc) => {
        arr.push(doc.data());
      });
      dispatch({
        type: FETCH_EMPLOYEE,
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
        type: EMPLOYEE_END,
        payload: null,
      });
    });
};

export const addEmployee = (data) => (dispatch) => {
  dispatch({
    type: EMPLOYEE_START,
    payload: null,
  });
  let id = v4();
  db.collection("employees")
    .doc(id)
    .set({
      _id: id,
      ...data,
    })
    .then(() => {
      dispatch(
        showAlert({
          type: "success",
          msg: "😄 Employee added successfully.",
        })
      );
      dispatch({
        type: RELOAD_EMPLOYEE,
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
        type: EMPLOYEE_END,
        payload: null,
      });
    });
};

export const updateEmployee = (data) => (dispatch) => {
  dispatch({
    type: EMPLOYEE_START,
    payload: null,
  });
  db.collection("employees")
    .doc(data?.id)
    .update({
      ...data?.data,
    })
    .then(() => {
      dispatch(
        showAlert({
          type: "success",
          msg: "😄 Employee updated successfully.",
        })
      );
      dispatch({
        type: RELOAD_EMPLOYEE,
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
        type: EMPLOYEE_END,
        payload: null,
      });
    });
};

export const deleteEmployee = (id) => (dispatch) => {
  dispatch({
    type: EMPLOYEE_START,
    payload: null,
  });
  db.collection("employees")
    .doc(id)
    .delete()
    .then(() => {
      dispatch(
        showAlert({
          type: "success",
          msg: "😄 Employee deleted successfully.",
        })
      );
      dispatch({
        type: RELOAD_EMPLOYEE,
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
        type: EMPLOYEE_END,
        payload: null,
      });
    });
};
