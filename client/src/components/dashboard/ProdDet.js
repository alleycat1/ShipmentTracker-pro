import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
// import Button from "@material-ui/core/Button";
// import Menu from "@material-ui/core/Menu";
import MenuItem from '@material-ui/core/MenuItem';
// import Dropdown from "react-bootstrap";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
// import { makeStyles } from "@material-ui/core/styles";
import 'date-fns';
// import moment from "moment";

// import DateFnsUtils from '@date-io/date-fns';
// import {
//   MuiPickersUtilsProvider,
//   KeyboardTimePicker,
//   KeyboardDatePicker,
// } from '@material-ui/pickers';
// import { MuiPickersUtilsProvider } from 'material-ui-pickers';
// import { TimePicker } from 'material-ui-pickers/TimePicker';
// import { DatePicker } from 'material-ui-pickers/DatePicker';

// import MuiPickersUtilsProvider from '@material-ui-pickers/MuiPickersUtilsProvider';
// import KeyboardTimePicker from '@material-ui-pickers/KeyboardTimePicker';
// import KeyboardDatePicker from '@material-ui-pickers/KeyboardDatePicker';
// const targetArray=["Cafe","Restraunts"];
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  // KeyboardTimePicker,
  KeyboardDatePicker
} from '@material-ui/pickers';
const useStateWithLocalStorage = (localStorageKey) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(localStorageKey) || ''
  );
  React.useEffect(() => {
    localStorage.setItem(localStorageKey, value);
  }, [value]);

  return [value, setValue];
};
export default function ProdDet() {
  //const classes = useStyles();
  const [prodName, setValue] = useStateWithLocalStorage('prodName');
  const [quantity, setValue1] = useStateWithLocalStorage('quantity');
  const [ageuse, setValue2] = useStateWithLocalStorage('fragile');
  const [ageuse1, setValue3] = useStateWithLocalStorage('insurance_provider');
  const [ageuse2, setValue4] = useStateWithLocalStorage('logistic_provider');
  const [selectedDatePickuse, setValue5] = useStateWithLocalStorage('pickup');
  const [selectedDateDropuse, setValue6] = useStateWithLocalStorage('delivery');

  const [age, setAge] = React.useState('');
  const [age1, setAge1] = React.useState('');
  const [age2, setAge2] = React.useState('');
  const [selectedDatePick, setSelectedDatePick] = React.useState(new Date());
  const [selectedDateDrop, setSelectedDateDrop] = React.useState(new Date());

  const onChange = (event) => setValue(event.target.value);
  const onChange1 = (event) => setValue1(event.target.value);
  const onChange2 = (event) => setValue2(event.target.value);
  const onChange3 = (event) => setValue3(event.target.value);
  const onChange4 = (event) => setValue4(event.target.value);
  const onChange5 = (date) => setValue5(date);
  const onChange6 = (date) => setValue6(date);

  const handleChange = (event) => {
    setAge(event.target.value);
    onChange2(event);
  };
  const handleChange1 = (event) => {
    setAge1(event.target.value);
    onChange3(event);
  };
  const handleChange2 = (event) => {
    setAge2(event.target.value);
    onChange4(event);
  };

  const handleDateChangePick = (date) => {
    setSelectedDatePick(date);
    onChange5(date);
  };

  const handleDateChangeDrop = (date) => {
    setSelectedDateDrop(date);
    onChange6(date);
  };

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
        Select Services
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            label="Product Name"
            fullWidth
            autoComplete="cc-exp"
            value={prodName}
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            required
            id="expDate"
            label="Quantity"
            fullWidth
            autoComplete="cc-exp"
            value={quantity}
            onChange={onChange1}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl>
            <InputLabel id="demo-simple-select-label">Fragile</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={(age, ageuse)}
              onChange={handleChange}
              style={{ width: '80px' }}
            >
              <MenuItem value={1}>Yes</MenuItem>
              <MenuItem value={2}>No</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl>
            <InputLabel
              id="demo-simple-select-label"
              style={{ width: '800px' }}
            >
              Insurance Provider
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={(age1, ageuse1)}
              onChange={handleChange1}
              style={{ width: '180px' }}
            >
              <MenuItem value={11}>Company A</MenuItem>
              <MenuItem value={12}>Company B</MenuItem>
              <MenuItem value={13}>Company C</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          {/* <TextField
            required
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
          /> */}
          <FormControl>
            <InputLabel
              id="demo-simple-select-label"
              style={{ width: '800px' }}
            >
              Logistic Operator
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={(age2, ageuse2)}
              onChange={handleChange2}
              style={{ width: '180px' }}
            >
              <MenuItem value={21}>Company A</MenuItem>
              <MenuItem value={22}>Company B</MenuItem>
              <MenuItem value={23}>Company C</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* <Grid item xs={12} md={4}>
          
          <FormControl>
            <InputLabel
              id="demo-simple-select-label"
              style={{ width: "800px" }}
            >
              Vehicle Operator
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age3}
              onChange={handleChange3}
              style={{ width: "180px" }}
            >
              <MenuItem value={31}>Company A</MenuItem>
              <MenuItem value={32}>Company B</MenuItem>
              <MenuItem value={33}>Company C</MenuItem>
            </Select>
          </FormControl>
        </Grid> */}

        {/* <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            label="Date of Departure(MM/DD/YYYY)"
            fullWidth
            autoComplete="cc-exp"
          />
        </Grid> */}

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around" item xs={12} md={6}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="dd/mm/yyyy"
              autoComplete="cc-exp"
              margin="normal"
              id="date-picker-inline"
              label="Date of Pickup"
              value={(selectedDatePick, selectedDatePickuse)}
              onChange={handleDateChangePick}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
            />
          </Grid>

          <Grid container justify="space-around" item xs={12} md={6}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="dd/mm/yyyy"
              autoComplete="cc-exp"
              margin="normal"
              id="date-picker-inline"
              label="Promised Date of Delivery"
              value={(selectedDateDrop, selectedDateDropuse)}
              onChange={handleDateChangeDrop}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
      </Grid>
    </React.Fragment>
  );
}
