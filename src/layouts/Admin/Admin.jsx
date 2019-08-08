import React from "react";
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { Route, Switch, Redirect } from "react-router-dom";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import {AuthenticationContext, LoginState} from "../../context/AuthenticationContext";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import BettingModal from "components/Modal/BettingModal.jsx";
// import FixedPlugin from "components/FixedPlugin/FixedPlugin.jsx";

import routes from "routes.js";

import logo from "assets/img/logo.png";

var ps;

// Amit kapunk a store-ból
const mapStateToProps = (state, match) => {
  console.log("ReduxStore: " + JSON.stringify(state))
  return {
    bettingmodal: state.Modals.value
  }
}

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
      if(this.context.user.role.includes("admin") && route.type.includes("admin")){
        return (
          <Route
            path={route.layout + route.path}
            component={route.component}
            key={key}
          />
        );
      } 
      if(route.type.includes("player")){
        return (
          <Route
            path={route.layout + route.path}
            component={route.component}
            key={key}
          />
        );
      }else{
        return null;
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
    const {loginstatus} = this.context;
    if (loginstatus === LoginState.Unauthenticated) {
      console.log("loginstate:"+loginstatus+"; Átirányítás a Login page-re");
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
              outterLink: "https://www.creative-tim.com/",
              text: "Mókás Fogadás",
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
            />
            <Switch>{this.getRoutes(routes)}</Switch>
            {// we don't want the Footer to be rendered on map page
            this.props.location.pathname.indexOf("maps") !== -1 ? null : (
              <Footer fluid />
            )}
          </div>
          <BettingModal initialModalState={this.props.bettingmodal} />
        </div>
        {/* <FixedPlugin
          bgColor={this.state.backgroundColor}
          handleBgClick={this.handleBgClick}
        /> */}
      </>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Admin));
