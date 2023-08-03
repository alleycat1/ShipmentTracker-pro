import { SHIPMENT_IOT, SHIPMENT_SENSOR, IOT_ERROR } from '../actions/types';

const initialState = {
  iotdata: [],
  loading: true,
  error: {}
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  console.log(type);
  switch (type) {
    case SHIPMENT_IOT:
      return {
        ...state,
        iotdata: payload,
        loading: false
      };
    case SHIPMENT_SENSOR:
      return {
        ...state,
        iotdata: payload,
        loading: false
      };
    case IOT_ERROR:
      return {
        ...state,
        iotdata: payload,
        loading: false
      };
    default:
      return state;
  }
}
