import React from "react";
import classNames from "classnames";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Button,
  ButtonGroup,
  Col
} from "reactstrap";

class MyBets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: "won"
    };
  }
  setFilter = name => {
    this.setState({
      filter: name
    });
  };
  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <Row>
                    <Col className="text-left" sm="6">
                      <CardTitle tag="h2">Fogadásaim</CardTitle>
                    </Col>
                    <Col sm="6">
                      <ButtonGroup
                        className="btn-group-toggle float-right"
                        data-toggle="buttons"
                      >
                        <Button
                          tag="label"
                          className={classNames("btn-simple", {
                            active: this.state.filter === "won"
                          })}
                          color="info"
                          id="0"
                          size="sm"
                          onClick={() => this.setFilter("won")}
                        >
                          <input
                            defaultChecked
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Nyertes szelvények
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-trophy" />
                          </span>
                        </Button>
                        <Button
                          color="info"
                          id="1"
                          size="sm"
                          tag="label"
                          className={classNames("btn-simple", {
                            active: this.state.filter === "lost"
                          })}
                          onClick={() => this.setFilter("lost")}
                        >
                          <input
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Vesztes szelvények
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-simple-remove" />
                          </span>
                        </Button>
                        <Button
                          color="info"
                          id="2"
                          size="sm"
                          tag="label"
                          className={classNames("btn-simple", {
                            active: this.state.filter === "all"
                          })}
                          onClick={() => this.setFilter("all")}
                        >
                          <input
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Összes
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-bullet-list-67" />
                          </span>
                        </Button>
                      </ButtonGroup>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter mybettable" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Mérkőzés</th>
                        <th className="text-center">Eredmény</th>
                        <th className="text-center">Tipp/Odds</th>
                        <th className="text-center">Tét</th>
                        <th className="text-center">Nyeremény</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Magyarország - Franciaország</td>
                        <td className="text-center">1-4</td>
                        <td className="text-center">1 / 1.2</td>
                        <td className="text-center">2000</td>
                        <td className="text-center">{2000 * 1.2}</td>
                      </tr>
                      <tr>
                        <td>Brazília - Svájc</td>
                        <td className="text-center">3-0</td>
                        <td className="text-center">1 / 12.2</td>
                        <td className="text-center">1000</td>
                        <td className="text-center">{1000 * 12.2}</td>
                      </tr>
                      <tr>
                        <td>USA - Kína</td>
                        <td className="text-center">2-2</td>
                        <td className="text-center">2 / 3.2</td>
                        <td className="text-center">2000</td>
                        <td className="text-center">0</td>
                      </tr>
                      <tr>
                        <td>Magyarország - Franciaország</td>
                        <td className="text-center">1-4</td>
                        <td className="text-center">1/1.2</td>
                        <td className="text-center">2000</td>
                        <td className="text-center">{2000 * 1.2}</td>
                      </tr>
                      <tr>
                        <td>Magyarország - Franciaország</td>
                        <td className="text-center">1-4</td>
                        <td className="text-center">1/1.2</td>
                        <td className="text-center">2000</td>
                        <td className="text-center">{2000 * 1.2}</td>
                      </tr>
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default MyBets;
