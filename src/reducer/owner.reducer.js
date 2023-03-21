import {
  OWNER_START,
  OWNER_END,
  FETCH_OWNER,
  RELOAD_OWNER,
} from "../constant/owner.constant";

const initialState = {
  loading: false,
  owner: [],
  reload: false,
};
const ownerReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case OWNER_START:
      return {
        ...state,
        loading: true,
      };
    case OWNER_END:
      return {
        ...state,
        loading: false,
      };
    case FETCH_OWNER:
      return {
        ...state,
        owner: payload,
        loading: false,
      };
    case RELOAD_OWNER:
      return {
        ...state,
        loading: false,
        reload: !state.reload,
      };
    default:
      return state;
  }
};

export default ownerReducer;
