import React, {useEffect, useState, useContext} from "react";
import moment from 'moment';
import { Card, Row, Col, CardBody } from "reactstrap";
import { getCouponsByUserId } from "../../_service/api-func";
import { AuthenticationContext } from "../../context/AuthenticationContext";
import { MatchTypes } from "../../application.config";

const MatchtableMobile = ({ list }) => {
  const currentUser = useContext(AuthenticationContext);
  const [coupons, setCoupons] = useState([])

  useEffect(() => {
    const loadCoupons = async () => {
      const resultPromise = await getCouponsByUserId(currentUser.user.sub);
      setCoupons(resultPromise.data);
    };

    loadCoupons();
    // TODO: CLEANUP!!!!

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card>
      <CardBody>
        <Row className="theadrow">
          <Col xs="6">
            <p className="mb0">Mérkőzés</p>
          </Col>
          <Col xs="6">
            <Row>
              <Col className="text-center" xs="4">
                <p className="mb0">1</p>
              </Col>
              <Col className="text-center" xs="4">
                <p className="mb0">X</p>
              </Col>
              <Col className="text-center" xs="4">
                <p className="mb0">2</p>
              </Col>
            </Row>
          </Col>
        </Row>
        {list.length > 0
          ? list.map(m => {
              let mybet = coupons.filter(c=>c.matchid._id === m._id)
              return (
                <Row key={m._id} style={{ padding: "7px", borderBottom: "1px solid #0000003d" }} className="tablesorter">
                  <Col xs="6">
                    <Row>
                      <Col xs="9">
                        <p>{m.teamA.name}</p>
                      </Col>
                      <Col xs="3">
                        <p>{m.goalA}</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="9">
                        <p>{m.teamB.name}</p>
                      </Col>
                      <Col xs="3">
                        <p>{m.goalB}</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12">
                        <p className="datetime">{!isNaN(m.type) ? MatchTypes[parseInt(m.type)] : ""}{typeof m.comment !== "undefined" ? " | "+m.comment : ""}</p>
                      </Col>
                    </Row>
                  </Col>
                  <Col xs="6">
                    <Row>
                      <Col
                        className="d-flex justify-content-center align-items-center"
                        style={{
                          height: "50px",
                          borderRight: "1px solid rgba(134, 134, 148, 0.3)"
                        }}
                        xs="4"
                      >
                        <span className={m.outcome === "1" ? "colorwhite" : ""}>{m.oddsAwin}</span>
                        <span className={mybet.length > 0 ? (mybet[0].outcome === "1" ? "mytippspan" : "hidden") : "hidden"}>Tipped</span>
                      </Col>
                      <Col
                        className="d-flex justify-content-center align-items-center"
                        style={{
                          height: "50px",
                          borderRight: "1px solid rgba(134, 134, 148, 0.3)"
                        }}
                        xs="4"
                      >
                        <span className={m.outcome === "x" ? "colorwhite" : ""}>{m.oddsDraw}</span>
                        <span className={mybet.length > 0 ? (mybet[0].outcome === "x" ? "mytippspan" : "hidden") : "hidden"}>Tipped</span>
                      </Col>
                      <Col
                        className="d-flex justify-content-center align-items-center"
                        style={{ height: "50px" }}
                        xs="4"
                      >
                        <span className={m.outcome === "2" ? "colorwhite" : ""}>{m.oddsBwin}</span>
                        <span className={mybet.length > 0 ? (mybet[0].outcome === "2" ? "mytippspan" : "hidden") : "hidden"}>Tipped</span>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              );
            })
          : null}
      </CardBody>
    </Card>
  );
};

export default MatchtableMobile;
