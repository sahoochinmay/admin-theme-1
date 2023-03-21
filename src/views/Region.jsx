import React, { useEffect } from "react";
import { Box, Backdrop, CircularProgress, Paper } from "@material-ui/core";
import MaterialTable from "material-table";
import {
  addRegion,
  deleteRegion,
  fetchRegion,
  editRegion,
} from "../action/region.action";
import { useSelector, useDispatch } from "react-redux";
import { showAlert } from "../action/alert.action";

const Region = () => {
  const dispatch = useDispatch();
  // get data from redux
  const { reload, loading, region } = useSelector(
    (state) => state.regionReducer
  );
  const { level } = useSelector((state) => state.authReducer);
  // fetch region list
  useEffect(() => {
    dispatch(fetchRegion());
  }, [reload]);
  return (
    <Box component={Paper} m={2} elevation={3}>
      {/* loading */}
      <Backdrop style={{ zIndex: "1000", color: "#fff" }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {/* region table */}
      <MaterialTable
        title="Regions"
        columns={[{ title: "Name", field: "name" }]}
        data={region}
        editable={{
          // add region
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                if (level === "edit") {
                  dispatch(addRegion(newData));
                } else {
                  dispatch(
                    showAlert({
                      type: "error",
                      msg: "😢 Hey, you can't add an Region.",
                    })
                  );
                }
                resolve();
              }, 1000);
            }),
            // update region
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                if (level === "edit") {
                  dispatch(
                    editRegion({
                      id: newData?._id,
                      data: newData?.name,
                    })
                  );
                } else {
                  dispatch(
                    showAlert({
                      type: "error",
                      msg: "😢 Hey, you can't update an Region.",
                    })
                  );
                }
                resolve();
              }, 1000);
            }),
            // delete region
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                if (level === "edit") {
                  dispatch(deleteRegion(oldData?._id));
                } else {
                  dispatch(
                    showAlert({
                      type: "error",
                      msg: "😢 Hey, you can't remove an Region.",
                    })
                  );
                }
                resolve();
              }, 1000);
            }),
        }}
        options={{
          actionsColumnIndex: -1,
          exportButton: true,
        }}
      />
    </Box>
  );
};

export default Region;
