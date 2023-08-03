import React, { useState, useEffect, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  FilteringState,
  IntegratedFiltering,
  DataTypeProvider
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableFilterRow,
  TableColumnResizing,
  PagingPanel
} from '@devexpress/dx-react-grid-material-ui';
import Paper from '@material-ui/core/Paper';
import DateRange from '@material-ui/icons/DateRange';
import { SortingState, IntegratedSorting } from '@devexpress/dx-react-grid';
import { PagingState, IntegratedPaging } from '@devexpress/dx-react-grid';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getShipments, deleteShipment } from '../../actions/shipment';
import Spinner from '../layout/Spinner';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const FilterIcon = ({ type, ...restProps }) => {
  if (type === 'month') return <DateRange {...restProps} />;
  return <TableFilterRow.Icon type={type} {...restProps} />;
};

const getRowId = (row) => row.id;

const useStyles = makeStyles((theme) => ({
  exampleWrapper: {
    margin: 0,
    top: 'auto',
    right: 40,
    bottom: 40,
    left: 'auto',
    position: 'fixed'
  }
}));

const Dashboard = ({
  getShipments,
  deleteShipment,
  shipment: { shipments, loading }
}) => {
  useEffect(() => {
    getShipments();
  }, [getShipments]);
  const [columns] = useState([
    {
      name: 'trackerButton',
      title: 'Open Tracker'
    },
    {
      name: 'consignmentNumber',
      title: 'Number'
    },
    { name: 'consignmentName', title: 'Name' },
    { name: 'origin', title: 'Origin' },
    { name: 'destination', title: 'Destination' },
    { name: 'createdBy', title: 'Created By' },
    { name: 'dateCreated', title: 'Date Created' }
  ]);

  const classes = useStyles();

  const [dateColumns] = useState(['dateCreated']);
  const [dateFilterOperations] = useState([
    'month',
    'contains',
    'startsWith',
    'endsWith'
  ]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [pageSizes] = useState([5, 10, 15]);
  const [filteringColumnExtensions] = useState([
    {
      columnName: 'dateCreated',
      predicate: (value, filter, row) => {
        if (!filter.value.length) return true;
        if (filter && filter.operation === 'month') {
          const month = parseInt(value.split('-')[1], 10);
          return month === parseInt(filter.value, 10);
        }
        return IntegratedFiltering.defaultPredicate(value, filter, row);
      }
    }
  ]);
  const [defaultColumnWidths] = useState([
    { columnName: 'trackerButton', width: 240 },
    { columnName: 'consignmentNumber', width: 100 },
    { columnName: 'consignmentName', width: 180 },
    { columnName: 'origin', width: 130 },
    { columnName: 'destination', width: 130 },
    { columnName: 'createdBy', width: 130 },
    { columnName: 'dateCreated', width: 180 }
  ]);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Paper>
            <Grid
              rows={shipments.map((shipment) => ({
                trackerButton: (
                  <Fragment>
                    <Button
                      variant="contained"
                      component={Link}
                      to={`/track/${shipment._id}`}
                      title="Open row"
                      color="primary"
                      startIcon={<TrackChangesIcon />}
                    >
                      {shipment.number}
                    </Button>
                  </Fragment>
                ),
                consignmentNumber: shipment.number,
                consignmentName: shipment.name,
                origin: shipment.shipper.city,
                destination: shipment.receiver.city,
                createdBy: shipment.shipper.firstName,
                dateCreated: shipment.date
              }))}
              columns={columns}
              getRowId={getRowId}
            >
              <DataTypeProvider
                for={dateColumns}
                availableFilterOperations={dateFilterOperations}
              />
              <SortingState
                defaultSorting={[
                  { columnName: 'dateCreated', direction: 'asc' }
                ]}
              />
              <IntegratedSorting />
              <FilteringState
                defaultFilters={[]}
                columnExtensions={[
                  { columnName: 'trackerButton', filteringEnabled: false }
                ]}
              />
              <IntegratedFiltering
                columnExtensions={filteringColumnExtensions}
              />
              <PagingState
                currentPage={currentPage}
                onCurrentPageChange={setCurrentPage}
                pageSize={pageSize}
                onPageSizeChange={setPageSize}
              />

              <IntegratedPaging />
              <Table />
              <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
              <TableHeaderRow />

              <PagingPanel pageSizes={pageSizes} />

              <Table />
              <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />

              <TableHeaderRow showSortingControls />
              <TableFilterRow
                showFilterSelector
                iconComponent={FilterIcon}
                messages={{ month: 'Month equals' }}
                style={{
                  marginRight: '2%'
                }}
              />
            </Grid>
          </Paper>

          <div className={classes.exampleWrapper}>
            <Fab
              color="secondary"
              aria-label="add"
              component={Link}
              to="/createship"
            >
              <AddIcon />
            </Fab>
          </div>
        </Fragment>
      )}
    </div>
  );
};

Dashboard.propTypes = {
  getShipments: PropTypes.func.isRequired,
  shipment: PropTypes.object.isRequired,
  deleteShipment: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  shipment: state.shipment
});

export default connect(mapStateToProps, { getShipments, deleteShipment })(
  Dashboard
);
