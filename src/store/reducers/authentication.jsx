import authChecker from "../../_helpers/auth-checker";
import * as actionTypes from "../actions/actionTypes";

var defaultAuthState = {
  username: "Visitor",
  role: "visitor",
  email: null,
  authentication: false,
  msg: ""
};
var baseState = defaultAuthState;
const userToken = authChecker();
if (userToken) {
  baseState = {
    username: userToken.username,
    role: userToken.role,
    email: userToken.email,
    authentication: true,
    msg: null
  };
}

export const Registration = (state = baseState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case "REGISTER_SUCCESS":
      return newState;
    case "REGISTER_ERROR":
      newState.msg = action.value.message;
      return newState;
    default:
      return newState;
  }
};

export const LoginReducer = (state = baseState, action) => {
  let newstate = { ...state };
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      console.log("LoginReducer (SUCCESS): "+ JSON.stringify(action));
      newstate.username = action.value.username;
      newstate.role = action.value.role;
      newstate.email = action.value.email;
      newstate.msg = action.value.msg;
      newstate.sub = action.value.sub;
      return newstate;
    case actionTypes.LOGIN_ERROR:
      newstate.username = action.value.username;
      newstate.role = action.value.role;
      newstate.email = action.value.email;
      newstate.msg = action.value.msg;
      newstate.sub = action.value.sub;
      console.log(action.type, JSON.stringify(action)+", "+JSON.stringify(newstate));
      return newstate;
    default:
      return state;
  }
};