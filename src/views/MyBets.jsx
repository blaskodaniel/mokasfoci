import React, { useState, useEffect, useContext } from "react";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import NumberFormat from 'react-number-format';
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import moment from "moment";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFrown } from '@fortawesome/free-solid-svg-icons'
import { faCogs } from '@fortawesome/free-solid-svg-icons'
import { faFutbol } from '@fortawesome/free-solid-svg-icons'
import Fab from "@material-ui/core/Fab";
import ReactTooltip from 'react-tooltip'
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from '@material-ui/core/Tooltip';
import ScorePointer from "../components/ScorePointer/ScorePointer";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Button,
  ButtonGroup,
  Col
} from "reactstrap";
import { getCouponsByUserId, deleteCoupon } from "../_service/api-func";
import { AuthenticationContext } from "../context/AuthenticationContext";
import { getTeams } from "../_service/api-public-func";
import { AppConfig } from "../application.config";

const faFrownicon = <FontAwesomeIcon icon={faFrown} />
const faCogsicon = <FontAwesomeIcon icon={faCogs} />
const footballicon = <FontAwesomeIcon icon={faFutbol} />

const useStyles = makeStyles({
  card: {
    minWidth: 275
  },
  fab: {
    width: 35,
    height: 35
  },
  cardaction: {
    justifyContent: "flex-end"
  },
  cardcontent: {
    color: "white",
    padding: "9px 15px 0px 15px"
  },
  cprow: {
    fontSize: "12px"
  },
  cprowbig: {
    fontSize: "14px"
  },
  hr: {
    borderTop: "1px solid rgba(234, 193, 193, 0.1)",
    marginTop: "3px",
    marginBottom: "5px"
  },
  matchdateinfo: {
    display: "block",
    fontSize: "10px",
    textTransform: "lowercase",
    fontStyle: "italic"
  },
  infospansucc: {
    position: "absolute",
    right: "0px",
    width: "100px",
    padding: "3px 0px 2px 7px",
    top: "15px",
    backgroundColor: "#47af4fb5",
    color: "white",
    fontSize: "11px"
  },
  infospanfail: {
    position: "absolute",
    right: "0px",
    width: "100px",
    padding: "3px 0px 2px 7px",
    top: "15px",
    backgroundColor: "#af3737b5",
    color: "white",
    fontSize: "11px"
  },
  infospantime: {
    position: "absolute",
    right: "0px",
    width: "100px",
    padding: "3px 0px 2px 7px",
    top: "15px",
    backgroundColor: "#4789afb5",
    color: "white",
    fontSize: "11px"
  },
  runningmatch: {
    position: "absolute",
    right: "0px",
    width: "100px",
    padding: "3px 0px 2px 7px",
    top: "15px",
    backgroundColor: "#178834b5",
    color: "white",
    fontSize: "11px"
  },
  infospanproc: {
    position: "absolute",
    right: "0px",
    width: "100px",
    padding: "3px 0px 2px 7px",
    top: "15px",
    backgroundColor: "#5247afb5",
    color: "white",
    fontSize: "11px"
  }
});

