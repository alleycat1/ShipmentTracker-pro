import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset'
    }
  }
});

function createData(source, dest, vehop, status) {
  return {
    source,
    dest,
    vehop,
    status,
    history: [
      { date: '19/06/2020', TimeId: '15:20:30', Activity: 'Dispatched' },
      { date: '20/06/2020', TimeId: '20:12:45', Activity: 'Received' }
    ]
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow classsource={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.source}
        </TableCell>
        <TableCell align="center">{row.dest}</TableCell>
        <TableCell align="center">{row.vehop}</TableCell>
        <TableCell align="center">{row.status}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell align="center">Time</TableCell>
                    <TableCell align="center">Activity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell align="center">{historyRow.TimeId}</TableCell>
                      <TableCell align="center">
                        {historyRow.Activity}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    dest: PropTypes.number.isRequired,
    vehop: PropTypes.number.isRequired,
    status: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        Activity: PropTypes.number.isRequired,
        TimeId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired
      })
    ).isRequired,
    source: PropTypes.string.isRequired
  }).isRequired
};

const rows = [
  createData('Bangalore', 'Chennai', 'Kevin', 'Completed'),
  createData('Chennai', 'Hyderabad', 'Harry', 'Ongoing'),
  createData('Hyderabad', 'Mumbai', 'David', 'To Begin')
  //   createData("Patna", "Kolkata", "Joshua"),
];

export default function CollapsibleTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Source</TableCell>
            <TableCell align="center">Destination</TableCell>
            <TableCell align="center">Vehicle Operator</TableCell>
            <TableCell align="center">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.source} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
