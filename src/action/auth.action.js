import {
  USER_SIGNIN,
  USER_END,
  USER_START,
  USER_SIGNOUT,
} from "../constant/auth.constant";
import { showAlert } from "./alert.action";
import { auth, db } from "../config/firebase";

export const SignIn = (email, password) => (dispatch) => {
  dispatch({
    type: USER_START,
    payload: null,
  });
  auth
    .signInWithEmailAndPassword(email, password)
    .then((data) => {
      db.collection("admin")
        .doc(data?.user.uid)
        .get()
        .then((doc) => {
          let role = doc.data()?.role;
          if (role === "admin" || role !== undefined) {
            dispatch({
              type: USER_SIGNIN,
              payload: {
                user: data?.user,
                level: doc.data()?.level
              },
            });

            dispatch(
              showAlert({
                type: "success",
                msg: "😄 Logged in Successfull.",
              })
            );
          } else {
            dispatch(
              showAlert({
                type: "error",
                msg: "😢 sorry ! you are not a admin.",
              })
            );
          }
          dispatch({
            type: USER_END,
            payload: null,
          });
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
        type: USER_END,
        payload: null,
      });
    });
};

export const SignOut = () => (dispatch) => {
  dispatch({
    type: USER_START,
    payload: null,
  });
  auth
    .signOut()
    .then(() => {
      dispatch({
        type: USER_SIGNOUT,
        payload: null,
      });
      dispatch(
        showAlert({
          type: "success",
          msg: "😄 Logged out successfull.",
        })
      );
    })
    .catch((err) => {
      dispatch(
        showAlert({
          type: "error",
          msg: err.message,
        })
      );
    });
  dispatch({
    type: USER_END,
    payload: null,
  });
};
