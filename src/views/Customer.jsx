import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { Box, Paper, CircularProgress, Backdrop } from "@material-ui/core";
import { db } from "../config/firebase";
import { showAlert } from "../action/alert.action";
import { useDispatch } from "react-redux";

const Customer = () => {
  const dispatch = useDispatch();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  // fetch customer list
  useEffect(() => {
    setLoading(true);
    let arr = [];
    db.collection("customer")
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          arr.push(doc.data());
        });
        setCustomers(arr);
        setLoading(false);
      })
      .catch((err) => {
        dispatch(
          showAlert({
            type: "error",
            msg: err.message,
          })
        );
      });
  }, []);
  return (
    <Box component={Paper} m={2} elevation={3}>
      {/* loading */}
      <Backdrop style={{ zIndex: "1000", color: "#fff" }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {/* cutomer table */}
      <MaterialTable
        title="Customers"
        columns={[
          {
            title: "Profile",
            field: "photoURL",
            render: (rowData) => (
              <img
                src={rowData?.photoURL}
                style={{ width: 50, height: 50, borderRadius: "50%" }}
              />
            ),
          },
          { title: "Email", field: "email" },
          { title: "Name", field: "name" },
          { title: "Gender", field: "gender" },
          {title: "Phone Number" , field: "phoneNumber"},
          { title: "Address", field: "address" },
        ]}
        data={customers}
        options={{
          exportButton: true,
        }}
      />
    </Box>
  );
};

export default Customer;
