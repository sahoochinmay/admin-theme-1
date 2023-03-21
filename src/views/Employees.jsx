import React, { useEffect } from "react";
import { Box, Backdrop, CircularProgress, Paper } from "@material-ui/core";
import MaterialTable from "material-table";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchEmployees, deleteEmployee } from "../action/employees.action";

const Employees = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  // get loading , employes data from redux
  const { loading, employees, reload } = useSelector(
    (state) => state.employeesReducer
  );
  const {level}  = useSelector(
    state => state.authReducer
  )
  // fech employee details
  useEffect(() => {
    dispatch(fetchEmployees());
  }, [reload]);
  return (
    <Box component={Paper} m={2} elevation={3}>
      <Backdrop style={{ zIndex: "1000", color: "#fff" }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <MaterialTable
        title="Employees"
        columns={[
          { title: "Emp. Id", field: "_id" },
          { title: "UserName", field: "username" },
          { title: "First Name", field: "first_name" },
          { title: "Last Name", field: "last_name" },
          { title: "Status", field: "status" },
          { title: "Role", field: "role" },
          { title: "Phone Number", field: "phone_number" },
          { title: "Hire Date", field: "hire_date" },
          { title: "Area", field: "area" },
          { title: "Region", field: "region" },
          { title: "Address", field: "address" },
        ]}
        data={employees}
        actions={[
          {
            icon: "edit",
            disabled: (level === "edit" ? false : true),
            tooltip: "Edit Employee",
            onClick: (event, rowData) => {
              history.push({
                pathname: "/home/employees/edit",
                data: rowData,
              });
            },
          },
          {
            icon: "add",
            disabled: (level === "edit" ? false : true),
            tooltip: "Add Employee",
            isFreeAction: true,
            onClick: (event, rowData) => {
              history.push("/home/employees/add");
            },
          },
          {
            icon: "delete",
            disabled: (level === "edit" ? false : true),
            tooltip: "Delete Employee",
            onClick: (event, rowData) => {
              dispatch(deleteEmployee(rowData?._id));
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

export default Employees;
