import {
  PARKING_END,
  PARKING_START,
  FETCH_PARKING,
  RELOAD_PARKING,
} from "../constant/parking.constant";

const initialState = {
 loading: false,
  reload: false,
  parking: [],
};

const parkingReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case PARKING_START:
      return {
        ...state,
        loading: true,
      };
    case PARKING_END:
      return {
        ...state,
        loading: false,
      };
    case FETCH_PARKING:
      return {
        ...state,
        loading: false,
        parking: payload,
      };
    case RELOAD_PARKING:
      return {
        ...state,
        loading: false,
        reload: !state.reload,
      };
    default:
      return state;
  }
};

export default parkingReducer;