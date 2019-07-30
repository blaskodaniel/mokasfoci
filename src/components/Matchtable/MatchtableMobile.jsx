import React from "react";
import { Card, Row, Col, CardBody } from "reactstrap";

class MatchtableMobile extends React.Component {
  render() {
    return (
      <Card>
        <CardBody>
          <Row className="theadrow">
            <Col xs="6">
              <p>Mérkőzés</p>
            </Col>
            <Col xs="6">
              <Row>
                <Col className="text-center" xs="4">
                  <p>1</p>
                </Col>
                <Col className="text-center" xs="4">
                  <p>X</p>
                </Col>
                <Col className="text-center" xs="4">
                  <p>2</p>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row style={{ padding: "7px" }}>
            <Col xs="6">
              <Row>
                <Col xs="9">
                  <p>Argentína</p>
                </Col>
                <Col xs="3">
                  <p>0</p>
                </Col>
              </Row>
              <Row>
                <Col xs="9">
                  <p>Lengyelország</p>
                </Col>
                <Col xs="3">
                  <p>0</p>
                </Col>
              </Row>
              <Row>
                <Col xs="12">
                  <p className="datetime">Július 12. 14:00</p>
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
                  <span>1.33</span>
                </Col>
                <Col
                  className="d-flex justify-content-center align-items-center"
                  style={{
                    height: "50px",
                    borderRight: "1px solid rgba(134, 134, 148, 0.3)"
                  }}
                  xs="4"
                >
                  <span>3.75</span>
                </Col>
                <Col
                  className="d-flex justify-content-center align-items-center"
                  style={{ height: "50px" }}
                  xs="4"
                >
                  <span>9.00</span>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row style={{ padding: "7px" }}>
            <Col xs="6">
              <Row>
                <Col xs="9">
                  <p>Argentína</p>
                </Col>
                <Col xs="3">
                  <p>0</p>
                </Col>
              </Row>
              <Row>
                <Col xs="9">
                  <p>Lengyelország</p>
                </Col>
                <Col xs="3">
                  <p>0</p>
                </Col>
              </Row>
              <Row>
                <Col xs="12">
                  <p className="datetime">Július 12. 14:00</p>
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
                  <span>1.33</span>
                </Col>
                <Col
                  className="d-flex justify-content-center align-items-center"
                  style={{
                    height: "50px",
                    borderRight: "1px solid rgba(134, 134, 148, 0.3)"
                  }}
                  xs="4"
                >
                  <span>3.75</span>
                </Col>
                <Col
                  className="d-flex justify-content-center align-items-center"
                  style={{ height: "50px" }}
                  xs="4"
                >
                  <span>9.00</span>
                </Col>
              </Row>
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}

export default MatchtableMobile;
