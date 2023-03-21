import React, { useState } from "react";
import { Box, Paper, TextField, Button } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateParking } from "../action/parking.action";
import firebase from "firebase";

const EditParking = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const data = props.location.data;
  const [name, setName] = useState(data?.business_name);
  const [latitude, setLatitude] = useState(data?.location.x_);
  const [longitude, setLongitude] = useState(data?.location.N_);
  const [slots, setSlots] = useState(data?.slots);
  const [price, setPrice] = useState(data?.rate);
  const [qrText ,setQrText] = useState(data?.QRText)
  // edit parking
  const handleSave = () => {
    history.push("/home/parking");
    dispatch(
      updateParking({
        id: data?._id,
        data: {
          business_name: name,
          location: new firebase.firestore.GeoPoint(latitude, longitude),
          slots: slots,
          rate: price,
          QRText: qrText
        },
      })
    );
  };
  return (
    <Box component={Paper} m={2} p={2} elevation={3}>
      <Link style={{ color: "black" }} to="/home/parking/">
        <ArrowBack className="text" />
      </Link>
      <Box ml={3}>
        <h2>Edit Parking Place</h2>
        <p>ID: {data?._id}</p>
        <p>Owner: {data?.owner}</p>
        <p>Region: {data?.region}</p>
        <TextField
          required
          type="text"
          label="Business Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <TextField
          required
          type="number"
          label="Latitude"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        />
        <br />
        <TextField
          required
          type="number"
          label="Longitude"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        />
        <br />
        <TextField
          required
          type="number"
          label="Slots"
          value={slots}
          onChange={(e) => setSlots(e.target.value)}
        />
        <br />
        <TextField
          required
          type="number"
          label="Price per hr."
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <br/>
        <TextField
          required
          type="text"
          label="Qr Text"
          value={qrText}
          onChange={(e) => setQrText(e.target.value)}
        />
        <br />
        <br />
        <Button
          disabled={name === "" || qrText === "" }
          variant="contained"
          color="primary"
          onClick={handleSave}
        >
          Save
        </Button>
        <p>{name === "" || qrText === "" ? "* Please fill all the field." : null}</p>
      </Box>
    </Box>
  );
};

export default EditParking;
