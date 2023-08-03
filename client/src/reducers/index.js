import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import shipment from './shipment';
import iot from './iot';

export default combineReducers({
  alert,
  auth,
  shipment,
  iot
});
