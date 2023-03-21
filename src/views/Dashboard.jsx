import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Backdrop,
  CircularProgress,
  Grid,
} from "@material-ui/core";
import { db } from "../config/firebase";

const Dashboard = () => {
  const [bookings, setBookings] = useState(0);
  const [parkings, setParkings] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [owners, setOwners] = useState(0);
  const [session, setSession] = useState(0);
  const [admin, setAdmin] = useState(0);
  useEffect(() => {
    // fetch booking list
    db.collection("booking")
      .get()
      .then((docs) => {
        setBookings(docs.size);
      });
    // fetch parking list
    db.collection("parking")
      .get()
      .then((docs) => {
        setParkings(docs.size);
      });
    // fetch customer list
    db.collection("customer")
      .get()
      .then((docs) => {
        setCustomers(docs.size);
      });
    // fetch owner list
    db.collection("owner")
      .get()
      .then((docs) => {
        setOwners(docs.size);
      });
    // fetch session list
    db.collection("session")
      .get()
      .then((docs) => {
        setSession(docs.size);
      });
    // fetch admin list
    db.collection("admin")
      .get()
      .then((docs) => {
        setAdmin(docs.size);
      });
  }, []);
  return (
    <Box m={2}>
      <Box component={Paper} p={2} mb={3} elevation={3}>
        <Backdrop style={{ zIndex: "1000", color: "#fff" }} open={false}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <h1>Welcome to Quintessence</h1>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Paper style={{ padding: "10px" }}>
            <h2>Total Booking</h2>
            <p>{bookings}</p>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper style={{ padding: "10px" }}>
            <h2>Total Parkings</h2>
            <p>{parkings}</p>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper style={{ padding: "10px" }}>
            <h2>Total Customer</h2>
            <p>{customers}</p>
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Paper style={{ padding: "10px" }}>
            <h2>Total Owners</h2>
            <p>{owners}</p>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper style={{ padding: "10px" }}>
            <h2>Total Sessions</h2>
            <p>{session}</p>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper style={{ padding: "10px" }}>
            <h2>Total Admin</h2>
            <p>{admin}</p>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Dashboard;
