import React, { useState, useEffect, useContext } from "react";
import moment from 'moment'
import withWidth from '@material-ui/core/withWidth';
import Matchtable from "../components/Matchtable/Matchtable";
import MatchtableMobile from "../components/Matchtable/MatchtableMobile";
// reactstrap components
import { Row, Col } from "reactstrap";
import {
  getMatchesByDay,
  getMatchesFromTo,
} from "../_service/api-public-func";
import {
  Card,
  CardBody
} from "reactstrap";
import News from "./News";
import { SharedContext } from '../context/SharedContect';
import Comingsoon from "../components/Comingsoon/Comingsoon";

const Home = () => {
  const sharectx = useContext(SharedContext)
  const [matchlist, setMatchlist] = useState([0]);
  const [endmatchlist, setEndMatchlist] = useState([0]);
  const [matchlistReqProgress, setmatchlistReqProgress] = useState(true);
  const [endmatchlistReqProgress, setendmatchlistReqProgress] = useState(true);

  useEffect(() => {
    const loadMatches = async () => {
      const resultPromise = await getMatchesByDay(moment().format("YYYY-MM-DD"), 2); // A mai és a holnapi mérkőzések
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="content">

        {/* Jelenlegi és közeli mérkőzések listája */}
        <Row>
          <Col className="m-p-8" xs="12">
            {matchlistReqProgress ? 
              <p>Mérkőzések betöltése....</p> 
              : 
              matchlist[0] === 0 ? <p>Szerver nem válaszol. Kérlek próbálkozz később.</p> 
                : matchlist.length > 0 ?  <Matchtable list={matchlist} title="Legközelebbi mérkőzések" /> :
                null
            }
          </Col>
        </Row>

        {/* Best of emberek */}
        <Row>
          <Col className="m-p-8" xs="12">
            <News />
          </Col>
        </Row>

        {/* Nemrég lejátszott mérkőzések */}
        <Row>
          <Col className="m-p-8" xs="12">
          {endmatchlistReqProgress ? 
              <p>Mérkőzések betöltése....</p> 
              : 
              endmatchlist[0] === 0 ? <p>Szerver nem válaszol. Kérlek próbálkozz később.</p> 
                : endmatchlist.length > 0 ?  <MatchtableMobile list={endmatchlist} title="Nemrégiben lejátszott" /> :
                null
            }
          </Col>
        </Row>

        {/* Ha még nincs semmi */}
        {endmatchlist.length === 0 && matchlist.length === 0 ? 
        <Row>
          <Col md="12">
            <Card>
              <CardBody>
                <Comingsoon startdate={sharectx.settings.gamestart} />
              </CardBody>
            </Card>
          </Col>
        </Row>
        : null }
      </div>
    </>
  );
};

export default withWidth()(Home);
