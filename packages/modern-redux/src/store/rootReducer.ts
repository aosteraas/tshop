import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from './auth.slice';
import { authReducerOld } from './auth.old';

const rootreducer = combineReducers({
  auth: authReducer,
  authReducerOld,
});

export default rootreducer;
