import React, { createContext, useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import useThunkReducer from 'react-hook-thunk-reducer';
import { AuthLoader } from "../components/Fullscreenloader/AuthLoader";
import Login from "../layouts/Login/Login";
import {AppConfig} from "../application.config";
import authChecker from "../_helpers/auth-checker"
import { LoginReducer, RegistrationReducer } from "../store/reducers/authentication";
import Registration from "../components/Registration/Registration";
import { loadProfile } from "../_service/api-func";

export const AuthenticationContext = createContext();

export const noAuthUser = { username: "Visitor", email: null, sub: null, msg: ""};

const AuthenticationProvider = props => {
  const [loginState, setLoginState] = useState(LoginState.Unauthenticated);
  const [registerState, setRegisterState] = useState(0);
  const [register, registerDispatch] = useThunkReducer(RegistrationReducer, {msg:null});
  const [userinfo, setUserinfo] = useState({});
  const [refresh, setrefresh] = useState(true)
  const [user, userDispatch] = useThunkReducer(LoginReducer, noAuthUser, () => {
    const localstr = authChecker();
    //console.log("Local storage: "+ JSON.stringify(localstr));
    return localstr ? localstr : noAuthUser
  });

  const logout = () => {
    localStorage.removeItem(AppConfig.JWTtokenname);
    //setLoginState(LoginState.Unauthenticated);
    window.location.href = "/";
  };

  const loadUserProfile = async () => {
    const resultPromise = await loadProfile();
    setUserinfo(resultPromise.data);
  };

  const userinforefresh = () => {
    setrefresh(!refresh)
  }

  useEffect(() => {
    //console.log("AuthenticationProvider: ",user);
    if(user.sub !== null && user.email !== null){
      setLoginState(LoginState.Authenticated);
      loadUserProfile();
    }else{
      setLoginState(LoginState.Unauthenticated);
    }
    
  }, [user,loginState,refresh])

  useEffect(() => {
    if(register.msg === 0){
      // sikeres regisztráció
      setRegisterState(1);
    }else{
      // sikertelen regisztráció
      setRegisterState(2);
    }
    
  }, [register])

  return (
    <>
      <AuthenticationContext.Provider value={{ loginstatus: loginState, user, userinfo, setUserinfo, userDispatch, logout, userinforefresh }}>
        {loginState === LoginState.Pending ? <AuthLoader /> : null}
        {loginState === LoginState.Authenticated ? props.children : null}
        {loginState === LoginState.Unauthenticated || loginState === LoginState.Unknown ? (
          <Switch>
            <Route exact path="/" render={() => ( <Login onLogin={userDispatch} setlogin={setLoginState} msg={user.msg} />)} />
            <Route path="/login" render={() => ( <Login onLogin={userDispatch} setlogin={setLoginState} msg={user.msg} />)} />
            <Route path="/registration" render={() => ( 
              <Registration onRegister={registerDispatch} setlogin={setLoginState} msg={register} regstate={registerState} setregstate={setRegisterState} />
            )} />
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
