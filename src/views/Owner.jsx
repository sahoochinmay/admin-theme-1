import React, { useEffect } from "react";
import MaterialTable from "material-table";
import { Box, Paper, CircularProgress, Backdrop } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { fetchOwner, deleteOwner } from "../action/owner.action";
import { useDispatch, useSelector } from "react-redux";

const Owner = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  // get data from redux
  const { owner, loading, reload } = useSelector((state) => state.ownerReducer);
  const { level } = useSelector((state) => state.authReducer);
  // fetch owner list
  useEffect(() => {
    dispatch(fetchOwner());
  }, [reload]);
  return (
    <Box component={Paper} m={2} elevation={3}>
      {/* loading */}
      <Backdrop style={{ zIndex: "1000", color: "#fff" }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {/* owner table */}
      <MaterialTable
        title="Owners"
        columns={[
          { title: "First Name", field: "first_name" },
          { title: "Last Name", field: "last_name" },
          { title: "Email", field: "email" },
          { title: "Phone Number", field: "phone_number" },
        ]}
        data={owner}
        actions={[
          {
            // edit owner
            icon: "edit",
            tooltip: "Edit Owner",
            onClick: (event, rowData) => {
              history.push({
                pathname: "/home/owner/edit",
                data: rowData,
              });
            },
          },
          {
            // add owner
            icon: "add",
            tooltip: "Add Owner",
            isFreeAction: true,
            onClick: (event, rowData) => {
              history.push("/home/owner/add");
            },
          },
          {
            // delete owner
            icon: "delete",
            tooltip: "Delete Owner",
            onClick: (event, rowData) => {
              dispatch(deleteOwner(rowData?._id));
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

export default Owner;
