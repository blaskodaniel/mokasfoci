import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { Router, Route, Switch, Redirect } from "react-router-dom";
import configStore from './store/configStore';
import AdminLayout from "layouts/Admin/Admin.jsx";
import { hist } from "./_helpers/browserhistory";
import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import "assets/css/nucleo-outline-icons.css";
import "assets/css/overwrite.css";
import AuthenticationProvider from "./context/AuthenticationContext";
import routes from "routes.js";
import SharedProvider from "./context/SharedContect";

const store = configStore();
// const state = store.getState();

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <AuthenticationProvider>
        <SharedProvider>
          <Switch>
            <Route exact path="/" render={() => (<Redirect to="/fooldal" />)} />
            <Route path="/login" render={() => (<Redirect to="/fooldal" />)} />
            <Route path="/registration" render={() => (<Redirect to="/fooldal" />)} />
            {
              routes.map((route, key) => {
                return route.visible ? (
                  <Route
                    path={route.layout + route.path}
                    component={AdminLayout}
                    key={key}
                  />
                ): null;
              })
            }
            <Route path="*" component={() => "404 Not found"} />
          </Switch>
        </SharedProvider>
      </AuthenticationProvider>
    </Router>
  </Provider >,
  document.getElementById("root")
);
