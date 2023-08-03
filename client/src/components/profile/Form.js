import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const Form = ({ auth: { firstName, lastName, username, category, email } }) => {
  var str;
  if (category === 0) {
    str = 'None';
  } else if (category === 1) {
    str = 'Consignment Shipper';
  } else if (category === 2) {
    str = 'Logistic Provider';
  } else if (category === 3) {
    str = 'Insurance Provider';
  } else if (category === 4) {
    str = 'Vehicle Operator';
  } else {
  }

  return (
    <React.Fragment>
      <br />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            disabled="true"
            defaultValue={firstName}
          >
            {firstName}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            disabled="true"
            defaultValue={lastName}
          >
            {lastName}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="username"
            name="username"
            label="Username"
            fullWidth
            autoComplete="username"
            defaultValue={username}
            disabled="true"
          >
            {username}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="email"
            required
            name="email"
            label="Email Address"
            fullWidth
            autoComplete="email"
            defaultValue={email}
            disabled="true"
          >
            {email}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="category"
            required
            name="category"
            label="Category"
            fullWidth
            autoComplete="category"
            defaultValue={str}
            disabled="true"
          >
            {category}
          </TextField>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Form;
