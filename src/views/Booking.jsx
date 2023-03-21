import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { Box, Paper, CircularProgress, Backdrop } from "@material-ui/core";
import { db } from "../config/firebase";
import { showAlert } from "../action/alert.action";
import { useDispatch } from "react-redux";

const Booking = () => {
  const dispatch = useDispatch();
  const [booking, setBooking] = useState([]);
  const [loading, setLoading] = useState(false);
  // fetch booking list
  useEffect(() => {
    setLoading(true);
    let arr = [];
    let size = 0;
    db.collection("booking")
      .get()
      .then((docs) => {
        size = docs.size;
        docs.forEach((doc) => {
          arr.push(doc.data());
        });
        setBooking(arr);
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
  }, []);
  return (
    <Box component={Paper} m={2} elevation={3}>
      {/* loading */}
      <Backdrop style={{ zIndex: "1000", color: "#fff" }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {/* booking table */}
      <MaterialTable
        title="Booking"
        columns={[
          { title: "Parking Id", field: "parking_id" },
          { title: "Customer Id", field: "customer_id" },
          { title: "Booking Date", field: "booking_date" },
          { title: "Booking Time", field: "booking_time" },
          { title: "Is Completed", field: "isCompleted" },
          {
            title: "Location",
            field: "location",
            render: (rowData) => (
              <>
                <p>Latitude:{rowData?.location?.latitude}</p>
                <p>Longitude:{rowData?.location?.longitude}</p>
              </>
            ),
          },
        ]}
        data={booking}
        options={{
          exportButton: true,
        }}
      />
    </Box>
  );
};

export default Booking;
