import React, { useState, useContext, useEffect } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import withWidth, { isWidthUp, isWidthDown } from '@material-ui/core/withWidth';
import classNames from "classnames";
import { Link } from "react-router-dom";
import routes from "../routes";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  UncontrolledDropdown,
  DropdownItem,
  Table,
  Row,
  Col
} from "reactstrap";
import Avatar from "@material-ui/core/Avatar";
import { getTeams } from "../_service/api-public-func";
import TournamentChart from "../components/Charts/TournamentChart"
import { AuthenticationContext } from "../context/AuthenticationContext";

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
  },
  groupwin: {
    fontSize: "11px",
    position: "relative",
    top: "-5px",
    color: "#a1b59ef5"
  },
  mb0:{
    marginBottom: "0 !important"
  }
}));

const GroupsTable = (props) => {
  const authContext = useContext(AuthenticationContext)
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
      x.teams.sort((x,y)=>{
        if(x.score > y.score){
          return -1
        }else if(y.score > x.score){
          return 1
        }else{ // y.score === x.score
          if(x.kickgoal > y.kickgoal){
            return -1
          }else if(y.kickgoal > x.kickgoal){
            return 1
          }else{
            return 0
          }
        }
      })
    })
  }

  const loadlist = async () => {
    try {
      const resultPromise = await getTeams();
      const _groupedlist = groupbygroupid(resultPromise.data);
      sortTeams(_groupedlist)
      setGroups(_groupedlist);
    } catch (e) {
      console.log("HIBA");
    }
  };

  useEffect(() => {
    loadlist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const grouplink = routes.filter(x => x.id === "csoportmerkozesek");
  return (
    <>
      <div className="content groupstable">
        {isWidthUp('sm', props.width) ? <Row>
          <TournamentChart />
        </Row> : null}
        <Row>
          {groups.map(group => {
            const groupwinteamid = authContext.userinfo ? authContext.userinfo[group.name] : undefined;
             let groupwinteam = typeof groupwinteamid !== "undefined" ? group.teams.find(x=>x._id === groupwinteamid) : "";
            return (
              <Col key={group._id}>
                <Card className="cardstyle">
                  <CardHeader>
                    <Row>
                      <Col className="text-left" xs="10">
                        <CardTitle className={classes.mb0} tag="h3">{group.name} csoport</CardTitle>
                        <span className={classes.groupwin}>Csoportgyőztes tipped: {groupwinteam.name}</span>
                      </Col>
                      <Col xs="2">
                      <UncontrolledDropdown className="fr zi1">
                        <DropdownToggle
                          caret
                          className="btn-icon"
                          color="link"
                          data-toggle="dropdown"
                          type="button"
                        >
                          <i className="tim-icons icon-settings-gear-63" />
                        </DropdownToggle>
                        <DropdownMenu aria-labelledby="dropdownMenuLink" right>
                          <DropdownItem
                            href="#pablo"
                            style={{color:"black"}}
                            onClick={() => {
                              props.history.push(grouplink[0].path+"/"+group._id)
                            }}
                          >
                            Csoport mérkőzései
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
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
                            <tr key={team._id} className={classNames((index+1) < 3 ? classes.indexnextteamstyle : "",authContext.userinfo.teamid === team._id ? "favoriteteamrow":"")}>
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

export default withWidth()(GroupsTable);
