import React, { useState, useEffect, useContext } from "react";
import * as moment from "moment";
import "moment/locale/hu";
// import _ from "lodash";
import { Card, CardBody, Table } from "reactstrap";
import { SharedContext } from "../../context/SharedContect";

const Matchelement = ({ value }) => {
  const sharedContext = useContext(SharedContext);
  const openmsgmod = (match) => {
    sharedContext.betmodal_setmatch(match);
    sharedContext.betmodal_toggle();
  }
  return (
    <>
      {value.map(match => {
        return (
          <tr key={match._id} className="bettingtablerow" onClick={()=>openmsgmod(match)}>
            <td>{moment(match.date).format("HH:mm")}</td>
            <td>
              {match.teamA.name} - {match.teamB.name}
            </td>
            <td className="text-center">{match.oddsAwin}</td>
            <td className="text-center">{match.oddsDraw}</td>
            <td className="text-center">{match.oddsBwin}</td>
          </tr>
        );
      })}
    </>
  );
};

const Matchlist = ({ val }) => {
  return (
    <>
      {val.map(match => {
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
              <td className="text-center">1</td>
              <td className="text-center">X</td>
              <td className="text-center">2</td>
            </tr>
            <Matchelement value={match.data} />
          </React.Fragment>
        );
      })}
    </>
  );
};

const Matchtable = ({ list }) => {
  const [test, setTest] = useState("dgb");
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
      item.data = groupbyday;
    });

    let sortedbygroup = groupbymonth.sort((a, b) => {
      return parseInt(a.group) - parseInt(b.group);
    });
    return sortedbygroup;
  };

  const sortedlist = sortByDate(list, "asc");
  const groupedbymonth = groupByMonth(sortedlist);

  useEffect(() => {
    const loadMatches = () => {
      setTest("Jaj de jó");
      console.log("Use effect", test);
    };

    loadMatches();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Card>
        <CardBody>
          <Table className="tablesorter" responsive>
            <tbody>
              {groupedbymonth.map(matchgroup => {
                return (
                  <Matchlist key={matchgroup.group} val={matchgroup.data} />
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
