import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { db } from "../config/firebase";
import { showAlert } from "../action/alert.action";
import { useDispatch } from "react-redux";
import { Box, Backdrop, CircularProgress, Paper } from "@material-ui/core";

const Receipt = () => {
  const dispatch = useDispatch();
  const [receipt, setReceipt] = useState([]);
  const [loading, setLoading] = useState(false);
  // fetch receipt list
  useEffect(() => {
    setLoading(true);
    let arr = [];
    db.collection("receipt")
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          arr.push(doc.data());
        });
        setReceipt(arr);
        setLoading(false);
      })
      .catch((err) => {
        dispatch(
          showAlert({
            type: "error",
            msg: err.message,
          })
        );
        setLoading(false);
      });
    console.log(arr);
  }, []);
  return (
    <Box component={Paper} m={2} elevation={3}>
      {/* loading */}
      <Backdrop style={{ zIndex: "1000", color: "#fff" }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {/* receipt table */}
      <MaterialTable
        title="Receipt"
        columns={[
          { title: "Session Id", field: "sessionId" },
          { title: "Parking Name", field: "parkingName" },
          {
            title: "Customer Name",
            field: "customerName",
          },
          {
            title: "Fare",
            field: "fare",
          },
        ]}
        data={receipt}
        options={{
          actionsColumnIndex: -1,
          exportButton: true,
        }}
      />
    </Box>
  );
};

export default Receipt;
