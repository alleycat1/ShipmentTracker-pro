import React, { useState } from 'react';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';

const roles = [
  {
    value: '0',
    label: 'None'
  },
  {
    value: '1',
    label: 'Consignment Shipper'
  },
  {
    value: '2',
    label: 'Logistic Provider'
  },
  {
    value: '3',
    label: 'Insurance Provider'
  },
  {
    value: '4',
    label: 'Vehicle Operator'
  }
];

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

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '50ch'
    }
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  margin: {
    margin: theme.spacing(1)
  },
  withoutLabel: {
    marginTop: theme.spacing(3)
  }
}));

const Register = ({ setAlert, register, isAuthenticated }) => {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    showPassword: false
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    category: '',
    username: '',
    email: '',
    password: '',
    password2: ''
  });

  const {
    firstName,
    lastName,
    category,
    username,
    email,
    password,
    password2
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'error');
    } else {
      register({ firstName, lastName, category, username, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <React.Fragment>
      <div>
        <div
          style={{
            height: '90vh',
            display: 'flex',
            width: '55%',
            margin: 'auto',
            marginTop: '1.5%',
            borderRadius: '20px',
            boxShadow: '5px 5px 20px 2px rgba(0,0,0,0.75)'
          }}
        >
          <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOpenOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign Up
              </Typography>
              <form className={classes.form} noValidate onSubmit={onSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="firstName"
                      name="firstName"
                      label="First name"
                      fullWidth
                      autoComplete="given-name"
                      value={firstName}
                      onChange={onChange}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="lastName"
                      name="lastName"
                      label="Last name"
                      fullWidth
                      autoComplete="family-name"
                      value={lastName}
                      onChange={onChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="username"
                      name="username"
                      label="Username"
                      fullWidth
                      autoComplete="username"
                      value={username}
                      onChange={onChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="email"
                      required
                      name="email"
                      label="Email Address"
                      fullWidth
                      autoComplete="email"
                      value={email}
                      onChange={onChange}
                    />
                  </Grid>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <FormControl
                        className={clsx(classes.margin, classes.textField)}
                        fullWidth
                        required
                      >
                        <InputLabel htmlFor="standard-adornment-password">
                          Password
                        </InputLabel>
                        <Input
                          id="password"
                          name="password"
                          type={values.showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={onChange}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                              >
                                {values.showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                          labelWidth={70}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl
                        className={clsx(classes.margin, classes.textField)}
                        fullWidth
                        required
                      >
                        <InputLabel htmlFor="standard-adornment-password">
                          Confirm Password
                        </InputLabel>
                        <Input
                          id="password2"
                          name="password2"
                          type={values.showPassword ? 'text' : 'password'}
                          onChange={onChange}
                          value={password2}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {values.showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                          labelWidth={70}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                  <form className={classes.root} noValidate autoComplete="off">
                    <div>
                      <TextField
                        id="category"
                        name="category"
                        select
                        label="Select"
                        value={category}
                        onChange={onChange}
                        helperText="Please select your category"
                      >
                        {roles.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                  </form>

                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    type="submit"
                    value="Register"
                    className={classes.submit}
                  >
                    Sign Up
                  </Button>
                  {/* //                   <Button */}
                  {/* //                     variant="contained"
//                     color="secondary"
//                     fullWidth
//                     style={{ marginTop: '10px' }}
//                   >
//                     Reset
//                   </Button> */}
                  <Grid container>
                    <Grid item xs></Grid>
                    <Grid item>
                      Already have account?
                      <Link to="/login" variant="body2">
                        {' Login'}
                      </Link>
                    </Grid>
                  </Grid>
                </Grid>
              </form>
            </div>
            <Box mt={3}>
              <Copyright />
            </Box>
          </Container>
        </div>
      </div>
    </React.Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
