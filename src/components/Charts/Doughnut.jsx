import React, { useState, useRef, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { doughnut_chart_options } from "./_options";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";

const DoughnutChart = ({ dataset, labels, title, colors }) => {
  let chart = useRef();

  const [data, setData] = useState({
    labels: labels,
    datasets: [
      {
        data: dataset,
        backgroundColor: colors,
        hoverBackgroundColor: colors,
        borderWidth: 1
      }
    ]
  });

  useEffect(() => {
    // chart.current.chartInstance.canvas.parentNode.style.height = "100px"
  }, []);

  return (
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
          <Doughnut ref={chart} data={data} options={doughnut_chart_options} />
        </div>
      </CardBody>
    </Card>
  );
};

export default DoughnutChart;
