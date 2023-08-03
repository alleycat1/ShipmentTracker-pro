import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { Button, Typography } from '@material-ui/core';

import CssBaseline from '@material-ui/core/CssBaseline';

import Paper from '@material-ui/core/Paper';

import Stepper from '@material-ui/core/Stepper';

import Step from '@material-ui/core/Step';

import StepLabel from '@material-ui/core/StepLabel';

import Link from '@material-ui/core/Link';

import AddressSource from './AddressSource';

import ProdDet from './ProdDet';

import AddressDest from './AddressDest';

import IoT from './IoT';

import Legs from './Legs';

import { shipment } from '../../actions/shipment';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';

//import { setAlert } from '../../actions/alert';

//import { submitDisabled } from './AddressDest';
import { setAlert } from '../../actions/alert';

//console.log(submitDisabled);
var number;
const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 20
  },

  post: {
    marginBottom: 12
  },

  hide: {
    display: 'none'
  },

  layout: {
    width: 'auto',

    marginLeft: theme.spacing(2),

    marginRight: theme.spacing(2),

    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      marginLeft: 'auto',

      marginRight: 'auto'
    }
  },

  paper: {
    marginTop: theme.spacing(3),

    marginBottom: theme.spacing(3),

    padding: theme.spacing(2),

    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),

      marginBottom: theme.spacing(6),

      padding: theme.spacing(3)
    }
  },

  stepper: {
    padding: theme.spacing(3, 0, 5)
  },

  buttons: {
    display: 'flex',

    justifyContent: 'flex-end'
  },

  button: {
    marginTop: theme.spacing(3),

    marginLeft: theme.spacing(1)
  }
}));

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/"></Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const steps = [
  'Enter Source',

  'Product Details',

  'IoT Devices',

  'Enter Destination',

  'Legs of Trip'
];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressDest />;

    case 1:
      return <ProdDet />;

    case 2:
      return <IoT />;

    case 3:
      return <AddressSource />;

    case 4:
      return <Legs />;

    default:
      throw new Error('Unknown step');
  }
}

