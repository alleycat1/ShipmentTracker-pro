import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getShipmentSensor } from '../../actions/iot';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  LineSeries,
  Title
} from '@devexpress/dx-react-chart-material-ui';

import { scaleTime } from 'd3-scale';
import { ArgumentScale } from '@devexpress/dx-react-chart';
import Grid from '@material-ui/core/Grid';

import PostData from './chdata.json';

const data = [];
PostData.map((postDetail, index) => {
  return data.push({
    lb: postDetail.lb,
    ub: postDetail.ub,
    x: new Date(postDetail.x),
    y: postDetail.y
  });
});

const chartRootStyle = { marginRight: '20px' };

const ChartRoot = (props) => <Chart.Root {...props} style={chartRootStyle} />;

const TempChart = ({ getShipmentSensor, iot: { iotdata, loading } }) => {
  useEffect(() => {
    getShipmentSensor();
  }, [getShipmentSensor]);
  return (
    <Grid container direction="column">
      <Grid item xs={12}>
        <Paper elevation={15}>
          <Chart
            data={PostData.map((postDetail) => ({
              lb: postDetail.lb,
              ub: postDetail.ub,
              x: new Date(postDetail.x),
              y: postDetail.y
            }))}
            rootComponent={ChartRoot}
          >
            <ArgumentScale factory={scaleTime} />
            <ArgumentAxis />
            <ValueAxis />
            <LineSeries
              valueField="y"
              argumentField="x"
              name="x:Time, y:Vibration(Hz)"
              color="#0595fc"
              Legend
            />

            <LineSeries
              valueField="ub"
              argumentField="x"
              name="Upper Bound"
              color="#fc5805"
            />
            <LineSeries
              valueField="lb"
              argumentField="x"
              name="Lower Bound"
              color="#05fc6c"
            />

            <Title text="Vibration" />
          </Chart>
        </Paper>
      </Grid>
    </Grid>
  );
};

Chart.propTypes = {
  getShipmentSensor: PropTypes.func.isRequired,
  iot: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  iot: state.iot
});

export default connect(mapStateToProps, { getShipmentSensor })(TempChart);
