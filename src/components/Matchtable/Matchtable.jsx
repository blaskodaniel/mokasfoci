import React, { useContext } from "react";
import * as moment from "moment";
import "moment/locale/hu";
import { useTheme,makeStyles, createStyles } from "@material-ui/core/styles";
import { Card, CardBody, Table, CardTitle, CardHeader } from "reactstrap";
import { SharedContext } from "../../context/SharedContect";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import routes from "../../routes";
import { AuthenticationContext } from "../../context/AuthenticationContext";

const useStyles = makeStyles(theme =>
  createStyles({
    avatar: {
      margin: "0px 5px",
      width: "15px",
      height: "15px",
      top: "2px",
      display: "inline-flex",
      [theme.breakpoints.down("sm")]: {
        width: "10px",
        height: "10px",
        top: 0
      }
    },
    alreadybet:{
      background: "#2086f74a",
      textAlign: "center"
    },
    teamname:{
      whiteSpace: "nowrap",
      display: "inline-block"
    },
    fix120:{
      [theme.breakpoints.down("sm")]:{
        width: "120px"
      }
    }
  })
);

const Matchelement = ({ value }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const sharedContext = useContext(SharedContext);
  const authContext = useContext(AuthenticationContext);
  const Bettingmodalopen = (match,mode,coupon=null) => {
    sharedContext.betmodal_setmode(mode)
    sharedContext.betmodal_setcoupon(coupon)
    sharedContext.betmodal_setmatch(match);
    sharedContext.betmodal_toggle();
    
  };
  const runningmatchlink = routes.filter(x => x.id === "merkozes");
  return (
    <>
      {value.length === 0 ? (
        <tr>
          <td colSpan="4">Nincsenek mérkőzések</td>
        </tr>
      ) : (
        value.map(match => {
          // Current running match
          const isAlreadyBetting = sharedContext.usercoupons.find(x=>x.matchid._id.toString() === match._id.toString());
          if (match.active === 1) {
            return (
              <tr key={match._id} className="bettingtablerow runmatch">
                <td>{moment(match.date).format("HH:mm")}</td>
                <td className={classes.fix120}>
                  {isDesktop ? 
                      <>
                        <Link to={runningmatchlink[0].path + "/" + match._id}>
                          {match.teamA.name}
                          <Avatar
                            alt={match.teamA.flag}
                            src={process.env.PUBLIC_URL + "flags/" + match.teamA.flag}
                            className={classes.avatar}
                          />
                          -
                          <Avatar
                            alt={match.teamA.flag}
                            src={process.env.PUBLIC_URL + "flags/" + match.teamB.flag}
                            className={classes.avatar}
                          />
                          {match.teamB.name}
                        </Link>
                      </> 
                      :
                      <>
                        <Link to={runningmatchlink[0].path + "/" + match._id}>
                          <div>
                          <div className={classes.teamname}>{match.teamA.name}</div>
                          <Avatar
                          alt={match.teamA.flag}
                          src={process.env.PUBLIC_URL + "flags/" + match.teamA.flag}
                          className={classes.avatar}
                          />
                          </div>
                          <div>
                          <div className={classes.teamname}>{match.teamB.name}</div>
                          <Avatar
                            alt={match.teamA.flag}
                            src={process.env.PUBLIC_URL + "flags/" + match.teamB.flag}
                            className={classes.avatar}
                          />
                          </div> 
                        </Link>
                    </>
                  }
                </td>
                <td className="text-center">
                  {typeof isAlreadyBetting !== "undefined" && isAlreadyBetting.outcome === "1" ? <span className="alreadybet">{match.oddsAwin}</span> : match.oddsAwin}
                </td>
                <td className="text-center">
                  {typeof isAlreadyBetting !== "undefined" && isAlreadyBetting.outcome === "x" ? <span className="alreadybet">{match.oddsDraw}</span> : match.oddsDraw}
                </td>
                <td className="text-center">
                  {typeof isAlreadyBetting !== "undefined" && isAlreadyBetting.outcome === "2" ? <span className="alreadybet">{match.oddsBwin}</span> : match.oddsBwin}
                </td>
              </tr>
            );
          } else if (match.active === 2) {
            // End match
            return (
              <tr key={match._id} className="bettingtablerow endmatch">
                <td>{moment(match.date).format("HH:mm")}</td>
                <td className={classes.fix120}>
                  {isDesktop ? 
                      <>
                        <Link to={runningmatchlink[0].path + "/" + match._id}>
                        {match.teamA.name}
                        <Avatar
                          alt={match.teamA.flag}
                          src={process.env.PUBLIC_URL + "flags/" + match.teamA.flag}
                          className={classes.avatar}
                        />
                        -
                        <Avatar
                          alt={match.teamA.flag}
                          src={process.env.PUBLIC_URL + "flags/" + match.teamB.flag}
                          className={classes.avatar}
                        />
                        {match.teamB.name}
                        </Link>
                        <span className="finmatch"> (vége)</span>
                      </> 
                      :
                      <>
                        <Link to={runningmatchlink[0].path + "/" + match._id}>
                          <div>
                          <div className={classes.teamname}>{match.teamA.name}</div>
                          <Avatar
                          alt={match.teamA.flag}
                          src={process.env.PUBLIC_URL + "flags/" + match.teamA.flag}
                          className={classes.avatar}
                          />
                          </div>
                          <div>
                          <div className={classes.teamname}>{match.teamB.name}</div>
                          <Avatar
                            alt={match.teamA.flag}
                            src={process.env.PUBLIC_URL + "flags/" + match.teamB.flag}
                            className={classes.avatar}
                          />
                          </div> 
                        </Link>
                    </>
                  }
                </td>
                <td className="text-center">
                  {typeof isAlreadyBetting !== "undefined" && isAlreadyBetting.outcome === "1" ? <span className="alreadybet">{match.oddsAwin}</span> : match.oddsAwin}
                </td>
                <td className="text-center">
                  {typeof isAlreadyBetting !== "undefined" && isAlreadyBetting.outcome === "x" ? <span className="alreadybet">{match.oddsDraw}</span> : match.oddsDraw}
                </td>
                <td className="text-center">
                  {typeof isAlreadyBetting !== "undefined" && isAlreadyBetting.outcome === "2" ? <span className="alreadybet">{match.oddsBwin}</span> : match.oddsBwin}
                </td>
              </tr>
            );
          } else {
            // it hasn't been played yet 
            return (
              <tr
                key={match._id}
                className={typeof isAlreadyBetting !== "undefined" ? "alreadybetbg bettingtablerow" : "bettingtablerow"}
                onClick={() => typeof isAlreadyBetting !== "undefined" ? Bettingmodalopen(match,"edit",isAlreadyBetting) : Bettingmodalopen(match,"create")}
              >
                <td>{moment(match.date).format("HH:mm")}</td>
                <td className={classes.fix120}>
                  {isDesktop ? 
                      <>
                        {match.teamA.name}
                        <Avatar
                          alt={match.teamA.flag}
                          src={process.env.PUBLIC_URL + "flags/" + match.teamA.flag}
                          className={classes.avatar}
                        />
                        -
                        <Avatar
                          alt={match.teamA.flag}
                          src={process.env.PUBLIC_URL + "flags/" + match.teamB.flag}
                          className={classes.avatar}
                        />
                        {match.teamB.name}
                      </> 
                      :
                      <>
                        <div>
                        <div className={classes.teamname}>{match.teamA.name}</div>
                        <Avatar
                        alt={match.teamA.flag}
                        src={process.env.PUBLIC_URL + "flags/" + match.teamA.flag}
                        className={classes.avatar}
                        />
                        </div>
                        <div>
                        <div className={classes.teamname}>{match.teamB.name}</div>
                        <Avatar
                          alt={match.teamA.flag}
                          src={process.env.PUBLIC_URL + "flags/" + match.teamB.flag}
                          className={classes.avatar}
                        />
                      </div> 
                    </>
                  }
                </td>
                <td className="text-center">
                  {typeof isAlreadyBetting !== "undefined" && isAlreadyBetting.outcome === "1" ? 
                        parseFloat(isAlreadyBetting.odds) === parseFloat(match.oddsAwin) || !authContext.userinfo.oddssuggest ? 
                        <span className="alreadybet">{match.oddsAwin}</span> 
                        :
                        <><span className="alreadybet">{match.oddsAwin}</span>{parseFloat(isAlreadyBetting.odds) > parseFloat(match.oddsAwin)?null:<i className="fa fa-exclamation oddswarn"></i>}</>
                      : 
                      match.oddsAwin}
                </td>
                <td className="text-center">
                  {typeof isAlreadyBetting !== "undefined" && isAlreadyBetting.outcome === "x" ? 
                        parseFloat(isAlreadyBetting.odds) === parseFloat(match.oddsDraw) || !authContext.userinfo.oddssuggest ? 
                        <span className="alreadybet">{match.oddsDraw}</span> 
                        :
                        <><span className="alreadybet">{match.oddsDraw}</span>{parseFloat(isAlreadyBetting.odds) > parseFloat(match.oddsDraw)?null:<i className="fa fa-exclamation oddswarn"></i>}</> 
                      : 
                      match.oddsDraw}
                </td>
                <td className="text-center">
                  {typeof isAlreadyBetting !== "undefined" && isAlreadyBetting.outcome === "2" ? 
                      parseFloat(isAlreadyBetting.odds) === parseFloat(match.oddsBwin) || !authContext.userinfo.oddssuggest ? 
                      <span className="alreadybet">{match.oddsBwin}</span> 
                      :
                      <><span className="alreadybet">{match.oddsBwin}</span>{parseFloat(isAlreadyBetting.odds) > parseFloat(match.oddsBwin)?null:<i className="fa fa-exclamation oddswarn"></i>}</> 
                      : 
                      match.oddsBwin}
                </td>
              </tr>
            );
          }
        })
      )}
    </>
  );
};

