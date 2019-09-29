import React, { useState, useEffect } from "react";
import Matchtable from "../components/Matchtable/Matchtable";
import moment from 'moment'
import MatchtableMobile from "../components/Matchtable/MatchtableMobile";
// reactstrap components
import { Row, Col } from "reactstrap";
import {
  getMatches,
  getMatchesByDay,
  getMatchesFromDay,
  getMatchesFromTo,
  getMatchesToDay
} from "../_service/api-public-func";
import ScorePointer from "../components/ScorePointer/ScorePointer";

const Home = () => {
  const [matchlist, setMatchlist] = useState([0]);
  const [endmatchlist, setEndMatchlist] = useState([0]);
  const [matchlistReq, setmatchlistReq] = useState(true);
  const [endmatchlistReq, setendmatchlistReq] = useState(true);

  useEffect(() => {
    const loadMatches = async () => {
      // const resultPromise = await getMatches("?active=0");
      const resultPromise = await getMatchesByDay(moment().format("YYYY-MM-DD"), 2); // A mai és a holnapi mérkőzések
      //const resultPromise = await getMatchesFromDay();
      //const resultPromise = await getMatchesToDay();
      if (resultPromise.message !== "Network Error" && resultPromise.data) {
        setMatchlist(resultPromise.data);
        setmatchlistReq(true);
      } else {
        setmatchlistReq(false);
      }
    };

    const loadEndMatches = async () => {
      const resultPromise = await getMatchesFromTo(moment().subtract(3, 'days').format("YYYY-MM-DD"),moment().add(1,'days').format("YYYY-MM-DD"));
      if (resultPromise.message !== "Network Error" && resultPromise.data) {
        const onlyNonActive = resultPromise.data.filter(x => x.active === 2);
        onlyNonActive.sort((x, y) => new Date(y.date) - new Date(x.date));
        setEndMatchlist(onlyNonActive);
        setendmatchlistReq(true);
      } else {
        setendmatchlistReq(false);
      }
    };

    loadMatches();
    loadEndMatches();
    // TODO: CLEANUP!!!!

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="content">
        <h3>Legközelebbi mérkőzések</h3>
        <Row>
          <Col lg="12" md="12">
            {matchlist[0] !== 0 ? (
              matchlist.length === 0 ? (
                "A mai napon nincs mérkőzés"
              ) : (
                <Matchtable list={matchlist} />
              )
            ) : matchlistReq ? (
              <p>Mérkőzések betöltése....</p>
            ) : (
              <p>Szerver hiba. Kérlek próbálkozz később.</p>
            )}
          </Col>
        </Row>
        <h3>Nemrégiben lejátszott</h3>
        <Row>
          <Col lg="12">
            {endmatchlist[0] !== 0 ? (
              endmatchlist.length === 0 ? (
                "A mai napon nincs mérkőzés"
              ) : (
                <MatchtableMobile list={endmatchlist} />
              )
            ) : endmatchlistReq ? (
              <p>Mérkőzések betöltése....</p>
            ) : (
              <p>Szerver hiba. Kérlek próbálkozz később.</p>
            )}
          </Col>
        </Row>
      </div>
      <ScorePointer />
    </>
  );
};

export default Home;
