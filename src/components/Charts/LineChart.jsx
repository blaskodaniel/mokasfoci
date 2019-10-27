import React, { useState, useRef } from "react";
import { Line } from "react-chartjs-2";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";

const LineChart = ({ dataset, xaxis, addtooltipinfo, title }) => {
  let chart = useRef();
  const [options, setOptions] = useState({
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    tooltips: {
      backgroundColor: "#f5f5f5",
      titleFontColor: "#333",
      bodyFontColor: "#666",
      bodySpacing: 4,
      xPadding: 12,
      mode: "nearest",
      intersect: 0,
      position: "nearest",
      callbacks: {
        afterBody: function(t, d) {
           try{
              let diffsc = addtooltipinfo[t[0].index];
              if(addtooltipinfo[t[0].index] && addtooltipinfo[t[0].index] > 0){
                diffsc = "+"+addtooltipinfo[t[0].index]
              }
              return "("+diffsc+" pont)";
           }catch(e){
              return ""
           }
           
        }
     }
    },
    responsive: true,
    scales: {
      yAxes: [
        {
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: "rgba(29,140,248,0.0)",
            zeroLineColor: "transparent"
          },
          ticks: {
            max: Math.max.apply(null, dataset),
            min: Math.min.apply(null, dataset),
            padding: 20,
            fontColor: "#9a9a9a"
          }
        }
      ],
      xAxes: [
        {
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: "rgba(29,140,248,0.1)",
            zeroLineColor: "transparent"
          },
          ticks: {
            padding: 20,
            fontColor: "#9a9a9a"
          }
        }
      ]
    }
  })
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
    <Card className="card-chart">
      <CardHeader>
        <Row>
          <Col className="text-left" xs="12">
            <CardTitle tag="h3">{title}</CardTitle>
          </Col>
        </Row>
      </CardHeader>
      <CardBody>
        <div className="chart-area" style={{ height: "290px" }}>
          <Line
            ref={chart}
            data={data.chartdata}
            options={options}
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default LineChart;
