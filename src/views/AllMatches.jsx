import React, {useState,useEffect} from "react";
import Matchtable from "../components/Matchtable/Matchtable";
import {
  Row,
  Col
} from "reactstrap";
import { getMatches } from "../_service/api-public-func";
import ScorePointer from "../components/ScorePointer/ScorePointer";

const AllMatches = () => {
    const [matchlist, setMatchlist] = useState([0]);
    const [matchlistReq, setmatchlistReq] = useState(true);
    
    useEffect(() => {
      const loadMatches = async () => {
        const resultPromise = await getMatches("?active=0");
        if (resultPromise.message !== "Network Error" && resultPromise.data) {
          setMatchlist(resultPromise.data);
          setmatchlistReq(true);
        } else {
          setmatchlistReq(false);
        }
      };
      loadMatches()
    }, [])

    return (
      <>
      <div className="content">
      <h3>Hátralévő mérkőzések</h3>
        <Row>
          <Col lg="12" md="12">
            {matchlist[0] !== 0 ? (
              matchlist.length === 0 ? (
                "Nincs több mérkőzés"
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
        <ScorePointer />
      </div>
    </>
    );
  
}

export default AllMatches;
