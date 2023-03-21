import React, { useState } from "react";
import { Box, Paper, TextField, Button } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Autocomplete } from "@material-ui/lab";
import {addParking} from '../action/parking.action'
import firebase from 'firebase'

const AddParking = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { region } = useSelector((state) => state.regionReducer);
  const { owner } = useSelector((state) => state.ownerReducer);
  const [name, setName] = useState("");
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [slots, setSlots] = useState();
  const [price, setPrice] = useState();
  const [regionSelect, setRegionSelect] = useState();
  const [ownerSelect, setOwnerSelect] = useState();
  const [qrText ,setQrText] = useState("")
  // add new parking
  const handleAdd = () => {
    history.push("/home/parking");
    dispatch(
        addParking({
            business_name:name,
            location: new firebase.firestore.GeoPoint(latitude, longitude),
            slots: slots,
            rate: price,
            region: regionSelect?.name,
            owner: ownerSelect?.first_name+" "+ownerSelect?.last_name,
            QRText: qrText
        })
    );
  };
  return (
    <Box component={Paper} m={2} p={2} elevation={3}>
      <Link style={{ color: "black" }} to="/home/parking/">
        <ArrowBack className="text" />
      </Link>
      <Box ml={3}>
        <h2>Add New Parking Place</h2>
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
        <br />
        <br />
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
        <Autocomplete
          value={ownerSelect}
          onChange={(event, newValue) => {
            setOwnerSelect(newValue);
          }}
          options={owner}
          getOptionLabel={(option) =>
            option.first_name + " " + option.last_name
          }
          style={{ width: 200 }}
          renderInput={(params) => (
            <TextField required {...params} label="Owner" />
          )}
        />
        <br />
        <TextField
          required
          type="text"
          label="Qr Text"
          value={qrText}
          onChange={(e) => setQrText(e.target.value)}
        />
        <br />
        <br/>
        <Button
          disabled={
            name === "" ||
            latitude === undefined ||
            longitude === undefined ||
            slots === undefined ||
            price === undefined ||
            regionSelect === undefined ||
            ownerSelect === undefined ||
            qrText === ""
          }
          variant="contained"
          color="primary"
          onClick={handleAdd}
        >
          Add
        </Button>
        <p>
          {name === "" ||
          latitude === undefined ||
          longitude === undefined ||
          slots === undefined ||
          price === undefined ||
          regionSelect === undefined ||
          ownerSelect === undefined ||
          qrText === ""
            ? "* Please fill all the field."
            : null}
        </p>
      </Box>
    </Box>
  );
};

export default AddParking;
