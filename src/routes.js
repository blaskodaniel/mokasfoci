import Home from "views/Home.jsx";
import AdminUsermanager from "views/Admin-usermanager.jsx";
import MyBets from "views/MyBets.jsx";
import Notifications from "views/Notifications.jsx";
import TableList from "views/TableList.jsx";
import Typography from "views/Typography.jsx";
import UserProfile from "views/UserProfile.jsx";

var routes = [
  {
    path: "merkozesek",
    name: "Mérkőzések",
    type: ["player"],
    icon: "tim-icons icon-chart-pie-36",
    component: Home,
    layout: "/"
  },
  {
    path: "usermanager",
    name: "Usermanager",
    type: ["admin"],
    icon: "nc-icon nc-multiple-11",
    component: AdminUsermanager,
    layout: "/"
  },
  {
    path: "fogadasiam",
    name: "Fogadásaim",
    type: ["player"],
    icon: "tim-icons icon-pin",
    component: MyBets,
    layout: "/"
  },
  {
    path: "notifications",
    name: "Notifications",
    type: ["player"],
    icon: "tim-icons icon-bell-55",
    component: Notifications,
    layout: "/"
  },
  {
    path: "profil",
    name: "User Profile",
    type: ["player"],
    icon: "tim-icons icon-single-02",
    component: UserProfile,
    layout: "/"
  },
  {
    path: "tables",
    name: "Table List",
    type: ["player"],
    icon: "tim-icons icon-puzzle-10",
    component: TableList,
    layout: "/"
  },
  {
    path: "typography",
    name: "Typography",
    type: ["player"],
    icon: "tim-icons icon-align-center",
    component: Typography,
    layout: "/"
  }
];
export default routes;
