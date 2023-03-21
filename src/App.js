import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { closeAlert } from "./action/alert.action";
// Initial Routes
import Home from "./views/Home.jsx";
import Authentication from "./views/Authentication.jsx";
// Pre-requisites data
import {fetchRegion} from './action/region.action'
import {fetchOwner} from './action/owner.action'

const App = () => {
  const dispatch = useDispatch();
  const { flag, type, msg } = useSelector((state) => state.alertReducer);
  useEffect(() => {
    // Pre-requisites data to be load
    dispatch(fetchRegion())
    dispatch(fetchOwner())
  }, []);
  // alert close using redux
  const handleAlertClose = () => {
    dispatch(closeAlert());
  };
  return (
    <Router>
      <Snackbar open={flag} autoHideDuration={5000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity={type}>
          {msg}
        </Alert>
      </Snackbar>
      <Switch>
        <Route exact path="/" component={Authentication} />
        <Route path="/home/" component={Home} />
      </Switch>
    </Router>
  );
};

export default App;
