import React, { useState, useEffect, useContext } from "react";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert"; // Import
import withWidth, { isWidthUp, isWidthDown } from '@material-ui/core/withWidth';
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFrown } from "@fortawesome/free-solid-svg-icons";
import { faCogs } from "@fortawesome/free-solid-svg-icons";
import { faFutbol } from "@fortawesome/free-solid-svg-icons";
import Fab from "@material-ui/core/Fab";
import ReactTooltip from "react-tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from "@material-ui/core/Tooltip";
import routes from "../routes";

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
import { AppConfig } from "../application.config";
import { SharedContext } from "../context/SharedContect";

const faFrownicon = <FontAwesomeIcon icon={faFrown} />;
const faCogsicon = <FontAwesomeIcon icon={faCogs} />;
const footballicon = <FontAwesomeIcon icon={faFutbol} />;

const useStyles = makeStyles({
  card: {
    minWidth: 275
  },
  fab: {
    width: 35,
    height: 35
  },
  deletefab:{
    position: "absolute",
    bottom: "25px",
    right: "15px",
    width: 35,
    height: 35
  },
  modfab: {
    right: "60px",
    position: "absolute",
    bottom: "25px",
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
  },
  moreinfoformatch:{
    "&:hover":{
      cursor: "pointer"
    },
    color: "#31f59be0",
    fontSize: "0.7em"
  }
});

