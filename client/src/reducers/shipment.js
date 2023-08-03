import {
  GET_SHIPMENTS,
  SHIPMENT_ERROR,
  DELETE_SHIPMENT,
  ADD_SHIPMENT,
  GET_SHIPMENT
} from '../actions/types';

const initialState = {
  shipments: [],
  shipment: null,
  loading: true,
  error: {}
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_SHIPMENTS:
      return {
        ...state,
        shipments: payload,
        loading: false
      };
    case GET_SHIPMENT:
      return {
        ...state,
        shipment: payload,
        loading: false
      };
    case ADD_SHIPMENT:
      return {
        ...state,
        shipments: [payload, ...state.shipments],
        loading: false
      };
    case DELETE_SHIPMENT:
      return {
        ...state,
        shipment: state.shipments.filter(
          (shipment) => shipment._id !== payload
        ),
        loading: false
      };
    case SHIPMENT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
