import Home from "views/Home.jsx";
import AdminUsermanager from "views/Admin-usermanager.jsx";
import MyBets from "views/MyBets.jsx";
import Notifications from "views/Notifications.jsx";
import Typography from "views/Typography.jsx";
import UserProfile from "views/UserProfile.jsx";
import Toplist from "./views/Toplist";

var routes = [
  {
    path: "fooldal",
    name: "Főoldal",
    icon: "tim-icons icon-chart-pie-36",
    component: Home,
    visible: true,
    layout: "/"
  },
  {
    path: "usermanager",
    name: "Usermanager",
    icon: "nc-icon nc-multiple-11",
    visible: false,
    component: AdminUsermanager,
    layout: "/"
  },
  {
    path: "fogadasiam",
    name: "Fogadásaim",
    icon: "tim-icons icon-pin",
    visible: true,
    component: MyBets,
    layout: "/"
  },
  {
    path: "notifications",
    name: "Notifications",
    icon: "tim-icons icon-bell-55",
    visible: false,
    component: Notifications,
    layout: "/"
  },
  {
    path: "profil",
    name: "User Profile",
    icon: "tim-icons icon-single-02",
    visible: true,
    component: UserProfile,
    layout: "/"
  },
  {
    path: "toplist",
    name: "Toplista",
    icon: "tim-icons icon-puzzle-10",
    visible: true,
    component: Toplist,
    layout: "/"
  },
  {
    path: "typography",
    name: "Typography",
    icon: "tim-icons icon-align-center",
    visible: false,
    component: Typography,
    layout: "/"
  }
];
export default routes;
