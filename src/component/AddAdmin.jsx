import React, { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  Backdrop,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { db, auth } from "../config/firebase";
import { showAlert } from "../action/alert.action";

const AddAdmin = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [level, setLevel] = useState("view");
  const [loading, setLoading] = useState(false);
  // add admin
  const handleAdd = () => {
    setLoading(true);
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        const id = res?.user?.uid;
        console.log(res?.user);
        db.collection("admin").doc(id).set({
          _id: id,
          level: level,
          name: name,
          role: "admin",
        });
      })
      .then(() => {
        dispatch(
          showAlert({
            type: "success",
            msg: "😄 Admin created Successfull.",
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
  // handle level change
  const handleChange = (event) => {
    setLevel(event.target.value);
  };
  return (
    <Box component={Paper} m={2} p={2} elevation={3}>
      {/* loading */}
      <Backdrop style={{ zIndex: "1000", color: "#fff" }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Link style={{ color: "black" }} to="/home/admin/">
        <ArrowBack className="text" />
      </Link>
      <Box ml={3}>
        <h3>Add New Admin</h3>
        <TextField
          required
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <TextField
          required
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
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
          disabled={email === "" || password === "" || name === ""}
          variant="contained"
          color="primary"
          onClick={handleAdd}
        >
          Add
        </Button>
        <p>
          {email === "" || password === "" || name === ""
            ? "* Please fill all the field."
            : null}
        </p>
      </Box>
    </Box>
  );
};

export default AddAdmin;
