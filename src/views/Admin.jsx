import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { Box, Paper, CircularProgress, Backdrop } from "@material-ui/core";
import { db } from "../config/firebase";
import { useDispatch , useSelector } from "react-redux";
import { showAlert } from "../action/alert.action";
import {useHistory} from 'react-router-dom'

const Admin = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  // get level from redux
  const {level} = useSelector(state => state.authReducer)
  const [adminList, setAdminList] = useState([]);
  const [adminLoading, setAdminLoading] = useState(false);
  const [reload ,setReload] = useState("")
  // fetch admin list
  useEffect(() => {
    setAdminLoading(true);
    let arr = [];
    db.collection("admin")
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          arr.push(doc.data());
        });
        setAdminList(arr);
        setAdminLoading(false)
      })
      .catch((err) => {
        setAdminLoading(false);
        dispatch(
          showAlert({
            type: "error",
            msg: err.message,
          })
        );
        setAdminLoading(false)
      });
  }, [reload]);
  // remove admin
  const deleteAdmin = (data) => {
    setAdminLoading(true);
    db.collection("admin")
      .doc(data?._id)
      .delete()
      .then(() => {
        setAdminLoading(false);
        dispatch(
          showAlert({
            type: "success",
            msg: "😄 Admin Removed successfully.",
          })
        );
        setReload("reload")
      })
      .catch((err) => {
        setAdminLoading(false);
        dispatch(
          showAlert({
            type: "error",
            msg: err.message,
          })
        );
      });
  };
  return (
    <Box component={Paper} m={2} elevation={3}>
      {/* loading */}
      <Backdrop style={{ zIndex: "1000", color: "#fff" }} open={adminLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {/* admin table */}
      <MaterialTable
        title="Admin"
        columns={[
          { title: "Admin Name", field: "name" },
          { title: "Role", field: "role", editable: "never" },
          { title: "Permission", field: "level", editable: "never" }
        ]}
        data={adminList}
        options={{
          exportButton: true,
          actionsColumnIndex: -1,
        }}
        editable={{
          // admin delete call
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                if (level === 'edit') {
                deleteAdmin(oldData)
                }else {
                    dispatch(
                        showAlert({
                          type: "error",
                          msg: "😢 Hey, you can't remove an admin.",
                        })
                      );
                }
                resolve();
              }, 1000);
            })
        }}
        actions={[
          {
            // admin edit call
            icon: "edit",
            tooltip: "Edit Admin",
            onClick: (event, rowData) => {
              history.push({
                pathname: "/home/admin/edit",
                data: rowData,
              });
            },
          },
          {
            // admin add call
            icon: "add",
            tooltip: "Add Admin",
            isFreeAction: true,
            onClick: (event, rowData) => {
              history.push("/home/admin/add");
            },
          }
        ]}
      />
    </Box>
  );
};

export default Admin;
