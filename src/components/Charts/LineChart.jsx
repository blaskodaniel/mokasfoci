import React, { useState, useRef } from "react";
import { Line } from "react-chartjs-2";
import { line_chart_options } from "./_options";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";

const LineChart = ({ dataset, xaxis, title }) => {
  let chart = useRef();

  const [data, setData] = useState({
    chartdata: canvas => {
      let ctx = canvas.getContext("2d");

      let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

      gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
      gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
      gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

      return {
        labels: xaxis,
        datasets: [
          {
            label: "",
            fill: true,
            backgroundColor: gradientStroke,
            borderColor: "#1f8ef1",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: "#1f8ef1",
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: "#1f8ef1",
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: dataset
          }
        ]
      };
    }
  });

  return (
    <Row>
      <Col xs="12">
        <Card className="card-chart">
          <CardHeader>
            <Row>
              <Col className="text-left" xs="12">
                <CardTitle tag="h2">{title}</CardTitle>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <div className="chart-area">
              <Line ref={chart} data={data.chartdata} options={line_chart_options} />
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default LineChart;
