import Home from "views/Home.jsx";
import AllMatches from "views/AllMatches.jsx";
import AllEndMatches from "views/AllEndMatches.jsx";
import MyBets from "views/MyBets.jsx";
import UserProfile from "views/UserProfile.jsx";
import Toplist from "./views/Toplist";
import CurrentMatchInfo from "./views/CurrentMatchInfo";
import Transactions from "./views/Transactions";
import Statistics from "./views/Statistics";
import GroupsTable from "./views/GroupsTable";
import GroupsMatches from "./views/GroupsMatches";
import PlayerPage from "./views/PlayerPage";

var routes = [
  {
    id: "fooldal",
    path: "fooldal",
    name: "Főoldal",
    icon: "tim-icons icon-sound-wave",
    component: Home,
    visible: true,
    hiddenlink: false,
    layout: "/"
  },
  {
    id: "merkozesek",
    path: "merkozesek",
    name: "merkozesek",
    icon: "tim-icons icon-user-run",
    visible: true,
    hiddenlink: false,
    component: AllMatches,
    layout: "/"
  },
  {
    id: "lejatszott",
    path: "lejatszott",
    name: "lejatszott",
    icon: "tim-icons icon-lock-circle",
    visible: true,
    hiddenlink: false,
    component: AllEndMatches,
    layout: "/"
  },
  {
    id: "tabella",
    path: "tabella",
    name: "csoportállás",
    icon: "tim-icons icon-calendar-60",
    visible: true,
    hiddenlink: false,
    component: GroupsTable,
    layout: "/"
  },
  {
    id: "fogadasiam",
    path: "fogadasiam",
    name: "Fogadásaim",
    icon: "tim-icons icon-single-copy-04",
    visible: true,
    hiddenlink: false,
    component: MyBets,
    layout: "/"
  },
  {
    id: "profil",
    path: "profil",
    name: "Profilom",
    icon: "tim-icons icon-single-02",
    visible: true,
    hiddenlink: false,
    component: UserProfile,
    layout: "/"
  },
  {
    id: "toplist",
    path: "toplist",
    name: "Toplista",
    icon: "tim-icons icon-bullet-list-67",
    visible: true,
    hiddenlink: false,
    component: Toplist,
    layout: "/"
  },
  {
    id: "transactions",
    path: "transactions",
    name: "Tranzakciók",
    icon: "tim-icons icon-coins",
    visible: true,
    hiddenlink: false,
    component: Transactions,
    layout: "/"
  },
  {
    id: "statistics",
    path: "statisztika",
    name: "Statisztika",
    icon: "tim-icons icon-chart-bar-32",
    visible: true,
    hiddenlink: false,
    component: Statistics,
    layout: "/"
  },
  {
    id: "merkozes",
    path: "merkozes",
    name: "Futó mérkőzés",
    icon: "tim-icons icon-align-center",
    visible: true,
    hiddenlink: true,
    param: "/:matchid",
    component: CurrentMatchInfo,
    layout: "/"
  },
  {
    id: "csoportmerkozesek",
    path: "csoport",
    name: "Csoport mérkőzés",
    icon: "tim-icons icon-align-center",
    visible: true,
    hiddenlink: true,
    param: "/:groupid",
    component: GroupsMatches,
    layout: "/"
  },
  {
    id: "userpage",
    path: "player",
    name: "Játékos profil",
    icon: "tim-icons icon-align-center",
    visible: true,
    hiddenlink: true,
    param: "/:playerid",
    component: PlayerPage,
    layout: "/"
  }
];
export default routes;
