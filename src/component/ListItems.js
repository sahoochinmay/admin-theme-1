import React from "react";
import { Link } from "react-router-dom";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import {
  Dashboard,
  People,
  Receipt,
  Face,
  EventSeat,
  LocalParking,
  LocationOn,
  HourglassFull,
  CardMembership,
  Note
} from "@material-ui/icons";
import { useSelector } from "react-redux";

export const MainListItems = () => {
  const { level } = useSelector((state) => state.authReducer);
  //   role for division
  const role = "admin";
  switch (role) {
    case "admin":
      return (
        <div>
          <ListItem button component={Link} to="/home/">
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          {level === "edit" ? (
            <ListItem button component={Link} to="/home/admin/">
              <ListItemIcon>
                <CardMembership />
              </ListItemIcon>
              <ListItemText primary="Admin" />
            </ListItem>
          ) : null}

          <ListItem button component={Link} to="/home/booking/">
            <ListItemIcon>
              <Note />
            </ListItemIcon>
            <ListItemText primary="Booking" />
          </ListItem>
          <ListItem button component={Link} to="/home/receipt/">
            <ListItemIcon>
              <Receipt />
            </ListItemIcon>
            <ListItemText primary="Receipt" />
          </ListItem>
          <ListItem button component={Link} to="/home/customer/">
            <ListItemIcon>
              <Face />
            </ListItemIcon>
            <ListItemText primary="Customer" />
          </ListItem>
          <ListItem button component={Link} to="/home/employees/">
            <ListItemIcon>
              <People />
            </ListItemIcon>
            <ListItemText primary="Employees" />
          </ListItem>
          <ListItem button component={Link} to="/home/owner/">
            <ListItemIcon>
              <EventSeat />
            </ListItemIcon>
            <ListItemText primary="Owner" />
          </ListItem>
          <ListItem button component={Link} to="/home/parking/">
            <ListItemIcon>
              <LocalParking />
            </ListItemIcon>
            <ListItemText primary="Parking" />
          </ListItem>
          <ListItem button component={Link} to="/home/region/">
            <ListItemIcon>
              <LocationOn />
            </ListItemIcon>
            <ListItemText primary="Region" />
          </ListItem>
          <ListItem button component={Link} to="/home/session/">
            <ListItemIcon>
              <HourglassFull />
            </ListItemIcon>
            <ListItemText primary="Session" />
          </ListItem>
        </div>
      );
    default:
      return null;
  }
};
