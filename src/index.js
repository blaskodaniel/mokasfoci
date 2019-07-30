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
import "assets/css/overwrite.css";
import AuthenticationProvider from "./context/AuthenticationContext";
import routes from "routes.js";


const store = configStore();
// const state = store.getState();

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <AuthenticationProvider>
        <Switch>
          <Route exact path="/" render={() => ( <Redirect to="/merkozesek" />)} />
          {
            routes.map((route, key) => {
              return (
                <Route
                  path={route.layout + route.path}
                  component={AdminLayout}
                  key={key}
                />
              );
            })
          }
          <Route path="*" component={() => "404 Not found"} />
        </Switch>
      </AuthenticationProvider>
    </Router>
  </Provider>,
  document.getElementById("root")
);

/* {state.Login.authentication ?
  <Switch>
    <Route path="/admin" render={props => <AdminLayout {...props} />} />
    <Redirect from="/" to="/admin/merkozesek" />
  </Switch> :
  <Switch>
    <Route path="/" render={props => <Login {...props} /> } />
  </Switch>
} */