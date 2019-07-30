import React from "react";
import { connect } from 'react-redux'; 
import Largematch from "../components/Largematch/Largematch";
import Matchtable from "../components/Matchtable/Matchtable";
import MatchtableMobile from "../components/Matchtable/MatchtableMobile";
// reactstrap components
import {
  Row,
  Col
} from "reactstrap";

// Amit kapunk a store-ból
const mapStateToProps = (state, match) => {
  return {
    bettingmodal: state.Modals.value
  }
}

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedmatch: {}
    };
  }

  betting = match => {
    this.setState({
      selectedmatch: match
    });
  };

  render() {
    return (
      <>
        <div className="content">
          <h2>Mai mérkőzések</h2>
          <Row>
            <Col lg="4">
              <Largematch />
            </Col>
            <Col lg="4">
              <Largematch />
            </Col>
            <Col lg="4">
              <Largematch />
            </Col>
          </Row>
          <h2>További mérkőzések</h2>
          <Row>
            <Col lg="12" md="12">
              <Matchtable />
            </Col>
          </Row>
          <h2>Mobil nézet</h2>
          <Row>
            <Col lg="12">
              <MatchtableMobile />
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps)(Home);