const MyBets = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));
  const currentUser = useContext(AuthenticationContext);
  const [filter, setFilter] = useState("all");
  const [coupons, setCoupons] = useState([]);
  const [teams, setTeams] = useState([]);

  const delCoupon = async coupon => {
    try {
      await deleteCoupon(coupon);
      const newlist = coupons.filter(c => c._id !== coupon._id);
      currentUser.setUserinfo({
        ...currentUser.userinfo,
        score: currentUser.userinfo.score + coupon.bet
      });
      setCoupons(newlist);
    } catch (err) {
      console.log("Hiba történt a törlés során", err);
    }
  };

  const resultCalc = coupon => {
    if(typeof coupon.success !== "undefined" 
    && coupon.success 
    && (coupon.matchid.teamA === currentUser.userinfo.teamid || coupon.matchid.teamB === currentUser.userinfo.teamid)){
      const res = ((coupon.bet*coupon.odds)-coupon.bet)*2;
      return Math.round(res * 100) / 100
    }else{
      const res = (coupon.bet*coupon.odds)-coupon.bet;
      return Math.round(res * 100) / 100
    }
  }

  const isFavorite = coupon => {
    var returnobj = {
      isfav: false,
      team: ""
    }
    if(typeof coupon.success !== "undefined" && coupon.success && coupon.matchid.teamA === currentUser.userinfo.teamid){
      returnobj.isfav = true
      returnobj.team = coupon.matchid.teamA
    }else if(typeof coupon.success !== "undefined" && coupon.success && coupon.matchid.teamB === currentUser.userinfo.teamid){
      returnobj.isfav = true
      returnobj.team = coupon.matchid.teamB
    }else{
      returnobj.isfav = false
    }

    return returnobj
  }

  const opeconfirm = coupon => {
    confirmAlert({
      title: "Szelvény törlése",
      message: "Biztosan törlöd a szelvényt?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            console.log("coupon: " + coupon);
            delCoupon(coupon);
          }
        },
        {
          label: "No",
          onClick: () => {}
        }
      ]
    });
  };

  useEffect(() => {
    const loadCoupons = async () => {
      const resultPromise = await getCouponsByUserId(currentUser.user.sub);
      setCoupons(resultPromise.data);
    };

    const loadTeams = async () => {
      const resultPromise = await getTeams();
      setTeams(resultPromise.data);
    };

    loadCoupons();
    loadTeams();
    // TODO: CLEANUP!!!!

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const categoryFilter = cp => {
    let filtered = cp;
    switch (filter) {
      case "won":
        filtered = typeof cp.success !== "undefined" && cp.success === true;
        break;
      case "lost":
        filtered = typeof cp.success !== "undefined" && cp.success === false;
        break;
      case "notplay":
        filtered = cp.matchid.active === 0 || cp.matchid.active === 1;
        break;
      default:
        break;
    }

    return filtered;
  };

  const matchStatus = match => {
    switch (match.matchid.active) {
      case 0:
        return `-`;
      case 1:
        return `-`;
      case 2:
        if (typeof match.matchid.goalA !== "undefined" && typeof match.matchid.goalB !== "undefined") {
          return `${match.matchid.goalA} - ${match.matchid.goalB}`;
        } else {
          return "";
        }
      default:
        return "";
    }
  };

  if (isDesktop) {
    // Desktop
    return (
      <>
        <div className="content mybets">
          <h3>Szelvényeim</h3>
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <Row>
                    <Col className="text-left" sm="6">
                      
                    </Col>
                    <Col sm="6">
                      <ButtonGroup
                        className="btn-group-toggle float-right"
                        data-toggle="buttons"
                      >
                        <Button
                          tag="label"
                          className={classNames("btn-simple", {
                            active: filter === "won"
                          })}
                          color="info"
                          id="0"
                          size="sm"
                          onClick={() => setFilter("won")}
                        >
                          <input
                            defaultChecked
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Nyertes
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-trophy" />
                          </span>
                        </Button>
                        <Button
                          color="info"
                          id="1"
                          size="sm"
                          tag="label"
                          className={classNames("btn-simple", {
                            active: filter === "lost"
                          })}
                          onClick={() => setFilter("lost")}
                        >
                          <input
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Vesztes
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-simple-remove" />
                          </span>
                        </Button>
                        <Button
                          tag="label"
                          className={classNames("btn-simple", {
                            active: filter === "notplay"
                          })}
                          color="info"
                          id="0"
                          size="sm"
                          onClick={() => setFilter("notplay")}
                        >
                          <input
                            defaultChecked
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Aktív
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-tv-2" />
                          </span>
                        </Button>
                        <Button
                          color="info"
                          id="2"
                          size="sm"
                          tag="label"
                          className={classNames("btn-simple", {
                            active: filter === "all"
                          })}
                          onClick={() => setFilter("all")}
                        >
                          <input
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Összes
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-bullet-list-67" />
                          </span>
                        </Button>
                      </ButtonGroup>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter mybettable" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Mérkőzés</th>
                        <th className="text-center">Eredmény</th>
                        <th className="text-center">Tipp/Odds</th>
                        <th className="text-center">Tét</th>
                        <th className="text-center">Nyeremény</th>
                        <th className="text-center">Status</th>
                        <th className="text-center">Törlés</th>
                      </tr>
                    </thead>
                    <tbody>
                      {coupons.length > 0 && teams.length > 0
                        ? coupons.map(cp => {
                            if (!categoryFilter(cp)) {
                              return null;
                            }
                            let Ateamaname = teams.find(
                              t => t._id === cp.matchid.teamA
                            );
                            let Bteamaname = teams.find(
                              t => t._id === cp.matchid.teamB
                            );
                            return (
                              <tr key={cp._id}>
                                <td>
                                  {isFavorite(cp).isfav && isFavorite(cp).team === cp.matchid.teamA ?
                                  <><span className="doublescore">{Ateamaname.name}</span> - {Bteamaname.name}</> : 
                                  isFavorite(cp).isfav && isFavorite(cp).team === cp.matchid.teamB ? 
                                    <>{Ateamaname.name} - <span className="doublescore">{Bteamaname.name}</span></> :
                                    <>{Ateamaname.name} - {Bteamaname.name}</>}
                                    
                                  <span className="matchdateinfo">
                                    {cp.matchid.active === 0
                                      ? "(" +
                                        moment(cp.matchid.date).format(
                                          "MMM Do, ddd HH:mm"
                                        ) +
                                        ")"
                                      : ""}
                                  </span>
                                </td>
                                <td className="text-center">
                                  {matchStatus(cp)}
                                </td>
                                <td className="text-center">
                                  {cp.outcome} / {cp.odds}
                                </td>
                                <td className="text-center">
                                  <NumberFormat value={cp.bet} 
                                    displayType={'text'} thousandSeparator={true} renderText={value => value} />
                                </td>
                                <td className={typeof cp.success === "undefined" ? "text-center" : (cp.success ? "text-center":"text-center linethrough")}>
                                  <NumberFormat value={resultCalc(cp)} 
                                    displayType={'text'} thousandSeparator={true} renderText={value => value} /> 
                                </td>
                                <td className="text-center">
                                  {typeof cp.success !== "undefined" && cp.success === false ? 
                                      <span data-tip="Vesztes szelvény" className="failicon">{faFrownicon}</span> 
                                      : 
                                      ""
                                  }
                                  {typeof cp.success !== "undefined" && cp.success === true ? (
                                    <i data-tip="Nyertes szelvény" className="tim-icons icon-money-coins successtext"></i>
                                  ) : 
                                    ""
                                  }
                                  {cp.matchid.active === 1 ? (<span data-tip="Jelenleg zajlik a mérkőzés" className="footballicon">{footballicon}</span>) : ""}

                                  {typeof cp.success === "undefined" && cp.matchid.active === 2 ? (
                                    <><Tooltip title="Feldolgozás alatt..."><span className="processing">{faCogsicon}</span></Tooltip></>
                                  ) : 
                                    ""
                                  }
                                  <ReactTooltip />
                                </td>
                                <td className="text-center">
                                  {cp.matchid.active === 0 ? (
                                    <button
                                      type="button"
                                      title="szelvény törlés"
                                      className="btn btn-link"
                                      onClick={() => {
                                        opeconfirm(cp);
                                      }}
                                    >
                                      <i className="tim-icons icon-simple-remove"></i>
                                    </button>
                                  ) : null}
                                </td>
                              </tr>
                            );
                          })
                        : <tr><td colSpan="7">Még nincsenek szelvényeid</td></tr>}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
        <ScorePointer />
      </>
    );
  } else {
    // Mobile
    return (
      <>
        <div className="content mybetsmobile">
        <h3>Szelvényeim</h3>
          {coupons.length > 0 && teams.length > 0
            ? coupons.map(cp => {
                if (!categoryFilter(cp)) {
                  return null;
                }
                let Ateamaname = teams.find(t => t._id === cp.matchid.teamA);
                let Bteamaname = teams.find(t => t._id === cp.matchid.teamB);
                return (
                  <Card key={cp._id} className={classes.card}>
                    {cp.success === true ? (
                      <span className={classes.infospansucc}>NYERT</span>
                    ) : cp.success === false ? (
                      <span className={classes.infospanfail}>VESZTETT</span>
                    ) : (
                      ""
                    )}
                    {cp.matchid.active === 0
                      ? (<span className={classes.infospantime}>{moment(cp.matchid.date).format("MMM Do, ddd HH:mm")}</span>)
                      : ""}
                    {cp.matchid.active === 1
                      ? (<span className={classes.runningmatch}>{footballicon} Tart a mérkőzés...</span>)
                      : ""}
                    {typeof cp.success === "undefined" && cp.matchid.active === 2 ? (
                          <span className={classes.infospanproc}>{faCogsicon} Feldolozás alatt...</span>
                      ) : 
                        ""
                      }
                    <CardContent className={classes.cardcontent}>
                      <div>
                        <Row>
                          <Col xs="10">
                            <Typography
                              variant="overline"
                              display="block"
                              gutterBottom
                            >
                              {Ateamaname.name} - {Bteamaname.name}
                            </Typography>
                          </Col>
                        </Row>
                        <Row className={classes.cprow}>
                          <Col xs="5">Eredmény:</Col>
                          <Col xs="7">{matchStatus(cp)}</Col>
                        </Row>
                        <Row className={classes.cprow}>
                          <Col xs="5">TIPP/ODDS:</Col>
                          <Col xs="7">
                            {cp.outcome} / {cp.odds}
                          </Col>
                        </Row>
                        <Row className={classes.cprow}>
                          <Col xs="5">TÉT:</Col>
                          <Col xs="7">{cp.bet} pont</Col>
                        </Row>
                        {isFavorite(cp).isfav ? 
                          <Row className={classes.cprow}>
                            <Col xs="12">+ kedvenc csapat szorzó (x{AppConfig.favorite_odds})</Col>
                          </Row>
                        : null
                        }
                        
                        <hr className={classes.hr} />
                        <Row className={classes.cprowbig}>
                          <Col xs="5">NYEREMÉNY:</Col>
                          <Col xs="7">
                            <span className={typeof cp.success === "undefined" ? "text-center" : (cp.success ? "text-center":"text-center linethrough")}>
                            <NumberFormat value={resultCalc(cp)} 
                            displayType={'text'} thousandSeparator={true} renderText={value => <>{value} pont </>} />
                            </span>
                          </Col>
                        </Row>
                      </div>
                    </CardContent>
                    <CardActions className={classes.cardaction}>
                      {cp.matchid.active === 0 ? (
                        <Fab
                          aria-label="delete"
                          className={classes.fab}
                          onClick={() => {
                            opeconfirm(cp);
                          }}
                        >
                          <DeleteIcon />
                        </Fab>
                      ) : null}
                    </CardActions>
                  </Card>
                );
              })
            : <p>Még nincsenek szelvényeid</p>}
        </div>
        <ScorePointer />
      </>
    );
  }
};

export default MyBets;
