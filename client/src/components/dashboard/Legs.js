import React from 'react';
import MaterialTable from 'material-table';
import TextField from '@material-ui/core/TextField';

export default function Legs() {
  const [nameErrorS, setNameErrorS] = React.useState({
    error: false,
    label: '',
    helperText: '',
    validateInput: false
  });

  const [nameErrorD, setNameErrorD] = React.useState({
    error: false,
    label: '',
    helperText: '',
    validateInput: false
  });

  const [nameErrorV, setNameErrorV] = React.useState({
    error: false,
    label: '',
    helperText: '',
    validateInput: false
  });

  const [state, setState] = React.useState({
    columns: [
      {
        title: 'Source',
        field: 'name',
        lookup: {
          1: 'Mumbai',
          2: 'Delhi',
          3: 'Bangalore',
          4: 'Hyderabad',
          5: 'Chennai',
          6: 'Visakhapatnam',
          7: 'Ahmedabad',
          8: 'Kolkata',
          9: 'Jaipur',
          10: 'Lucknow',

          editComponent: (props) => (
            <TextField
              error={
                !props.value &&
                nameErrorS.validateInput &&
                props.rowData.submitted
                  ? nameErrorS.error
                  : false
              }
              helperText={
                !props.value &&
                nameErrorS.validateInput &&
                props.rowData.submitted
                  ? nameErrorS.helperText
                  : ''
              }
              value={props.value ? props.value : ''}
              onChange={(e) => {
                if (nameErrorS.validateInput) {
                  setNameErrorS({
                    ...nameErrorS,
                    validateInput: false
                  });
                }

                props.onChange(e.target.value);
              }}
            />
          )
        }
      },
      {
        title: 'Destination',
        field: 'dest',
        lookup: {
          1: 'Mumbai',
          2: 'Delhi',
          3: 'Bangalore',
          4: 'Hyderabad',
          5: 'Chennai',
          6: 'Visakhapatnam',
          7: 'Ahmedabad',
          8: 'Kolkata',
          9: 'Jaipur',
          10: 'Lucknow',

          editComponent: (props) => (
            <TextField
              error={
                !props.value &&
                nameErrorD.validateInput &&
                props.rowData.submitted
                  ? nameErrorD.error
                  : false
              }
              helperText={
                !props.value &&
                nameErrorD.validateInput &&
                props.rowData.submitted
                  ? nameErrorD.helperText
                  : ''
              }
              value={props.value ? props.value : ''}
              onChange={(e) => {
                if (nameErrorD.validateInput) {
                  setNameErrorD({
                    ...nameErrorD,
                    validateInput: false
                  });
                }

                props.onChange(e.target.value);
              }}
            />
          )
        }
      },
      {
        title: 'Vehicle Operator',
        field: 'vehop',
        lookup: {
          1: 'Harry',
          2: 'Ron',
          3: 'Kevin',

          editComponent: (props) => (
            <TextField
              error={
                !props.value &&
                nameErrorV.validateInput &&
                props.rowData.submitted
                  ? nameErrorV.error
                  : false
              }
              helperText={
                !props.value &&
                nameErrorV.validateInput &&
                props.rowData.submitted
                  ? nameErrorV.helperText
                  : ''
              }
              value={props.value ? props.value : ''}
              onChange={(e) => {
                if (nameErrorV.validateInput) {
                  setNameErrorV({
                    ...nameErrorV,
                    validateInput: false
                  });
                }

                props.onChange(e.target.value);
              }}
            />
          )
        }
      }
    ],
    data: []
  });

  return (
    <MaterialTable
      title="Add Legs"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              newData.submitted = true;
              if (!newData.name) {
                setNameErrorS({
                  error: true,
                  label: 'required',
                  helperText: 'Name is required.',
                  validateInput: true
                });
                reject();
                return;
              }
              if (!newData.dest) {
                setNameErrorD({
                  error: true,
                  label: 'required',
                  helperText: 'Name is required.',
                  validateInput: true
                });
                reject();
                return;
              }
              if (!newData.vehop) {
                setNameErrorV({
                  error: true,
                  label: 'required',
                  helperText: 'Name is required.',
                  validateInput: true
                });
                reject();
                return;
              }
              resolve();

              const data = [...state.data];
              data.push(newData);
              setState({ ...state, data });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              newData.submitted = true;
              if (!newData.name) {
                setNameErrorS({
                  error: true,
                  label: 'required',
                  helperText: 'Name is required.',
                  validateInput: true
                });
                reject();
                return;
              }
              if (!newData.dest) {
                setNameErrorD({
                  error: true,
                  label: 'required',
                  helperText: 'Name is required.',
                  validateInput: true
                });
                reject();
                return;
              }
              if (!newData.vehop) {
                setNameErrorV({
                  error: true,
                  label: 'required',
                  helperText: 'Name is required.',
                  validateInput: true
                });
                reject();
                return;
              }
              resolve();
              const data = [...state.data];
              data[data.indexOf(oldData)] = newData;
              setState({ ...state, data });
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data.splice(data.indexOf(oldData), 1);
              setState({ ...state, data });
            }, 600);
          })
      }}
    />
  );
}