const Matchlist = ({ val, addtodayrow }) => {
  let isTodayMatch = false;
  val.forEach(x => {
    if (moment(x.month).isSame(moment().format(), "day")) {
      isTodayMatch = true;
    }
  });
  let __matchlist = val;
  if (!isTodayMatch && addtodayrow) {
    __matchlist = [
      { group: "-1", month: moment().format("YYYY-MM-DD HH:mm"), data: [] },
      ...__matchlist
    ];
  }
  return (
    <>
      {__matchlist.map(match => {
        return (
          <React.Fragment key={match.group}>
            <tr className="theadrow">
              <td colSpan="2">
                {moment(match.month).calendar(null, {
                  sameDay: "[Ma]",
                  nextDay: "[Holnap]",
                  nextWeek: "MMMM Do dddd",
                  lastDay: "[Tegnap]",
                  lastWeek: "MMMM Do dddd",
                  sameElse: "MMMM Do dddd"
                })}
              </td>
              {match.data.length > 0 ? (
                <td className="text-center">1</td>
              ) : (
                <td></td>
              )}
              {match.data.length > 0 ? (
                <td className="text-center">X</td>
              ) : (
                <td></td>
              )}
              {match.data.length > 0 ? (
                <td className="text-center">2</td>
              ) : (
                <td></td>
              )}
            </tr>
            <Matchelement value={match.data} />
          </React.Fragment>
        );
      })}
    </>
  );
};

