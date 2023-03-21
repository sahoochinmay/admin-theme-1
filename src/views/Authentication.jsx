import React, { useState, useEffect } from "react";
import {
  CssBaseline,
  Avatar,
  Button,
  TextField,
  Container,
  Box,
  Typography,
  CircularProgress,
  Backdrop
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { LockOutlined } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
// actions
import { SignIn } from "../action/auth.action";
// copyright component
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <a color="inherit" href="">
        Quintessence
      </a>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
// styles
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Authentication = (props) => {
  // declarations
  const dispatch = useDispatch();
  const classes = useStyles();
  const [email, set_email] = useState("");
  const [password, set_password] = useState("");
  // check  data
  const { isLoggedIn, loading } = useSelector((state) => state.authReducer);
  // sign in method
  const handleSignIn = () => {
    dispatch(SignIn(email, password));
  };
  // check user loggedin or not to change route
  useEffect(() => {
    if (isLoggedIn) {
      props.history.push("/home");
    } else props.history.push("/");
  }, [isLoggedIn]);
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {/* loading */}
      <Backdrop style={{ zIndex: "1000", color: "#fff" }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => set_email(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => set_password(e.target.value)}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSignIn}
          >
            {loading ? "...signing" : "SIGN IN"}
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Authentication;
