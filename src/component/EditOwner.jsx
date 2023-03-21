import React, { useState } from "react";
import { Box, Paper, TextField, Button } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import MuiPhoneNumber from "material-ui-phone-number";
import { editOwner } from "../action/owner.action";

const EditOwner = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const data = props?.location?.data;
  const [firstName, setFirstName] = useState(data?.first_name);
  const [lastName, setLastName] = useState(data?.last_name);
  const [number, setNumber] = useState(data?.phone_number);
  const [email ,setEmail] = useState(data?.email)
  // edit owner
  const handleSave = () => {
    history.push("/home/owner");
    dispatch(
      editOwner({
        id: data?._id,
        data: {
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone_number: number
        },
      })
    );
  };
  return (
    <Box component={Paper} m={2} p={2} elevation={3}>
      <Link style={{ color: "black" }} to="/home/owner/">
        <ArrowBack className="text" />
      </Link>
      <Box ml={3}>
        <h2>Edit</h2>
        <p>ID: {data?._id}</p>
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
        <br />
        <br />
        <MuiPhoneNumber
          required
          defaultCountry={"us"}
          value={number}
          onChange={(value) => setNumber(value)}
        />
        <br />
        <br />
        <Button
          disabled={firstName === "" || lastName === "" || number === undefined}
          variant="contained"
          color="primary"
          onClick={handleSave}
        >
          Save
        </Button>
        <p>
          {firstName === "" || lastName === "" || number === undefined
            ? "* Please fill all the field."
            : null}
        </p>
      </Box>
    </Box>
  );
};

export default EditOwner;
