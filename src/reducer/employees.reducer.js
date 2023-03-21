import {
  EMPLOYEE_END,
  EMPLOYEE_START,
  FETCH_EMPLOYEE,
  RELOAD_EMPLOYEE,
} from "../constant/employees.constant";

const initialState = {
  loading: false,
  employees: [],
  reload: false,
};

const employeesReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case EMPLOYEE_START:
      return {
        ...state,
        loading: true,
      };
    case EMPLOYEE_END:
      return {
        ...state,
        loading: false,
      };
    case FETCH_EMPLOYEE:
      return {
        ...state,
        loading: false,
        employees: payload,
      };
    case RELOAD_EMPLOYEE:
      return {
        ...state,
        loading: false,
        reload: !state.reload,
      };
    default:
      return state;
  }
};

export default employeesReducer;
