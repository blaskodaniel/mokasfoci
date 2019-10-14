import React, { useState, useEffect } from "react";
import uuidv1 from "uuid/v1";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col
} from "reactstrap";
import Typography from '@material-ui/core/Typography';
import { userbets } from "../_service/api-func";

const CurrentMatchInfo = ({ match }) => {
  const [players, setPlayers] = useState([]);
  const [isProgress, setIsProgress] = useState(true);
  const [teamA, setTeamA] = useState({});
  const [teamB, setTeamB] = useState({});
  const [matchinfo, setMatchinfo] = useState({});

  const loadlist = async () => {
    const resultPromise = await userbets(match.params.matchid);
    setPlayers(resultPromise.data.coupons);
    setIsProgress(false);
    setTeamA(resultPromise.data.teaminfo.teamA);
    setTeamB(resultPromise.data.teaminfo.teamB);
    setMatchinfo(resultPromise.data.matchinfo);
  };

  useEffect(() => {
    loadlist();
    // TODO: CLEANUP!!!!
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isFavoriteBetting = cp => {
    var result = {};
    result.is = false;
    result.team = null
    if (cp.outcome !== "x") {
      if (
        cp.outcome === "1" &&
        typeof cp.userid.teamid !== "undefined" &&
        cp.userid.teamid === cp.matchid.teamA
      ) {
        result.is = true;
        result.team = teamA
      }
      if (
        cp.outcome === "2" &&
        typeof cp.userid.teamid !== "undefined" &&
        cp.userid.teamid === cp.matchid.teamB
      ) {
        result.is = true;
        result.team = teamB
      }
    }
    return result;
  };

  return (
    <>
      <div className="content currentmatch">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <CardTitle tag="h3">
                      {teamA.name} - {teamB.name}
                    </CardTitle>
                    <Typography variant="body2" color="textPrimary" className="odds">
                      Odds: {matchinfo.oddsAwin} {" / "}{matchinfo.oddsDraw} {" / "}{matchinfo.oddsBwin}
                    </Typography>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter currentmatchtable" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Név</th>
                      <th className="text-center">Tipp</th>
                      <th className="text-center">Feltett pont</th>
                      <th className="text-center">Nyeremény</th>
                      <th className="text-center">Nettó nyeremény</th>
                    </tr>
                  </thead>
                  <tbody>
                    {players.length > 0 && !isProgress
                      ? players.map(cp => {
                          return (
                            <tr key={uuidv1()}>
                              <td>
                              {cp.userid.name}
                              {isFavoriteBetting(cp).is
                                  ? <><br /><span className="favoriteteamspan">(kedvenc csapat)</span></>
                                  : ""}
                              </td>
                              <td className="text-center">{cp.outcome}</td>
                              <td className="text-center">{cp.bet}</td>
                              <td className="text-center">
                                {isFavoriteBetting(cp).is
                                  ? <span>{(cp.bet*cp.odds) * 2}</span>
                                  : (cp.bet*cp.odds)}
                              </td>
                              <td className="text-center">
                                {isFavoriteBetting(cp).is
                                  ? <span>{((cp.bet*cp.odds) * 2)-cp.bet}</span>
                                  : (cp.bet*cp.odds)-cp.bet}
                              </td>
                            </tr>
                          );
                        })
                      : isProgress ? <tr><td colSpan="4">Adatok betöltése....</td></tr> : <tr><td colSpan="4">Erre a mérkőzésre senki nem fogadott</td></tr>}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default CurrentMatchInfo;
