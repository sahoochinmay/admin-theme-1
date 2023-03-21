import React, { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  TextareaAutosize,
  Switch,
} from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import MuiPhoneNumber from "material-ui-phone-number";
import { updateEmployee} from "../action/employees.action";

const EditEmployee = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const data = props.location.data;
  const [firstName, setFirstName] = useState(data?.first_name);
  const [lastName, setLastName] = useState(data?.last_name);
  const [userName, setUserName] = useState(data?.username);
  const [number, setNumber] = useState(data?.phone_number);
  const [role, setRole] = useState(data?.role);
  const [address, setAddress] = useState(data?.address);
  const [status, setStatus] = useState(data?.status);
  const [area, setArea] = useState(data?.area);
  // save employee
  const handleSave = () => {
    history.push("/home/employees");
    dispatch(
      updateEmployee({
        id: data?._id,
        data: {
          first_name: firstName,
          last_name: lastName,
          phone_number: number,
          username: userName,
          status: status,
          role: role,
          area: area,
          address: address,
        },
      })
    );
  };
  return (
    <Box component={Paper} m={2} p={2} elevation={3}>
      <Link style={{ color: "black" }} to="/home/employees/">
        <ArrowBack className="text" />
      </Link>
      <Box ml={3}>
        <h2>Edit Employee</h2>
        <p>ID: {data?._id} </p>
        <TextField
          required
          type="text"
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <br />
        <TextField
          required
          type="text"
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <br />
        <TextField
          required
          type="text"
          label="UserName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <br />
        <TextField
          required
          type="text"
          label="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <br />
        <br />
        <label>Phone Number: </label>&nbsp;&nbsp;
        <MuiPhoneNumber
          required
          defaultCountry={"us"}
          value={number}
          onChange={(value) => setNumber(value)}
        />
        <br />
        <p>Hire Date: {data?.hire_date}</p>
        <p>Region: {data?.region}</p>
        <br />
        <TextField
          required
          type="text"
          label="Area"
          value={area}
          onChange={(e) => setArea(e.target.value)}
        />
        <br />
        <br />
        <label htmlFor="">Status :</label>&nbsp;&nbsp;&nbsp;&nbsp;
        <Switch
          checked={status}
          onChange={() => setStatus(!status)}
          color="primary"
          name="Status"
        />
        <br />
        <br />
        <TextareaAutosize
          style={{
            width: "100%",
            maxWidth: "400px",
          }}
          rowsMin={4}
          placeholder="Address..."
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <br />
        <Button
          disabled={
            firstName === "" ||
            lastName === "" ||
            number === undefined ||
            address === "" ||
            area === "" ||
            role === ""
          }
          variant="contained"
          color="primary"
          onClick={handleSave}
        >
          Save
        </Button>
        <p>
          {firstName === "" ||
          lastName === "" ||
          number === undefined ||
          address === "" ||
          area === "" ||
          role === ""
            ? "* Please fill all the field."
            : null}
        </p>
      </Box>
    </Box>
  );
};

export default EditEmployee;
