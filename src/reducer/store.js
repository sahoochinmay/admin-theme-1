import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import storage from 'redux-persist/lib/storage'
import {persistReducer } from 'redux-persist'

import alertReducer from './alert.reducer';
import authReducer from './auth.reducer'
import ownerReducer from './owner.reducer'
import regionReducer from './region.reducer'
import parkingReducer from './parking.reducer'
import employeesReducer from './employees.reducer'
const reducers =persistReducer({storage: storage,key:'quin' }, combineReducers({
  alertReducer,
  authReducer,
  ownerReducer,
  regionReducer,
  parkingReducer,
  employeesReducer
}));

let middleware = [];
if (process.env.NODE_ENV === "development") {
  middleware = [...middleware, thunk, logger];
} else {
  middleware = [...middleware, thunk];
}

export const store = createStore(reducers, {}, applyMiddleware(...middleware));
