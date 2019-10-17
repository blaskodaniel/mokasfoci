import React, { useState, useEffect, useContext } from "react";
import { Line, Bar } from "react-chartjs-2";
import LineChart from "../components/Charts/LineChart";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import {
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4
} from "variables/charts.jsx";
import { getCouponsByUserId } from "../_service/api-func";
import { AuthenticationContext } from "../context/AuthenticationContext";

const Statistics = () => {
  const currentUser = useContext(AuthenticationContext);
  const [coupons, setCoupons] = useState(null);

  const preProcessing = list => {
    let resultobj = {
      bet: {
        dataset: [],
        xaxis: []
      },
      wins:{
        dataset: [],
        xaxis: []
      }
    };
    list.forEach(x => {
      resultobj.bet.dataset.push(x.bet);
      resultobj.bet.xaxis.push(x.teamA.name + "-" + x.teamB.name);
      if(x.success && x.status === 2){
        resultobj.wins.dataset.push(Math.round((x.bet*x.odds)-x.bet));
        resultobj.wins.xaxis.push(x.teamA.name + "-" + x.teamB.name);
      }
    });

    return resultobj;
  };

  useEffect(() => {
    const loadCoupons = async () => {
      const resultPromise = await getCouponsByUserId(currentUser.user.sub);
      let res = resultPromise.data;
      res.sort((x, y) => new Date(x.matchid.date) - new Date(y.matchid.date));
      const chartdata = preProcessing(res);
      setCoupons(chartdata);
    };

    loadCoupons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="content">
        {coupons !== null ? (
          <LineChart
            dataset={coupons.bet.dataset}
            xaxis={coupons.bet.xaxis}
            title={"Tétjeid"}
          />
        ) : (
          ""
        )}
        {coupons !== null ? (
          <LineChart
            dataset={coupons.wins.dataset}
            xaxis={coupons.wins.xaxis}
            title={"Nyereményeid"}
          />
        ) : (
          ""
        )}
        <Row>
          <Col xs="12">
            <Card className="card-chart">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <h5 className="card-category">Total Shipments</h5>
                    <CardTitle tag="h2">Performance</CardTitle>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={chartExample1["data1"]}
                    options={chartExample1.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Total Shipments</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-bell-55 text-info" /> 763,215
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={chartExample2.data}
                    options={chartExample2.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Daily Sales</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-delivery-fast text-primary" />{" "}
                  3,500€
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Bar
                    data={chartExample3.data}
                    options={chartExample3.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Completed Tasks</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-send text-success" /> 12,100K
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={chartExample4.data}
                    options={chartExample4.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Statistics;
