import Home from "views/Home.jsx";
import Icons from "views/Icons.jsx";
import MyBets from "views/MyBets.jsx";
import Notifications from "views/Notifications.jsx";
import TableList from "views/TableList.jsx";
import Typography from "views/Typography.jsx";
import UserProfile from "views/UserProfile.jsx";

var routes = [
  {
    path: "merkozesek",
    name: "Mérkőzések",
    icon: "tim-icons icon-chart-pie-36",
    component: Home,
    layout: "/"
  },
  {
    path: "icons",
    name: "Icons",
    icon: "tim-icons icon-atom",
    component: Icons,
    layout: "/"
  },
  {
    path: "fogadasiam",
    name: "Fogadásaim",
    icon: "tim-icons icon-pin",
    component: MyBets,
    layout: "/"
  },
  {
    path: "notifications",
    name: "Notifications",
    icon: "tim-icons icon-bell-55",
    component: Notifications,
    layout: "/"
  },
  {
    path: "profil",
    name: "User Profile",
    icon: "tim-icons icon-single-02",
    component: UserProfile,
    layout: "/"
  },
  {
    path: "tables",
    name: "Table List",
    icon: "tim-icons icon-puzzle-10",
    component: TableList,
    layout: "/"
  },
  {
    path: "typography",
    name: "Typography",
    icon: "tim-icons icon-align-center",
    component: Typography,
    layout: "/"
  }
];
export default routes;
