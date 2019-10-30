import React, { useState, useEffect } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col
} from "reactstrap";
import Avatar from "@material-ui/core/Avatar";
import { getTeams } from "../_service/api-public-func";

const useStyles = makeStyles(theme => createStyles({
  avatar: {
    margin: "0px 10px",
    width: "15px",
    height: "15px",
    top: "2px",
    display: "inline-flex",
    [theme.breakpoints.down("sm")]: {
      width: "13px",
      height: "13px",
      top: "2px"
    }
  },
  indexnextteamstyle: {
    background: "#38774b52",
    color: "white"
  }
}));

const GroupsTable = () => {
  const classes = useStyles();
  const [groups, setGroups] = useState([]);

  const groupbygroupid = teamlist => {
    let returnlist = [];
    teamlist.forEach(element => {
      const _tgr = returnlist.find(x => x._id === element.groupid._id);
      if (_tgr) {
        _tgr.teams.push(element);
      } else {
        returnlist.push({
          _id: element.groupid._id,
          name: element.groupid.name,
          teams: [element]
        });
      }
    });

    return returnlist;
  };

  const sortTeams = (list) => {
    list.forEach(x=>{
      x.teams.sort((x,y)=>y.score - x.score)
      x.teams.sort((x,y)=>y.kickgoal - x.kickgoal)
    })
  }

  const loadlist = async () => {
    try {
      const resultPromise = await getTeams();
      const _groupedlist = groupbygroupid(resultPromise.data);
      sortTeams(_groupedlist)
      setGroups(_groupedlist);
      console.log(_groupedlist);
    } catch (e) {
      console.log("HIBA");
    }
  };

  useEffect(() => {
    loadlist();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="content groupstable">
        <Row>
          {groups.map(group => {
            return (
              <Col key={group._id}>
                <Card className="cardstyle">
                  <CardHeader>
                    <Row>
                      <Col className="text-left" xs="12">
                        <CardTitle tag="h3">{group.name} csoport</CardTitle>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody className="cardbodystyle">
                    <Table className="tablestyle" size="sm">
                      <thead>
                        <tr>
                          <th className="text-center">#</th>
                          <th></th>
                          <th>GY</th>
                          <th>D</th>
                          <th>V</th>
                          <th>G</th>
                          <th>P</th>
                        </tr>
                      </thead>
                      <tbody>
                        {group.teams.map((team,index) => {
                          return (
                            <tr key={team._id} className={classNames((index+1) < 3 ? classes.indexnextteamstyle : "")}>
                              <th className="text-center" scope="row">
                                <span>{index+1}</span>
                              </th>
                              <td>
                                <Avatar
                                  alt={team.flag}
                                  src={"flags/" + team.flag}
                                  className={classes.avatar}
                                />
                                {team.name}
                              </td>
                              <td>{team.win}</td>
                              <td>{team.draw}</td>
                              <td>{team.loss}</td>
                              <td>{team.kickgoal}:{team.getgoal}</td>
                              <td>{team.score}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </>
  );
};

export default GroupsTable;
