import { combineReducers } from 'redux'
import {LoginReducer} from './authentication';
import {GetMatches} from './data';
import {Modals} from './modals';

export default combineReducers({
  LoginReducer,
  GetMatches,
  Modals
})