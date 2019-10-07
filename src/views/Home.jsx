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
  const [matchlistReqProgress, setmatchlistReqProgress] = useState(true);
  const [endmatchlistReqProgress, setendmatchlistReqProgress] = useState(true);

  useEffect(() => {
    const loadMatches = async () => {
      // const resultPromise = await getMatches("?active=0");
      const resultPromise = await getMatchesByDay(moment().format("YYYY-MM-DD"), 2); // A mai és a holnapi mérkőzések
      //const resultPromise = await getMatchesFromDay();
      //const resultPromise = await getMatchesToDay();
      if (resultPromise.message !== "Network Error" && typeof resultPromise.data !== "undefined") {
        setMatchlist(resultPromise.data);
      }
      setmatchlistReqProgress(false);
    };

    const loadEndMatches = async () => {
      const resultPromise = await getMatchesFromTo(moment().subtract(3, 'days').format("YYYY-MM-DD"),moment().add(1,'days').format("YYYY-MM-DD"));
      if (resultPromise.message !== "Network Error" && typeof resultPromise.data !== "undefined") {
        const onlyNonActive = resultPromise.data.filter(x => x.active === 2);
        onlyNonActive.sort((x, y) => new Date(y.date) - new Date(x.date));
        setEndMatchlist(onlyNonActive);
      }
      setendmatchlistReqProgress(false);
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
            {matchlistReqProgress ? 
              <p>Mérkőzések betöltése....</p> 
              : 
              matchlist[0] === 0 ? <p>Szerver nem válaszol. Kérlek próbálkozz később.</p> 
                : matchlist.length > 0 ?  <Matchtable list={matchlist} /> :
                <p>Ma és holnap nem lesznek mérkőzések</p>
            }
          </Col>
        </Row>
        <h3>Nemrégiben lejátszott</h3>
        <Row>
          <Col lg="12">
          {endmatchlistReqProgress ? 
              <p>Mérkőzések betöltése....</p> 
              : 
              endmatchlist[0] === 0 ? <p>Szerver nem válaszol. Kérlek próbálkozz később.</p> 
                : endmatchlist.length > 0 ?  <MatchtableMobile list={endmatchlist} /> :
                <p>Nincsenek mérkőzések</p>
            }
          </Col>
        </Row>
      </div>
      <ScorePointer />
    </>
  );
};

export default Home;
