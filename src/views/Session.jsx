import React,{useState, useEffect} from "react";
import { Box, Backdrop, CircularProgress, Paper } from "@material-ui/core";
import MaterialTable from "material-table";
import { db } from "../config/firebase";
import { showAlert } from "../action/alert.action";
import { useDispatch } from "react-redux";

const Session = () => {
  const dispatch = useDispatch();
  const [session, setSession] = useState([]);
  const [loading, setLoading] = useState(false);
  // fetch session list
  useEffect(() => {
    setLoading(true);
    let arr = [];
    db.collection("session")
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          arr.push(doc.data());
        });
        setSession(arr);
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
      {/* session table */}
      <MaterialTable
        title="Session"
        columns={[
          { title: "Booking Id", field: "booking_id" },
          { title: "Start Time", field: "start_time" },
          { title: "End Time", field: "end_time" },
          { title: "Duration", field: "session_duration" },
          {title: "isCompleted" , field: "isCompleted"},
          {title: "Parking Text" , field: "parking_text"}
        ]}
        data={session}
        options={{
          actionsColumnIndex: -1,
          exportButton: true
        }}
      />
    </Box>
  );
};

export default Session;
