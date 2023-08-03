import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Alerts = ({ alerts }) => {
  return (
    alerts !== null &&
    alerts.length > 0 && (
      <Snackbar open={true}>
        <Alert key={alerts[0].id} severity={alerts[0].alertType}>
          {alerts[0].msg}
        </Alert>
      </Snackbar>
    )
  );
};
Alerts.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alerts);
