import React, { useState } from "react";
import {
  Box,
  Paper,
  Backdrop,
  CircularProgress,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { ArrowBack } from "@material-ui/icons";
import { db } from "../config/firebase";
import { showAlert } from "../action/alert.action";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const EditAdmin = (props) => {
  const data = props?.location?.data;
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(data?.name);
  const [level, setLevel] = useState(data?.level);
  // handle level change
  const handleChange = (event) => {
    setLevel(event.target.value);
  };
  // save admin
  const handleSave = () => {
    setLoading(true);
    db.collection("admin")
      .doc(data?._id)
      .update({
        name: name,
        level: level,
      })
      .then(() => {
        dispatch(
          showAlert({
            type: "success",
            msg: "😄 Admin updated Successfull.",
          })
        );
        setLoading(false);
        history.push("/home/admin");
      })
      .catch((err) => {
        dispatch(
          showAlert({
            type: "error",
            msg: err.message,
          })
        );
        setLoading(false);
      });
  };
  return (
    <Box component={Paper} m={2} p={2} elevation={3}>
      <Backdrop style={{ zIndex: "1000", color: "#fff" }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Link style={{ color: "black" }} to="/home/admin/">
        <ArrowBack className="text" />
      </Link>
      <Box ml={3}>
        <h3>Edit Admin</h3>
        <p>ID: {data?._id}</p>
        <p>Role: {data?.role}</p>
        <TextField
          required
          type="text"
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <br />
        <FormControl>
          <InputLabel>Level</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={level}
            onChange={handleChange}
          >
            <MenuItem value={"edit"}>Edit</MenuItem>
            <MenuItem value={"view"}>View</MenuItem>
          </Select>
        </FormControl>
        <br />
        <br />
        <Button
          disabled={name === ""}
          variant="contained"
          color="primary"
          onClick={handleSave}
        >
          Save
        </Button>
        <p>{name === "" ? "* Please fill all the field." : null}</p>
      </Box>
    </Box>
  );
};

export default EditAdmin;
