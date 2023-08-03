import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import Button from '@material-ui/core/Button';
import Details from './ConsignmentDetails';
import IoTDetails from './IoTDetails';
import ConsTable from './ConsignmentTable';
import Chart from './Chart';
import Chart1 from './Chart1';
import Chart2 from './Chart2';
import Map from './MapView';
import Spinner from '../layout/Spinner';
import Moment from 'react-moment';
import { getShipment } from '../../actions/shipment';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link
        color="inherit"
        href="https://www.happiestminds.com/mindful-it-company/"
      >
        Happiest Minds
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// const drawerWidth = 240;

const theme = createMuiTheme({
  typography: {
    // In Chinese and Japanese the characters are usually larger,
    // so a smaller fontsize may be appropriate.
    fontSize: 12
  }
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  button: {
    margin: theme.spacing(1)
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },

  title: {
    flexGrow: 1
  },

  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto'
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  }
}));

const Tracker = ({ getShipment, shipment: { shipment, loading }, match }) => {
  const classes = useStyles();
  useEffect(() => {
    getShipment(match.params.id);
  }, [getShipment, match.params.id]);

  clsx(classes.paper, classes.fixedHeight);

  return loading || shipment === null ? (
    <Spinner />
  ) : (
    <div className={classes.root}>
      <CssBaseline />
      <Container maxWidth="lg" className={classes.container}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<KeyboardBackspaceIcon />}
          component={Link}
          to="/dashboard"
        >
          Back to Dashboard
        </Button>
        <Grid
          container
          spacing={3}
          sdirection="row"
          justify="space-evenly"
          alignItems="center"
        >
          <Grid item xs={12} md={6}>
            <Paper className={classes.paper}>
              <Details shipment={shipment} />
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper className={classes.paper}>
              <Typography
                component="h1"
                variant="h5"
                color="primary"
                noWrap
                className={classes.title}
              >
                <IconButton color="secondary">
                  <LocationOnIcon />
                </IconButton>
                Origin
              </Typography>
              <ThemeProvider theme={theme}>
                <Typography
                  component="h6"
                  variant="h6"
                  className={classes.title}
                >
                  {shipment.shipper.address + ', '}{' '}
                  {shipment.shipper.city + ' -'}
                  {shipment.shipper.postalCode + '- '}
                  {shipment.shipper.state} {shipment.shipper.country}
                </Typography>
              </ThemeProvider>
              <Typography>
                <Typography
                  color="inherit"
                  component="p"
                  style={{ display: 'inline-block' }}
                >
                  Date of Dispatch:
                </Typography>
                <Typography
                  color="textSecondary"
                  component="p"
                  style={{ display: 'inline-block' }}
                >
                  &nbsp;&nbsp;
                  <Moment format="YYYY/MM/DD">{shipment.departureDate}</Moment>
                </Typography>
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={3}
          sdirection="row"
          justify="space-evenly"
          alignItems="center"
        >
          <Grid item xs={12} md={6}>
            <Paper className={classes.paper}>
              <IoTDetails shipment={shipment} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper className={classes.paper}>
              <Typography
                component="h1"
                variant="h5"
                color="primary"
                noWrap
                className={classes.title}
              >
                <IconButton color="secondary">
                  <LocationOnIcon />
                </IconButton>
                Destination
              </Typography>
              <Typography component="h6" variant="h6" className={classes.title}>
                {shipment.receiver.address + ', '}{' '}
                {shipment.receiver.city + ' -'}
                {shipment.receiver.postalCode + '- '}
                {shipment.receiver.state} {shipment.receiver.country}
              </Typography>
              <Typography>
                <Typography
                  color="inherit"
                  component="p"
                  style={{ display: 'inline-block' }}
                >
                  Date of Arrival:
                </Typography>
                <Typography
                  color="textSecondary"
                  component="p"
                  style={{ display: 'inline-block' }}
                >
                  &nbsp;&nbsp;
                  <Moment format="YYYY/MM/DD">{shipment.deliveryDate}</Moment>
                </Typography>
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Grid
          container
          spacing={3}
          sdirection="row"
          justify="space-between"
          alignItems="flex-start"
        >
          <Grid container spacing={3} item xs={12} md={6}>
            <Grid item xs={12} md={12}>
              <Chart />
            </Grid>

            <Grid item xs={12} md={12}>
              <Chart1 />
            </Grid>
            <Grid item xs={12} md={12}>
              <Chart2 />
            </Grid>
          </Grid>

          <Grid container spacing={3} item xs={12} md={6}>
            <Grid item xs={12} md={12}>
              <Paper elevation={15}>
                <Map />
              </Paper>
            </Grid>
            <Grid item md={12}>
              <Paper className={classes.paper}>
                <Typography
                  component="h2"
                  variant="h4"
                  color="primary"
                  gutterBottom
                >
                  Legs of the Journey
                </Typography>
                <ConsTable />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Box pt={4}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
};

Tracker.propTypes = {
  getShipment: PropTypes.func.isRequired,
  shipment: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  shipment: state.shipment
});

export default connect(mapStateToProps, { getShipment })(Tracker);
