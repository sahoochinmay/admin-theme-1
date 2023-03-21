import React, { useEffect, useState } from "react";
import { Box, Backdrop, CircularProgress, Paper } from "@material-ui/core";
import MaterialTable from "material-table";
import { useHistory } from "react-router-dom";
import { fetchParking, deleteParking } from "../action/parking.action";
import { useSelector, useDispatch } from "react-redux";

const Parking = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  // get data from redux
  const { loading, parking, reload } = useSelector(
    (state) => state.parkingReducer
  );
  // fetch parking list
  useEffect(() => {
    dispatch(fetchParking());
  }, [reload]);
  return (
    <Box component={Paper} m={2} elevation={3}>
      {/* loading */}
      <Backdrop style={{ zIndex: "1000", color: "#fff" }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {/* parking table */}
      <MaterialTable
        title="Parking Place"
        columns={[
          { title: "Name", field: "business_name" },
          {
            title: "Latitude",
            field: "location",
            render: (rowData) => <p>{rowData?.location.x_}</p>,
          },
          {
            title: "Longitude",
            field: "location",
            render: (rowData) => <p>{rowData?.location.N_}</p>,
          },
          { title: "Slots", field: "slots" },
          { title: "Rate / hrs", field: "rate" },
          { title: "Region", field: "region" },
          { title: "Owner", field: "owner" },
          { title: "QrText", field: "QRText" },
        ]}
        data={parking}
        actions={[
          {
            // edit parking
            icon: "edit",
            tooltip: "Edit Parking Place",
            onClick: (event, rowData) => {
              history.push({
                pathname: "/home/parking/edit",
                data: rowData,
              });
            },
          },
          {
            // add parking
            icon: "add",
            tooltip: "Add Parking Place",
            isFreeAction: true,
            onClick: (event, rowData) => {
              history.push("/home/parking/add");
            },
          },
          {
            // delete parking
            icon: "delete",
            tooltip: "Delete Parking Place",
            onClick: (event, rowData) => {
              dispatch(deleteParking(rowData?._id));
            },
          },
        ]}
        options={{
          actionsColumnIndex: -1,
          exportButton: true,
        }}
      />
    </Box>
  );
};

export default Parking;
