import api from '../utils/api';
import { SHIPMENT_IOT, SHIPMENT_SENSOR, IOT_ERROR } from './types';

//Get shipment iot data
export const getShipmentIOT = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/shipment/iotdata/${id}`);

    dispatch({
      type: SHIPMENT_IOT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: IOT_ERROR,
      payload: {
        msg: err.response ? err.response.statusText : 'error',
        status: err.response ? err.response.status : '500'
      }
    });
  }
};

//Get shipment sensor data
export const getShipmentSensor = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/shipment/sensordata/${id}`);
    console.log(res.data);
    dispatch({
      type: SHIPMENT_SENSOR,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: IOT_ERROR,
      payload: {
        msg: err.response ? err.response.statusText : 'error',
        status: err.response ? err.response.status : '500'
      }
    });
  }
};
