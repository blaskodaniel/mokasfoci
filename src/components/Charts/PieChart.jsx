import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";

const PieChart = ({ data, title }) => {
  const legendopt = [
    {
      anchor: "bottom",
      direction: "row",
      translateY: 56,
      itemWidth: 100,
      itemHeight: 18,
      itemTextColor: "#999",
      symbolSize: 18,
      symbolShape: "circle",
      effects: [
        {
          on: "hover",
          style: {
            itemTextColor: "#fff"
          }
        }
      ]
    }
  ]
  return (
    <Card className="card-chart">
      <CardHeader>
        <Row>
          <Col className="text-left" xs="12">
            <CardTitle tag="h3">{title}</CardTitle>
          </Col>
        </Row>
      </CardHeader>
      <CardBody>
        <div className="chart-area">
          <ResponsivePie
            data={data}
            margin={{ top: 10, right: 60, bottom: 60, left: 60 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            colors={d => d.color}
            borderWidth={1}
            borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
            enableRadialLabels={true}
            radialLabelsSkipAngle={10}
            radialLabelsTextXOffset={6}
            radialLabelsTextColor="#fff"
            radialLabelsLinkOffset={0}
            radialLabelsLinkDiagonalLength={10}
            radialLabelsLinkHorizontalLength={10}
            radialLabelsLinkStrokeWidth={1}
            radialLabelsLinkColor={{ from: "color" }}
            slicesLabelsSkipAngle={10}
            slicesLabelsTextColor="#333333"
            animate={true}
            motionStiffness={90}
            motionDamping={15}
            legends={[]}
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default PieChart;