const CreateShip = ({ setAlert, shipment }) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('shipment sucess');

    const name = localStorage.getItem('prodName');
    const min = 100000;
    const max = 1000000;
    const rand = min + Math.random() * (max - min);
    number = Math.floor(rand);
    const quantity = localStorage.getItem('quantity');
    var string = localStorage.getItem('fragile');
    const fragile = string === 2 ? false : true;
    var num = localStorage.getItem('insurance_provider');
    var string1;
    if (num === 1) string1 = 'Company A';
    else if (num === 2) string1 = 'Company B';
    else string1 = 'Company C';
    const insuranceProvider = string1;
    var string2;
    if (num === 1) string2 = 'Company A';
    else if (num === 2) string2 = 'Company B';
    else string2 = 'Company C';
    const logisticProvider = string2;
    const departureDate = localStorage.getItem('pickup');
    const deliveryDate = localStorage.getItem('delivery');
    const shipper = {
      firstName: localStorage.getItem('shipper_firstName'),
      lastName: localStorage.getItem('shipper_lastName'),
      address:
        localStorage.getItem('shipper_add1') +
        ' ' +
        localStorage.getItem('shipper_add2'),
      city: localStorage.getItem('shipper_city'),
      state: localStorage.getItem('shipper_state'),
      postalCode: localStorage.getItem('shipper_zip'),
      country: localStorage.getItem('shipper_country')
    };
    const receiver = {
      firstName: localStorage.getItem('receiver_firstName'),
      lastName: localStorage.getItem('receiver_lastName'),
      address:
        localStorage.getItem('receiver_add1') +
        ' ' +
        localStorage.getItem('receiver_add2'),
      city: localStorage.getItem('receiver_city'),
      state: localStorage.getItem('receiver_state'),
      postalCode: localStorage.getItem('receiver_zip'),
      country: localStorage.getItem('receiver_country')
    };
    const edgeDevices = {
      temperature: {
        optValue: localStorage.getItem('temp_opt'),
        errorMargin: localStorage.getItem('temp_mar')
      },
      pressure: {
        optValue: localStorage.getItem('press_opt'),
        errorMargin: localStorage.getItem('press_mar')
      },
      vibration: {
        optValue: localStorage.getItem('vibra_opt'),
        errorMargin: localStorage.getItem('vibra_mar')
      }
    };

    shipment({
      name,
      //legs,
      number,
      quantity,
      fragile,
      insuranceProvider,
      logisticProvider,
      departureDate,
      deliveryDate,
      shipper,
      receiver,
      edgeDevices
    });
  };
  var choice = 0;

  const handleNext = (event) => {
    if (activeStep === 0) {
      const str = localStorage.getItem('shipper_firstName');
      const str1 = localStorage.getItem('shipper_add1');
      const str2 = localStorage.getItem('shipper_city');
      const str3 = localStorage.getItem('shipper_state');
      const str4 = localStorage.getItem('shipper_country');
      const str5 = localStorage.getItem('shipper_zip');

      if (str.length === 0) {
        setAlert('Fill in Shipper name', 'error');
      } else if (str1.length === 0) {
        setAlert('Fill in Shipper address', 'error');
      } else if (str2.length === 0) {
        setAlert('Fill in Shipper city', 'error');
      } else if (str3.length === 0) {
        setAlert('Fill in Shipper state', 'error');
      } else if (str4.length === 0) {
        setAlert('Fill in Shipper country', 'error');
      } else if (str5.length === 0) {
        setAlert('Fill in Shipper zip code', 'error');
      } else {
        setActiveStep(activeStep + 1);
      }
    } else if (activeStep === 1) {
      const str = localStorage.getItem('prodName');
      const str1 = localStorage.getItem('quantity');
      if (str.length === 0) {
        setAlert('Fill in Product name', 'error');
      } else if (str1.length === 0) {
        setAlert('Fill in Quantity', 'error');
      } else {
        setActiveStep(activeStep + 1);
      }
    } else if (activeStep === 2) {
      setActiveStep(activeStep + 1);
    } else if (activeStep === 3) {
      const str = localStorage.getItem('receiver_firstName');
      const str1 = localStorage.getItem('receiver_add1');
      const str2 = localStorage.getItem('receiver_city');
      const str3 = localStorage.getItem('receiver_state');
      const str4 = localStorage.getItem('receiver_country');
      const str5 = localStorage.getItem('receiver_zip');

      if (str.length === 0) {
        setAlert('Fill in Receiver name', 'error');
      } else if (str1.length === 0) {
        setAlert('Fill in Receiver address', 'error');
      } else if (str2.length === 0) {
        setAlert('Fill in Receiver city', 'error');
      } else if (str3.length === 0) {
        setAlert('Fill in Receiver state', 'error');
      } else if (str4.length === 0) {
        setAlert('Fill in Receiver country', 'error');
      } else if (str5.length === 0) {
        setAlert('Fill in Receiver zip code', 'error');
      } else if (choice === 0) {
        choice = choice + 1;
        setAlert(
          'Check all data you have entered you will not be able to modify it again',
          'info'
        );
      } else {
        setActiveStep(activeStep + 1);
      }
    } else if (activeStep === 4) {
      onSubmit(event);
      setActiveStep(activeStep + 1);
      localStorage.clear();
    } else {
    }
    //if (activeStep === 1) {
    //const str = localStorage.getItem('shipper_firstName');
    // console.log(str);
    //if (str.length === 0) {
    // setAlert('fill first name', 'error');
    // }
    //}
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  /*const handleChange = (e) => {
    setActiveState({ [e.target.name]: e.target.value });
  };*/

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <React.Fragment>
        <CssBaseline />

        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              CREATE SHIPMENT
            </Typography>

            <Stepper
              activeStep={activeStep}
              className={classes.stepper}
              //activeState={activeState}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    Thank you for your order.
                  </Typography>

                  <Typography variant="subtitle1">
                    Your order number is #{number}. We have emailed your order
                    confirmation, and will send you an update when your order
                    has shipped.
                  </Typography>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {getStepContent(activeStep)}
                  <div className={classes.buttons}>
                    {activeStep !== 0 && activeStep !== 4 && (
                      <Button onClick={handleBack} className={classes.button}>
                        Back
                      </Button>
                    )}

                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                      //disabled={submitDisabled}
                    >
                      {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                    </Button>
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>

          <Copyright />
        </main>
      </React.Fragment>
    </div>
  );
};
CreateShip.propTypes = {
  //setAlert: PropTypes.func.isRequired,

  shipment: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, shipment })(CreateShip);
