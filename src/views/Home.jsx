import React, { useState, useEffect } from "react";
import Matchtable from "../components/Matchtable/Matchtable";
import MatchtableMobile from "../components/Matchtable/MatchtableMobile";
// reactstrap components
import {
  Row,
  Col
} from "reactstrap";
import { getMatches } from "../_service/api-public-func";

const Home = () => {
  const [matchlist, setMatchlist] = useState([]);
  useEffect(() => {
    const loadMatches = async () => {
      const resultPromise = await getMatches("?active=0");
      setMatchlist(resultPromise.data);
    };

    loadMatches();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

    return (
      <>
        <div className="content">
          <h3>Legközelebbi mérkőzések</h3>
          <Row>
            <Col lg="12" md="12">
              {
                matchlist.length > 0 ? <Matchtable list={matchlist} /> : <p>Mérkőzések betöltése....</p>
              }
              
            </Col>
          </Row>
          <h3>Lejátszott mérkőzések</h3>
          <Row>
            <Col lg="12">
              <MatchtableMobile />
            </Col>
          </Row>
        </div>
      </>
    );
  
}

export default Home;