const Matchtable = ({ list, title }) => {
  let ADDtodayRow = true;
  let counter = 0;
  moment.locale("hu");

  const sortByDate = (list, type) => {
    let retArray = list;
    if (type === "asc") {
      retArray.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
    } else if (type === "desc") {
      retArray
        .sort((a, b) => {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        })
        .reverse();
    }

    return retArray;
  };

  const groupbyfunc = (list, key) => {
    let groupKey = 0;
    let groups = list.reduce(function(r, o) {
      var m = o.date.split(" ")[0].split("-")[key];
      r[m]
        ? r[m].data.push(o)
        : (r[m] = {
            group: String(groupKey++),
            month: o.date,
            data: [o]
          });
      return r;
    }, {});

    var result = Object.keys(groups).map(function(k) {
      return groups[k];
    });

    return result;
  };

  const groupByMonth = list => {
    let groupbymonth = groupbyfunc(list, 1); // groupby month
    groupbymonth.forEach(item => {
      let groupbyday = groupbyfunc(item.data, 2);
      groupbyday.sort((x, c) => new Date(x.month) - new Date(c.month));
      item.data = groupbyday;
    });

    let sortedbygroup = groupbymonth.sort((a, b) => {
      return parseInt(a.group) - parseInt(b.group);
    });
    return sortedbygroup;
  };

  const sortedlist = sortByDate(list, "asc");
  const groupedbymonth = groupByMonth(sortedlist);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">{title}</CardTitle>
        </CardHeader>
        <CardBody>
          <Table className="tablesorter" responsive>
            <tbody>
              {groupedbymonth.map(matchgroup => {
                counter++;
                if(counter > 1){
                  ADDtodayRow = false;
                }
                return (
                  <Matchlist key={matchgroup.group} val={matchgroup.data} addtodayrow={ADDtodayRow} />
                );
              })}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </>
  );
};

export default Matchtable;
