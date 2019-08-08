import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { Router, Route, Switch, Redirect } from "react-router-dom";
import configStore from './store/configStore';
import AdminLayout from "layouts/Admin/Admin.jsx";
import {hist} from "./_helpers/browserhistory";
import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import "assets/css/nucleo-outline-icons.css";
import "assets/css/overwrite.css";
import AuthenticationProvider from "./context/AuthenticationContext";
import routes from "routes.js";
import AdminAreaProvider from "./context/AdminAreaContext";

const store = configStore();
// const state = store.getState();

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <AuthenticationProvider>
        <AdminAreaProvider>
        <Switch>
          {
            routes.map((route, key) => {
              if(route.type.includes("admin")){
                return (
                  <Route
                    path={route.layout + route.path}
                    component={AdminLayout}
                    key={key}
                  />
                );
              }else{
                return null;
              }
            })
          }
        </Switch>
        </AdminAreaProvider>
        <Switch>
          <Route exact path="/" render={() => ( <Redirect to="/merkozesek" />)} />
          <Route path="/login" render={() => ( <Redirect to="/merkozesek" />)} />
          <Route path="/registration" render={() => ( <Redirect to="/merkozesek" />)} />
          {
            routes.map((route, key) => {
              if(route.type.includes("player")){
                return (
                  <Route
                    path={route.layout + route.path}
                    component={AdminLayout}
                    key={key}
                  />
                );
              }else{
                return null;
              }
              
            })
          }
          <Route path="*" component={() => "404 Not found"} />
        </Switch>
      </AuthenticationProvider>
    </Router>
  </Provider>,
  document.getElementById("root")
);
