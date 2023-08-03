import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://www.happiestminds.com/mindful-it-company/"
      >
        Happiest Minds
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "50ch",
    },
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    alignItems: "center",
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  alertRoot: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
      marginLeft: theme.spacing(7),
      marginRight: theme.spacing(7),
    },
  },

  button: {
    marginTop: theme.spacing(3),
    // marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(3),
  },
}));

export default function Handover() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                id="Name"
                name="Name"
                label="Enter Receiver Name"
                fullWidth
                autoComplete="given-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="Number"
                name="Number"
                label="Fill Consignment Number"
                fullWidth
                autoComplete="username"
              />
            </Grid>

            <Grid container>
              <Grid item xs={0} sm={3}></Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  // onClick={handleNext}
                  className={classes.button}
                >
                  Create Handover Request
                </Button>
              </Grid>
              <Grid item xs={0} sm={3}></Grid>
            </Grid>
            <Grid container>
              <Grid item xs={0} sm={1}></Grid>
              <Grid item xs={12} sm={10}>
                <div className={classes.alertRoot}>
                  {/* <Alert severity="error">Failed to verify IoT Data. Check the consignment details again!</Alert> */}
                  <Alert severity="success">IoT Data verified!</Alert>
                </div>
              </Grid>
              <Grid item xs={0} sm={1}></Grid>
            </Grid>

            <Grid container>
              <Grid item xs={0} sm={3}></Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  // onClick={handleNext}
                  className={classes.button}
                >
                  Ask Receiver for Consent
                </Button>
              </Grid>
              <Grid item xs={0} sm={3}></Grid>
            </Grid>

            <br />
            {/* <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      // onClick={handleNext}
                      className={classes.button}  
                      disabled      
              >Ask Receiver for Consent</Button> */}

            <Grid container>
              <Grid item xs={0} sm={1}></Grid>
              <Grid item xs={12} sm={10}>
                <div className={classes.alertRoot}>
                  <Alert severity="success">Consent Received</Alert>
                  {/* <Alert severity="error">Consent not received from the Insurance Provider</Alert> */}
                </div>
              </Grid>
              <Grid item xs={0} sm={1}></Grid>
            </Grid>
            <Grid container>
              <Grid item xs={0} sm={6}></Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="contained"
                  color="primary"
                  // onClick={handleNext}
                  className={classes.button}
                  fullWidth
                >
                  Confirm Shipment Handover
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}
