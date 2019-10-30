import React, { useContext } from "react";
import * as moment from "moment";
import "moment/locale/hu";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Card, CardBody, Table, CardTitle, CardHeader } from "reactstrap";
import { SharedContext } from "../../context/SharedContect";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import routes from "../../routes";

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
    }
  })
);

const Matchelement = ({ value }) => {
  const classes = useStyles();
  const sharedContext = useContext(SharedContext);
  const Bettingmodalopen = (match,mode,coupon=null) => {
    sharedContext.betmodal_setmode(mode)
    if(coupon !== null){
      // If we are in edit mode we have to pass the user coupon 
      sharedContext.betmodal_setcoupon(coupon)
    }
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
                <td>
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
                <td>
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
                <td>
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
