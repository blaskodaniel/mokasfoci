import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import {
  AuthenticationContext,
  LoginState
} from "../context/AuthenticationContext";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { loginstatus } = useContext(AuthenticationContext);

  return (
    <>
    <Route
      {...rest}
      render={props => {
        if (loginstatus === LoginState.Authenticated) {
          console.log("ÁTMENT: ", loginstatus);
          return (
            <Redirect
              to={{ pathname: "/admin/merkozesek", state: { from: props.location } }}
            />
          );
        } else {
          console.log("REDIRECT: ", loginstatus);
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        }
      }}
    />
    </>
  );
};

export default ProtectedRoute;
