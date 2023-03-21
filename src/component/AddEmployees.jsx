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
import { useDispatch, useSelector } from "react-redux";
import { Autocomplete } from "@material-ui/lab";
import { Link, useHistory } from "react-router-dom";
import MuiPhoneNumber from "material-ui-phone-number";
import {addEmployee} from '../action/employees.action'

const AddEmployees = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const { region } = useSelector((state) => state.regionReducer);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [number, setNumber] = useState();
  const [regionSelect, setRegionSelect] = useState();
  const [role, setRole] = useState("");
  const [hireDate, setHireDate] = useState(new Date());
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState(false);
  const [area, setArea] = useState("");
  // add employe
  const handleAdd = () => {
      history.push("/home/employees")
    dispatch(addEmployee({
        first_name: firstName,
        last_name: lastName,
        phone_number: number,
        username: userName,
        hire_date: hireDate,
        status:  status,
        role: role,
        region: regionSelect?.name,
        area: area,
        address: address
    }))
  };
  return (
    <Box component={Paper} m={2} p={2} elevation={3}>
      <Link style={{ color: "black" }} to="/home/employees/">
        <ArrowBack className="text" />
      </Link>
      <Box ml={3}>
        <h2>Add New Employee</h2>
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
        <br />
        <label>Hire Date: </label>
        <input
          type="date"
          value={hireDate}
          onChange={(e) => setHireDate(e.target.value)}
        />
        <br/>
        <br/>
        <Autocomplete
          value={regionSelect}
          onChange={(event, newValue) => {
            setRegionSelect(newValue);
          }}
          options={region}
          getOptionLabel={(option) => option.name}
          style={{ width: 200 }}
          renderInput={(params) => (
            <TextField required {...params} label="Region" />
          )}
        />
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
            role === "" ||
            regionSelect === undefined
          }
          variant="contained"
          color="primary"
          onClick={handleAdd}
        >
          Add
        </Button>
        <p>
          {firstName === "" ||
          lastName === "" ||
          number === undefined ||
          address === "" ||
          area === "" ||
          role === "" ||
          regionSelect === undefined
            ? "* Please fill all the field."
            : null}
        </p>
      </Box>
    </Box>
  );
};

export default AddEmployees;
