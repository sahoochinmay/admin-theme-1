import React, { useState } from "react";
import { Box, Paper, TextField, Button } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import MuiPhoneNumber from "material-ui-phone-number";
import {addOwner} from '../action/owner.action'
import {useDispatch} from 'react-redux'
 
const AddOwner = () => {
  const history = useHistory();
  const dispatch = useDispatch()
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [number, setNumber] = useState();
  const [email,setEmail] = useState("")
  // add new owner
  const handleAdd = () => {
    history.push("/home/owner");
    dispatch(addOwner({
       first_name: firstName,
       last_name: lastName,
       email: email,
       phone_number: number
    }))
  };
  return (
    <Box component={Paper} m={2} p={2} elevation={3}>
      <Link style={{ color: "black" }} to="/home/owner/">
        <ArrowBack className="text" />
      </Link>
      <Box ml={3}>
        <h2>Add New Owner</h2>
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
        <br/>
        <TextField
          required
          type="text"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p>Phone Number: </p>
        <MuiPhoneNumber
          required
          defaultCountry={"us"}
          value={number}
          onChange={(value) => setNumber(value)}
        />
        <br />
        <br />
        <Button
          disabled={firstName === "" || lastName === "" || number === undefined || email === ""}
          variant="contained"
          color="primary"
          onClick={handleAdd}
        >
          Add
        </Button>
        <p>
          {firstName === "" || lastName === "" || number === undefined || email === ""
            ? "* Please fill all the field."
            : null}
        </p>
      </Box>
    </Box>
  );
};

export default AddOwner;
