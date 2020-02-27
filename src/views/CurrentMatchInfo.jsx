import React, { useState, useEffect, useContext } from "react";
import uuidv1 from "uuid/v1";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import NumberFormat from "react-number-format";
import classNames from "classnames";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Avatar from "@material-ui/core/Avatar";
import { SharedContext } from '../context/SharedContect';
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Table,
  Row,
  Col
} from "reactstrap";
import { userbets } from "../_service/api-func";
import { AppConfig } from "../application.config";

const useStyles = makeStyles(theme =>
  createStyles({
    backlink: {
      color: "white",
      fontSize: "11px",
      "&:hover": {
        cursor: "pointer"
      }
    },
    backlinkicon: {
      fontSize: "1.0rem",
      marginBottom: "1px"
    },
    avatar: {
      margin: "0px 10px",
      width: "20px",
      height: "20px",
      top: "2px",
      display: "inline-flex",
      [theme.breakpoints.down("sm")]: {
        width: "13px",
        height: "13px",
        top: 0
      }
    },
    teamname: {
      display: "inline",
      fontSize: "1.4rem",
      [theme.breakpoints.down("xs")]: {
        fontSize: "0.8rem"
      },
      [theme.breakpoints.down(360)]: {
        display: "none"
      }
    },
    numb: {
      fontSize: "1.2rem",
      position: "relative",
      bottom: 0,
      padding: "0px 4px",
      [theme.breakpoints.down("xs")]: {
        fontSize: "0.8rem"
      }
    },
    wincolortext: {
      color: "rgba(28, 210, 34, 0.94) !important"
    },
    losecolortext: {
      color: "rgba(226, 92, 52, 0.94) !important"
    }

  })
);

const CurrentMatchInfo = ({ match, history }) => {
  const classes = useStyles();
  const sharectx = useContext(SharedContext)
  const [players, setPlayers] = useState([]);
  const [isProgress, setIsProgress] = useState(true);
  const [teamA, setTeamA] = useState({});
  const [teamB, setTeamB] = useState({});
  const [matchinfo, setMatchinfo] = useState({});
  const [displayPage, setdisplayPage] = useState(true)

  const loadlist = async () => {
    try{
      const resultPromise = await userbets(match.params.matchid);
      setPlayers(resultPromise.data.coupons);
      setIsProgress(false);
      setTeamA(resultPromise.data.teaminfo.teamA);
      setTeamB(resultPromise.data.teaminfo.teamB);
      setMatchinfo(resultPromise.data.matchinfo);
    }catch(e){
      setdisplayPage(false)
    }
    
  };

  useEffect(() => {
    loadlist();
    
    // TODO: CLEANUP!!!!
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isFavorite = coupon => {
    var returnobj = {
      isfav: false,
      team: ""
    };
    if (coupon.matchid.teamA === coupon.userid.teamid) {
      returnobj.isfav = true;
      returnobj.team = coupon.matchid.teamA;
    } else if (coupon.matchid.teamB === coupon.userid.teamid) {
      returnobj.isfav = true;
      returnobj.team = coupon.matchid.teamB;
    } else {
      returnobj.isfav = false;
    }

    return returnobj;
  };

  const isWin = cp => {
    if (cp.status === 2 && cp.success) {
      return classes.wincolortext;
    } else if (cp.status === 2 && !cp.success) {
      return classes.losecolortext;
    } else {
      return "";
    }
  };

  if(!displayPage){
    return(
      <>
      <div className="content currentmatch">
        <Row>
          <Col md="12">
            <h2>Ez a mérkőzés még nem kezdődött el! Nézz vissza később</h2>
          </Col>
        </Row>
      </div>
      </>    
    )
  }
  return (
    <>
      <div className="content currentmatch">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col className="text-center mt10 mb10" xs="12">
                    <Row>
                      <Col xs="6" className="text-right teampadding">
                        
                        <Avatar
                          alt={teamA.flag}
                          src={process.env.REACT_APP_BASEURL+"/flags/" + teamA.flag}
                          className={classes.avatar}
                        />
                        <p className={classNames("mr10", classes.teamname)}>{teamA.name}</p>
                        {matchinfo.active === 2 ? (
                          <>
                            <span className={classes.numb}>
                              {matchinfo.goalA}
                            </span>{""}
                          </>
                        ) : (
                          ""
                        )}
                      </Col>
                      <Col xs="6" className="text-left teampadding">
                        {matchinfo.active === 2 ? (
                          <>
                            <span className={classes.numb}>
                              {matchinfo.goalB}
                            </span>{" "}
                          </>
                        ) : (
                          ""
                        )}
                        <p className={classNames("ml10", classes.teamname)}>{teamB.name}</p>
                        <Avatar
                          alt={teamA.flag}
                          src={"/flags/" + teamB.flag}
                          className={classes.avatar}
                        />
                        
                      </Col>
                    </Row>

                  </Col>
                  <Col className="text-center" xs="12">
                    <p className="f11">
                      <span>{matchinfo.oddsAwin}</span> {" | "}
                      <span>{matchinfo.oddsDraw}</span> {" | "}
                      <span>{matchinfo.oddsBwin}</span>
                    </p>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter currentmatchtable" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Név</th>
                      <th className="text-center">Tipp</th>
                      <th className="text-center">Tét / odds</th>
                      <th className="text-center">Nyeremény</th>
                    </tr>
                  </thead>
                  <tbody>
                    {players.length > 0 && !isProgress ? (
                      players.map(cp => {
                        return (
                          <tr key={uuidv1()}>
                            <td className={isWin(cp)}>
                              {cp.userid.name}
                            </td>
                            <td className="text-center">{cp.outcome}</td>
                            <td className="text-center">
                              <NumberFormat
                                value={Math.round(cp.bet)}
                                displayType={"text"}
                                thousandSeparator={true}
                                renderText={value => value}
                              />
                              {" / "}
                              <NumberFormat
                                value={parseFloat(cp.odds)}
                                displayType={"text"}
                                thousandSeparator={true}
                                renderText={value => value}
                              />
                            </td>
                            <td className="text-center">
                              {isFavorite(cp).isfav ? (
                                <>
                                <NumberFormat
                                  value={Math.round(
                                    ((cp.bet * cp.odds)- cp.bet) * 2 
                                  )}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  renderText={value => <span>{value}</span>}
                                />
                                <span className="favoritsign">x{sharectx.settings.favoritTeamFactor}</span>
                                </>
                              ) : (
                                <NumberFormat
                                  value={Math.round(cp.bet * cp.odds - cp.bet)}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  renderText={value => value}
                                />
                              )}
                            </td>
                          </tr>
                        );
                      })
                    ) : isProgress ? (
                      <tr>
                        <td colSpan="4">Adatok betöltése....</td>
                      </tr>
                    ) : (
                      <tr>
                        <td colSpan="4">
                          Erre a mérkőzésre senki nem fogadott
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </CardBody>
              <CardFooter>
                <Col className="text-right" xs="12">
                  <span className={classes.backlink} onClick={history.goBack}>
                    <ChevronLeftIcon className={classes.backlinkicon} />
                    Vissza
                  </span>
                </Col>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default CurrentMatchInfo;
