import React, { createContext, useState, useEffect } from "react";
import useThunkReducer from 'react-hook-thunk-reducer';
import { AuthLoader } from "../components/Fullscreenloader/AuthLoader";
import Login from "../layouts/Login/Login";
import authChecker from "../_helpers/auth-checker"
import { LoginReducer } from "../store/reducers/authentication";

export const AuthenticationContext = createContext();

export const noAuthUser = { username: "Visitor", role: "visitor", email: null, sub: null, msg: "" };

const AuthenticationProvider = props => {
  
  const [user, userDispatch] = useThunkReducer(LoginReducer, noAuthUser, () => {
    const localstr = authChecker();
    console.log("Local storage: "+ JSON.stringify(localstr));
    return localstr ? localstr : noAuthUser
  });
  const [loginState, setLoginState] = useState(LoginState.Unauthenticated);

  const logout = () => {
    localStorage.removeItem('user');
    //setLoginState(LoginState.Unauthenticated);
    window.location.href = "/";
  };

  useEffect(() => {
    console.log("UseEffect",user);
    if(user.sub !== null && user.role !== "visitor"){
      setLoginState(LoginState.Authenticated);
    }else{
      setLoginState(LoginState.Unauthenticated);
    }
    
  }, [user])

  return (
    <>
      <AuthenticationContext.Provider value={{ loginstatus: loginState, user, userDispatch, logout }}>
        {loginState === LoginState.Pending ? <AuthLoader /> : null}
        {loginState === LoginState.Authenticated ? props.children : null}
        {loginState === LoginState.Unauthenticated || loginState === LoginState.Unknown ? (
          <Login onLogin={userDispatch} setlogin={setLoginState} msg={user.msg} />
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
