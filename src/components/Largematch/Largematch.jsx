import React from "react";
import {connect} from 'react-redux';
import * as ModalActions from "../../store/actions/modals";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";

// Amit kapunk a store-ból
const mapStateToProps = (state, match) => {
    return {
      bettingmodal: state.Modals.value
    }
  }
  
  // Amit beküldünk a store-ba (mapDispatchToProps)
  const mapDispatchToProps = dispatch => {
    return {
      openModal: (match) => dispatch(ModalActions.BettingModalAction(true,match))
    };
  };

class Largematch extends React.Component {

  render() {
    return (
      <Card className="card-chart">
        <CardHeader>
          <CardTitle className="text-center" tag="h3">
            Magyarország - Franciaország
            <br />
            <span className="timeintitle">17:00</span>
          </CardTitle>
        </CardHeader>
        <CardBody style={{ paddingLeft: "25px", paddingRight: "25px" }}>
          <Row>
            <Col xs="4">
              <Card className="oddscard cardblue">
                <CardBody onClick={() => this.props.openModal({betvalue:23})} className="text-center" style={{ padding: "6px" }}>
                  <p style={{ letterSpacing: "3px", fontSize: "16px" }}>1.2</p>
                </CardBody>
              </Card>
            </Col>
            <Col xs="4">
              <Card className="oddscard cardblue">
                <CardBody onClick={() => this.props.openModal({betvalue:13})} className="text-center" style={{ padding: "6px" }}>
                  <p style={{ letterSpacing: "3px", fontSize: "16px" }}>2.4</p>
                </CardBody>
              </Card>
            </Col>
            <Col xs="4">
              <Card className="oddscard cardblue">
                <CardBody onClick={() => this.props.openModal({betvalue:1.3})} className="text-center" style={{ padding: "6px" }}>
                  <p style={{ letterSpacing: "3px", fontSize: "16px" }}>1.0</p>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Largematch);
