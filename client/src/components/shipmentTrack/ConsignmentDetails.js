import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

const ConsignmentDetails = ({
  shipment: { name, shipper, receiver, quantity, fragile }
}) => {
  return (
    <React.Fragment>
      <Table size="small">
        <TableHead>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Consignment Details
          </Typography>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <b>SHIPPER NAME</b>
            </TableCell>
            <TableCell>
              {shipper.firstName + ' '}
              {shipper.lastName}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>RECEIVER NAME</b>
            </TableCell>
            <TableCell>
              {receiver.firstName + ' '}
              {receiver.lastName}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>PRODUCT NAME</b>
            </TableCell>
            <TableCell>{name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>PRODUCT SPECIFICATION</b>
            </TableCell>
            <TableCell>{fragile ? 'FRAGILE' : 'NOT FRAGILE'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>QUANTITY</b>
            </TableCell>
            <TableCell>{quantity}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </React.Fragment>
  );
};

ConsignmentDetails.propTypes = {
  shipment: PropTypes.object.isRequired
};

export default ConsignmentDetails;