const MyBets = (props) => {
  const runningmatchlink = routes.filter(x => x.id === "merkozes");
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));
  const currentUser = useContext(AuthenticationContext);
  const sharedcontext = useContext(SharedContext);
  const [filter, setFilter] = useState("all");
  const [coupons, setCoupons] = useState([]);

  const delCoupon = async coupon => {
    try {
      await deleteCoupon(coupon);
      const newlist = coupons.filter(c => c._id !== coupon._id);
      currentUser.setUserinfo({
        ...currentUser.userinfo,
        score: currentUser.userinfo.score + coupon.bet
      });
      sharedcontext.setUsercoupons([...newlist])
      setCoupons(newlist);
    } catch (err) {
      console.log("Hiba történt a törlés során", err);
    }
  };

  const Bettingmodalopen = (match,mode,coupon=null) => {
    sharedcontext.betmodal_setmode(mode)
    if(coupon !== null){
      // If we are in edit mode we have to pass the user coupon 
      sharedcontext.betmodal_setcoupon(coupon)
    }
    sharedcontext.betmodal_setmatch(match);
    sharedcontext.betmodal_toggle();
    
  };

  const resultCalc = coupon => {
    if (
      typeof coupon.success !== "undefined" &&
      coupon.success &&
      (coupon.matchid.teamA === currentUser.userinfo.teamid ||
        coupon.matchid.teamB === currentUser.userinfo.teamid)
    ) {
      const res = (coupon.bet * coupon.odds - coupon.bet) * 2;
      return Math.round(res * 100) / 100;
    } else {
      const res = coupon.bet * coupon.odds - coupon.bet;
      return Math.round(res * 100) / 100;
    }
  };

  const isFavorite = coupon => {
    var returnobj = {
      isfav: false,
      team: ""
    };
    if (
      coupon.status === 2 &&
      coupon.success &&
      coupon.matchid.teamA === currentUser.userinfo.teamid
    ) {
      returnobj.isfav = true;
      returnobj.team = coupon.matchid.teamA;
    } else if (
      coupon.status === 2 &&
      coupon.success &&
      coupon.matchid.teamB === currentUser.userinfo.teamid
    ) {
      returnobj.isfav = true;
      returnobj.team = coupon.matchid.teamB;
    } else {
      returnobj.isfav = false;
    }

    return returnobj;
  };

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
      let res = resultPromise.data;
      let coupon_run = res.filter((x,y)=>x.status === 0)
      coupon_run.sort((x, y) => new Date(x.matchid.date) - new Date(y.matchid.date))
      let coupon_other = res.filter((x,y)=>x.status > 0)
      coupon_other.sort((x, y) => new Date(y.matchid.date) - new Date(x.matchid.date));
      //res.sort((x, y) => new Date(y.matchid.date) - new Date(x.matchid.date));
      const allc = [...coupon_run, ...coupon_other];
      setCoupons(allc);
    };

    loadCoupons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const categoryFilter = cp => {
    let filtered = cp;
    switch (filter) {
      case "won":
        filtered = cp.status === 2 && cp.success === true;
        break;
      case "lost":
        filtered = cp.status === 2 && cp.success === false;
        break;
      case "depend":
        filtered =
          cp.matchid.active === 0 || cp.matchid.active === 1 || cp.status === 0;
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
        if (
          typeof match.matchid.goalA !== "undefined" &&
          typeof match.matchid.goalB !== "undefined"
        ) {
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
                    <Col className="text-left" sm="6"></Col>
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
                            active: filter === "depend"
                          })}
                          color="info"
                          id="0"
                          size="sm"
                          onClick={() => setFilter("depend")}
                        >
                          <input
                            defaultChecked
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Függőben
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
                      {coupons.length > 0 ? (
                        coupons.map(cp => {
                          if (!categoryFilter(cp)) {
                            return null;
                          }
                          const isAlreadyBetting = sharedcontext.usercoupons.find(x=>x.matchid._id.toString() === cp.matchid._id.toString());
                          const clonematch = {...cp}
                          clonematch.matchid.teamA = isAlreadyBetting.teamA; 
                          clonematch.matchid.teamB = isAlreadyBetting.teamB;
                          return (
                            <tr key={cp._id}>
                              <td>
                                {isFavorite(cp).isfav &&
                                isFavorite(cp).team === cp.matchid.teamA ? (
                                  <>
                                    <span className="doublescore">
                                      {cp.teamA.name}
                                    </span>{" "}
                                    - {cp.teamB.name}
                                  </>
                                ) : isFavorite(cp).isfav &&
                                  isFavorite(cp).team === cp.matchid.teamB ? (
                                  <>
                                    {cp.teamA.name} -{" "}
                                    <span className="doublescore">
                                      {cp.teamB.name}
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    {cp.teamA.name} - {cp.teamB.name}
                                  </>
                                )}

                                <span className="matchdateinfo">
                                  {cp.matchid.active === 0 || cp.matchid.active === 1 || cp.matchid.active === 2
                                    ? "(" +
                                      moment(cp.matchid.date).format(
                                        "MMM Do, ddd HH:mm"
                                      ) +
                                      ")"
                                    : ""}
                                </span>
                                {cp.matchid.active === 1 || cp.matchid.active === 2 ? 
                                  <Link className={classes.moreinfoformatch} to={runningmatchlink[0].path + "/" + cp.matchid._id}>Ki mire fogadott?</Link>
                                : null}
                              </td>
                              <td className="text-center">{matchStatus(cp)}</td>
                              <td className="text-center">
                                {cp.outcome} / {cp.odds}
                              </td>
                              <td className="text-center">
                                <NumberFormat
                                  value={cp.bet}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  renderText={value => value}
                                />
                              </td>
                              <td
                                className={
                                  cp.status === 0 ||
                                  (cp.status > 0 && cp.success)
                                    ? "text-center"
                                    : "text-center linethrough"
                                }
                              >
                                <NumberFormat
                                  value={resultCalc(cp)}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  renderText={value => value}
                                />
                              </td>
                              <td className="text-center">
                                {cp.status === 2 && cp.success === false ? (
                                  <span
                                    data-tip="Vesztes szelvény"
                                    className="failicon"
                                  >
                                    {faFrownicon}
                                  </span>
                                ) : (
                                  ""
                                )}
                                {cp.status === 2 && cp.success === true ? (
                                  <i
                                    data-tip="Nyertes szelvény"
                                    className="tim-icons icon-money-coins successtext"
                                  ></i>
                                ) : (
                                  ""
                                )}
                                {cp.matchid.active === 1 ? (
                                  <span
                                    data-tip="Jelenleg zajlik a mérkőzés"
                                    className="footballicon"
                                  >
                                    {footballicon}
                                  </span>
                                ) : (
                                  ""
                                )}

                                {cp.status === 1 ? (
                                  <>
                                    <Tooltip title="Feldolgozás alatt...">
                                      <span className="processing">
                                        {faCogsicon}
                                      </span>
                                    </Tooltip>
                                  </>
                                ) : (
                                  ""
                                )}
                                <ReactTooltip />
                              </td>
                              <td className="text-center">
                                {cp.matchid.active === 0 && cp.status === 0 ? (
                                  <>
                                    <button
                                    type="button"
                                    title="szelvény módosítása"
                                    className="btn btn-link"
                                    onClick={() => {
                                      Bettingmodalopen(clonematch.matchid,"edit",cp)
                                    }}
                                    >
                                      <i className="tim-icons icon-pencil"></i>
                                    </button>
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
                                  </>
                                ) : null}
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan="7">Még nincsenek szelvényeid</td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
        
      </>
    );
  } else {
    // Mobile
    return (
      <>
        <div className="content mybetsmobile">
          <Row className="mobileFilter">
            <Col xs="12">
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
                  <input className="d-none" name="options" type="radio" />
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
                    active: filter === "depend"
                  })}
                  color="info"
                  id="0"
                  size="sm"
                  onClick={() => setFilter("depend")}
                >
                  <input
                    defaultChecked
                    className="d-none"
                    name="options"
                    type="radio"
                  />
                  <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                    Függőben
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
                  <input className="d-none" name="options" type="radio" />
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
          {coupons.length > 0 ? (
            coupons.map(cp => {
              const isAlreadyBetting = sharedcontext.usercoupons.find(x=>x.matchid._id.toString() === cp.matchid._id.toString());
              const clonematch = {...cp}
              clonematch.matchid.teamA = isAlreadyBetting.teamA; 
              clonematch.matchid.teamB = isAlreadyBetting.teamB;
              if (!categoryFilter(cp)) {
                return null;
              }
              return (
                <Card key={cp._id} className={classes.card}>
                  {cp.status === 2 && cp.success === true ? (
                    <span className={classes.infospansucc}>NYERT</span>
                  ) : cp.status === 2 && cp.success === false ? (
                    <span className={classes.infospanfail}>VESZTETT</span>
                  ) : (
                    ""
                  )}
                  {cp.matchid.active === 0 ? (
                    <span className={classes.infospantime}>
                      {moment(cp.matchid.date).format("MMM Do, ddd HH:mm")}
                    </span>
                  ) : (
                    ""
                  )}
                  {cp.matchid.active === 1 ? (
                    <span className={classes.runningmatch}>
                      {footballicon} Tart a mérkőzés...
                    </span>
                  ) : (
                    ""
                  )}
                  {cp.status === 1 ? (
                    <span className={classes.infospanproc}>
                      {faCogsicon} Feldolozás alatt...
                    </span>
                  ) : (
                    ""
                  )}
                  <CardContent className={classes.cardcontent}>
                    <div>
                      <Row>
                        <Col xs="10">
                          <Typography
                            variant="overline"
                            display="block"
                            gutterBottom
                          >
                            {cp.teamA.name} - {cp.teamB.name}
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
                      {cp.matchid.active === 1 || cp.matchid.active === 2 ? 
                      <Row className={classes.cprow}>
                        <Col xs="12">
                          <Link className={classes.moreinfoformatch} to={runningmatchlink[0].path + "/" + cp.matchid._id}>Ki mire fogadott?</Link>
                        </Col>
                      </Row> : null}
                      {isFavorite(cp).isfav ? (
                        <Row className={classes.cprow}>
                          <Col xs="12">
                            + kedvenc csapat szorzó (x{AppConfig.favorite_odds})
                          </Col>
                        </Row>
                      ) : null}

                      <hr className={classes.hr} />
                      <Row className={classes.cprowbig}>
                        <Col xs="5">NYEREMÉNY:</Col>
                        <Col xs="7">
                          <span
                            className={
                              cp.status === 0 || (cp.status > 0 && cp.success)
                                ? "text-center"
                                : "text-center linethrough"
                            }
                          >
                            <NumberFormat
                              value={resultCalc(cp)}
                              displayType={"text"}
                              thousandSeparator={true}
                              renderText={value => <>{value} pont </>}
                            />
                          </span>
                        </Col>
                      </Row>
                    </div>
                  </CardContent>
                  <CardActions className={classes.cardaction}>
                    {cp.matchid.active === 0 && cp.status === 0 ? (
                      <>
                      <Fab
                        aria-label="delete"
                        className={classes.deletefab}
                        onClick={() => {
                          opeconfirm(cp);
                        }}
                      >
                        <DeleteIcon />
                      </Fab>
                      <Fab
                      aria-label="modify"
                      className={classes.modfab}
                      onClick={() => {
                        Bettingmodalopen(clonematch.matchid,"edit",cp)
                      }}
                    >
                      <EditIcon />
                    </Fab>
                    </>
                    ) : null}
                  </CardActions>
                </Card>
              );
            })
          ) : (
            <Card><CardContent><div><Row className="jc-c"><p className="m0">Még nincsenek szelvényeid</p></Row></div></CardContent></Card>
          )}
        </div>
      </>
    );
  }
};

export default withWidth()(MyBets);
