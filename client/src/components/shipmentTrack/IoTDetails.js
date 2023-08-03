import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

const IoTDetails = ({ shipment: { edgeDevices } }) => {
  return (
    <React.Fragment>
      <Table size="small">
        <TableHead>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            IoT Devices
          </Typography>
        </TableHead>
        <TableHead></TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <b>NAME</b>
            </TableCell>
            <TableCell>
              <b>
                THRESHOLD <br />
                (Lower Value)
              </b>
            </TableCell>
            <TableCell>
              <b>
                THREHOLD <br />
                (Upper Value)
              </b>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>TEMPERATURE </b>(°C)
            </TableCell>
            <TableCell>
              {edgeDevices.temperature.optValue -
                edgeDevices.temperature.errorMargin}
            </TableCell>
            <TableCell>
              {edgeDevices.temperature.optValue +
                edgeDevices.temperature.errorMargin}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>PRESSURE </b>(Pa)
            </TableCell>
            <TableCell>
              {edgeDevices.pressure.optValue - edgeDevices.pressure.errorMargin}
            </TableCell>
            <TableCell>
              {edgeDevices.pressure.optValue + edgeDevices.pressure.errorMargin}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>VIBRATION </b>(Hz)
            </TableCell>
            <TableCell>
              {edgeDevices.vibration.optValue -
                edgeDevices.vibration.errorMargin}
            </TableCell>
            <TableCell>
              {edgeDevices.vibration.optValue +
                edgeDevices.vibration.errorMargin}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </React.Fragment>
  );
};

IoTDetails.propTypes = {
  shipment: PropTypes.object.isRequired
};

export default IoTDetails;
