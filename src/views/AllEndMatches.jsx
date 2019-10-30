import React, { useState, useEffect } from "react";
import MatchtableMobile from "../components/Matchtable/MatchtableMobile";
import { Row, Col, Card, CardBody } from "reactstrap";
import { getMatches } from "../_service/api-public-func";

const AllEndMatches = () => {
  const [endmatchlist, setEndMatchlist] = useState([0]);
  const [endmatchlistReq, setendmatchlistReq] = useState(true);

  useEffect(() => {
    const loadMatches = async () => {
      const resultPromise = await getMatches("?active=2");
      if (resultPromise.message !== "Network Error" && resultPromise.data) {
        resultPromise.data.sort((x, y) => new Date(y.date) - new Date(x.date));
        setEndMatchlist(resultPromise.data);
        setendmatchlistReq(true);
      } else {
        setendmatchlistReq(false);
      }
    };
    loadMatches();
  }, []);

  return (
    <>
      <div className="content">
        <Row>
          <Col lg="12">
            {endmatchlist[0] !== 0 ? (
              endmatchlist.length === 0 ? (
                <div className="content">
                  <Row>
                    <Col md="12">
                      <Card>
                        <CardBody>
                          <p>
                            Még nem játszottak le egyetlen egy mérkőzást sem
                          </p>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </div>
              ) : (
                <MatchtableMobile
                  list={endmatchlist}
                  title="Lejátszott mérkőzések"
                />
              )
            ) : endmatchlistReq ? (
              <p>Mérkőzések betöltése....</p>
            ) : (
              <p>Szerver hiba. Kérlek próbálkozz később.</p>
            )}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AllEndMatches;
