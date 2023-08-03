import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
const useStateWithLocalStorage = (localStorageKey) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(localStorageKey) || ''
  );
  React.useEffect(() => {
    localStorage.setItem(localStorageKey, value);
  }, [value]);

  return [value, setValue];
};

export default function AddressFormDest() {
  const [firstName, setValue] = useStateWithLocalStorage('shipper_firstName');
  const [lastName, setValue1] = useStateWithLocalStorage('shipper_lastName');
  const [address1, setValue2] = useStateWithLocalStorage('shipper_add1');
  const [address2, setValue3] = useStateWithLocalStorage('shipper_add2');
  const [city, setValue4] = useStateWithLocalStorage('shipper_city');
  const [state, setValue5] = useStateWithLocalStorage('shipper_state');
  const [zip, setValue6] = useStateWithLocalStorage('shipper_zip');
  const [country, setValue7] = useStateWithLocalStorage('shipper_country');

  const onChange = (event) => {
    setValue(event.target.value);
  };
  const onChange1 = (event) => setValue1(event.target.value);
  const onChange2 = (event) => setValue2(event.target.value);
  const onChange3 = (event) => setValue3(event.target.value);
  const onChange4 = (event) => setValue4(event.target.value);
  const onChange5 = (event) => setValue5(event.target.value);
  const onChange6 = (event) => setValue6(event.target.value);
  const onChange7 = (event) => setValue7(event.target.value);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Consignment Shipper Address
      </Typography>
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
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            value={lastName}
            onChange={onChange1}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            value={address1}
            onChange={onChange2}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
            value={address2}
            onChange={onChange3}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            value={city}
            onChange={onChange4}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            value={state}
            onChange={onChange5}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            type="number"
            value={zip}
            onChange={onChange6}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            value={country}
            onChange={onChange7}
          />
        </Grid>
        {/* <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid> */}
      </Grid>
    </React.Fragment>
  );
}
