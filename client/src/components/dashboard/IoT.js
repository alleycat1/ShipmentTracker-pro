import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from '@material-ui/core/Checkbox';

import InputAdornment from '@material-ui/core/InputAdornment';
// import MaterialTable from "material-table";
// const targetArray=["Cafe","Restraunts"];
const useStateWithLocalStorage = (localStorageKey) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(localStorageKey) || ''
  );
  React.useEffect(() => {
    localStorage.setItem(localStorageKey, value);
  }, [value]);

  return [value, setValue];
};
export default function IoT() {
  //const classes = useStyles();
  // const [iot, setIoT] = React.useState("");
  const [temp, setValue] = useStateWithLocalStorage('temp_val');
  const [tempopt, setValue1] = useStateWithLocalStorage('temp_opt');
  const [tempmar, setValue2] = useStateWithLocalStorage('temp_mar');
  const [press, setValue3] = useStateWithLocalStorage('press_val');
  const [pressopt, setValue4] = useStateWithLocalStorage('press_opt');
  const [pressmar, setValue5] = useStateWithLocalStorage('press_mar');
  const [vibra, setValue6] = useStateWithLocalStorage('vibra_val');
  const [vibraopt, setValue7] = useStateWithLocalStorage('vibra_opt');
  const [vibramar, setValue8] = useStateWithLocalStorage('vibra_mar');
  const onChange = (event) => setValue(event.target.checked);
  const onChange1 = (event) => setValue1(event.target.value);
  const onChange2 = (event) => setValue2(event.target.value);
  const onChange3 = (event) => setValue3(event.target.checked);
  const onChange4 = (event) => setValue4(event.target.value);
  const onChange5 = (event) => setValue5(event.target.value);
  const onChange6 = (event) => setValue6(event.target.checked);
  const onChange7 = (event) => setValue7(event.target.value);
  const onChange8 = (event) => setValue8(event.target.value);

  const [checked, setChecked] = React.useState(false);
  const handleChange1 = (event) => {
    setChecked(event.target.checked);
    onChange(event);
  };

  const [pres, setPres] = React.useState(false);
  const handlePres = (event) => {
    setPres(event.target.checked);
    onChange3(event);
  };

  const [vibr, setVibr] = React.useState(false);
  const handleVibr = (event) => {
    setVibr(event.target.checked);
    onChange6(event);
  };

  const [gps] = React.useState(true);

  // const [state, setState] = React.useState({
  //   columns: [{ title: "Name", field: "name" }],
  //   data: [{ name: "Mehmet" }, { name: "Zerya Betül" }],
  // });

  // const useStyles = makeStyles((theme) => ({
  //   formControl: {
  //     margin: theme.spacing(1),
  //     minWidth: 120,
  //   },
  //   selectEmpty: {
  //     marginTop: theme.spacing(2),
  //   },
  // }));

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Configure IoT Devices
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Checkbox
            checked={(checked, temp)}
            //value={temp}
            onChange={handleChange1}
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
          <typography variant="h6">Temperature</typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            id="opValue"
            label="Optimum Value"
            fullWidth
            disabled={!checked}
            InputProps={{
              endAdornment: <InputAdornment position="end"> °C</InputAdornment>
            }}
            type="number"
            value={tempopt}
            onChange={onChange1}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            id="mError"
            label="Margin of Error"
            fullWidth
            disabled={!checked}
            InputProps={{
              endAdornment: <InputAdornment position="end"> °C</InputAdornment>
            }}
            type="number"
            value={tempmar}
            onChange={onChange2}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Checkbox
            checked={(pres, press)}
            onChange={handlePres}
            //value={press}
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
          <typography variant="h6">Pressure</typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            id="opValue"
            label="Optimum Value"
            fullWidth
            disabled={!pres}
            InputProps={{
              endAdornment: <InputAdornment position="end"> Pa</InputAdornment>
            }}
            type="number"
            value={pressopt}
            onChange={onChange4}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            id="mError"
            label="Margin of Error"
            fullWidth
            disabled={!pres}
            InputProps={{
              endAdornment: <InputAdornment position="end"> Pa</InputAdornment>
            }}
            type="number"
            value={pressmar}
            onChange={onChange5}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Checkbox
            checked={(vibr, vibra)}
            onChange={handleVibr}
            //value={vibra}
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
          <typography variant="h6">Vibration</typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            id="opValue"
            label="Optimum Value"
            fullWidth
            disabled={!vibr}
            InputProps={{
              endAdornment: <InputAdornment position="end"> Hz</InputAdornment>
            }}
            type="number"
            value={vibraopt}
            onChange={onChange7}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            id="mError"
            label="Margin of Error"
            fullWidth
            disabled={!vibr}
            InputProps={{
              endAdornment: <InputAdornment position="end"> Hz</InputAdornment>
            }}
            type="number"
            value={vibramar}
            onChange={onChange8}
          />
        </Grid>

        <Grid item xs={12} md={12}>
          <Checkbox
            checked={gps}
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
          <typography variant="h6">G.P.S.</typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
