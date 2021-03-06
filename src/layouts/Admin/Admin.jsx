import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import { Route, Switch, Redirect } from "react-router-dom";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import {
  AuthenticationContext,
  LoginState
} from "../../context/AuthenticationContext";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import { AppConfig } from "../../application.config";
// import FixedPlugin from "components/FixedPlugin/FixedPlugin.jsx";

import routes from "routes.js";

import logo from "assets/img/logo.png";
import ScoreBar from "../../components/ScorePointer/ScoreBar";

var ps;

// Amit kapunk a store-ból
const mapStateToProps = (state, match) => {
  //console.log("ReduxStore: " + JSON.stringify(state));
  return {
    bettingmodal: state.Modals.value
  };
};

class Admin extends React.Component {
  static contextType = AuthenticationContext;
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "blue",
      sidebarOpened:
        document.documentElement.className.indexOf("nav-open") !== -1
    };
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      ps = new PerfectScrollbar(this.refs.mainPanel, { suppressScrollX: true });
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.documentElement.className += " perfect-scrollbar-off";
      document.documentElement.classList.remove("perfect-scrollbar-on");
    }
  }
  componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
      if (navigator.platform.indexOf("Win") > -1) {
        let tables = document.querySelectorAll(".table-responsive");
        for (let i = 0; i < tables.length; i++) {
          ps = new PerfectScrollbar(tables[i]);
        }
      }
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
  }
  // this function opens and closes the sidebar on small devices
  toggleSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    this.setState({ sidebarOpened: !this.state.sidebarOpened });
  };
  getRoutes = routes => {
    return routes.map((route, key) => {
      if (route.hiddenlink) {
        return (
          <Route
            path={route.layout + route.path + route.param}
            component={route.component}
            key={key}
          />
        );
      }else{
        return route.visible ? (
          <Route
            path={route.layout + route.path}
            component={route.component}
            key={key}
          />
        ) : null;
      }
      
    });
  };
  handleBgClick = color => {
    this.setState({ backgroundColor: color });
  };
  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "";
  };
  render() {
    const { loginstatus } = this.context;
    if (loginstatus === LoginState.Unauthenticated) {
      console.log(
        "loginstate:" + loginstatus + "; Átirányítás a Login page-re"
      );
      return (
        <Redirect
          to={{ pathname: "/login", state: { from: this.props.location } }}
        />
      );
    }
    return (
      <>
        <div className="wrapper">
          <Sidebar
            {...this.props}
            routes={routes}
            bgColor={this.state.backgroundColor}
            logo={{
              outterLink: "https://mokasfoci.hu/",
              text: AppConfig.logotext,
              subtext: AppConfig.gamename,
              imgSrc: logo
            }}
            toggleSidebar={this.toggleSidebar}
          />
          <div
            className="main-panel"
            ref="mainPanel"
            data={this.state.backgroundColor}
          >
            <AdminNavbar
              {...this.props}
              brandText={this.getBrandText(this.props.location.pathname)}
              toggleSidebar={this.toggleSidebar}
              sidebarOpened={this.state.sidebarOpened}
              routes={routes}
            />
            {isWidthDown('sm', this.props.width) ? <ScoreBar /> : null}
            <Switch>{this.getRoutes(routes)}</Switch>
            {/* <Footer fluid /> */}
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(connect(mapStateToProps)(withWidth()(Admin)));
