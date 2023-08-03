import api from '../utils/api';
import {
  GET_SHIPMENTS,
  SHIPMENT_ERROR,
  // DELETE_SHIPMENT,
  ADD_SHIPMENT,
  GET_SHIPMENT,
  DELETE_SHIPMENT
} from './types';
import { setAlert } from './alert';

//Get Shipments
export const getShipments = () => async (dispatch) => {
  try {
    const res = await api.get('/shipment');

    dispatch({
      type: GET_SHIPMENTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: SHIPMENT_ERROR,
      payload: {
        msg: err.response && err.response.statusText,
        status: err.response && err.response.status
      }
    });
  }
};

// Add Shipment
export const shipment = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/shipment', formData);

    dispatch({
      type: ADD_SHIPMENT,

      payload: res.data
    });

    dispatch(setAlert('Added Shipment Successfully', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    }
  }
};

// Get shipment
export const getShipment = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/shipment/${id}`);

    dispatch({
      type: GET_SHIPMENT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: SHIPMENT_ERROR,
      payload: {
        msg: err.response ? err.response.statusText : 'error',
        status: err.response ? err.response.status : '500'
      }
    });
  }
};

// Delete shipment
export const deleteShipment = (id, history) => async (dispatch) => {
  try {
    await api.delete(`/shipment/${id}`);

    dispatch({
      type: DELETE_SHIPMENT,
      payload: id
    });
    dispatch(setAlert('Shipment deleted successfully', 'success'));
  } catch (err) {
    dispatch({
      type: SHIPMENT_ERROR,
      payload: {
        msg: err.response ? err.response.statusText : 'error',
        status: err.response ? err.response.status : '500'
      }
    });
  }
};
