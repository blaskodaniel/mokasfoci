import React, { createContext, useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import useThunkReducer from 'react-hook-thunk-reducer';
import { AuthLoader } from "../components/Fullscreenloader/AuthLoader";
import Login from "../layouts/Login/Login";
import {AppConfig} from "../application.config";
import authChecker from "../_helpers/auth-checker"
import { LoginReducer, RegistrationReducer } from "../store/reducers/authentication";
import Registration from "../components/Registration/Registration";

export const AuthenticationContext = createContext();

export const noAuthUser = { username: "Visitor", role: "visitor", email: null, sub: null, msg: "" };

const AuthenticationProvider = props => {
  const [loginState, setLoginState] = useState(LoginState.Unauthenticated, () => {
    const localstr = authChecker();
    console.log("Local storage: "+ JSON.stringify(localstr));
    return localstr ? localstr : noAuthUser
  });
  const [register, registerDispatch] = useThunkReducer(RegistrationReducer, noAuthUser)
  const [user, userDispatch] = useThunkReducer(LoginReducer, noAuthUser, () => {
    const localstr = authChecker();
    console.log("Local storage: "+ JSON.stringify(localstr));
    return localstr ? localstr : noAuthUser
  });

  const logout = () => {
    localStorage.removeItem(AppConfig.JWTtokenname);
    //setLoginState(LoginState.Unauthenticated);
    window.location.href = "/";
  };

  useEffect(() => {
    console.log("User: ",user);
    console.log("loginState: ",loginState);
    if(user.sub !== null && user.email !== null){
      setLoginState(LoginState.Authenticated);
    }else{
      setLoginState(LoginState.Unauthenticated);
    }
    
  }, [user,loginState,register])

  return (
    <>
      <AuthenticationContext.Provider value={{ loginstatus: loginState, user, userDispatch, logout }}>
        {loginState === LoginState.Pending ? <AuthLoader /> : null}
        {loginState === LoginState.Authenticated ? props.children : null}
        {loginState === LoginState.Unauthenticated || loginState === LoginState.Unknown ? (
          <Switch>
            <Route exact path="/" render={() => ( <Login onLogin={userDispatch} setlogin={setLoginState} msg={user.msg} />)} />
            <Route path="/login" render={() => ( <Login onLogin={userDispatch} setlogin={setLoginState} msg={user.msg} />)} />
            <Route path="/registration" render={() => ( <Registration onRegister={registerDispatch} setlogin={setLoginState} msg={register.msg} />)} />
          </Switch>
        ) : null}
      </AuthenticationContext.Provider>
    </>
  );
};
export default AuthenticationProvider;

export const LoginState = {
  Pending: "Pending",
  Unauthenticated: "Unauthenticated",
  Authenticated: "Authenticated",
  Unknown: "Unknown"
};
