import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
const useStateWithLocalStorage = (localStorageKey) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(localStorageKey) || ''
  );
  React.useEffect(() => {
    localStorage.setItem(localStorageKey, value);
  }, [value]);

  return [value, setValue];
};

export default function AddressFormSource() {
  const [rfirstName, setValue] = useStateWithLocalStorage('receiver_firstName');
  const [rlastName, setValue1] = useStateWithLocalStorage('receiver_lastName');
  const [raddress1, setValue2] = useStateWithLocalStorage('receiver_add1');
  const [raddress2, setValue3] = useStateWithLocalStorage('receiver_add2');
  const [rcity, setValue4] = useStateWithLocalStorage('receiver_city');
  const [rstate, setValue5] = useStateWithLocalStorage('receiver_state');
  const [rzip, setValue6] = useStateWithLocalStorage('receiver_zip');
  const [rcountry, setValue7] = useStateWithLocalStorage('receiver_country');
  const onChange = (event) => setValue(event.target.value);
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
        Consignment Receiver Address
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
            value={rfirstName}
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
            value={rlastName}
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
            value={raddress1}
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
            value={raddress2}
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
            value={rcity}
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
            value={rstate}
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
            value={rzip}
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
            value={rcountry}
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
