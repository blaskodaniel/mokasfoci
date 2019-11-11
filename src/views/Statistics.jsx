import React, { useState, useEffect } from "react";
import { userstat } from "../_service/api-func";
import Row from "reactstrap/lib/Row";
import Col from "reactstrap/lib/Col";
import PieChart from "../components/Charts/PieChart";
import LineChart from "../components/Charts/LineChart";

const Statistics = () => {
  const [piecoupons, setPiecoupons] = useState(null);
  const [depexp, setDepexp] = useState(null);
  const [scorepath, setScorepath] = useState({score:null,match:null});

  useEffect(() => {
    const getuserstat = async () => {
      const resultPromise = await userstat();
      setPiecoupons([
        {
          id: "Nyertes",
          label: "Nyertes szelvény",
          value: resultPromise.data.coupons.win,
          color: "hsl(114, 70%, 50%)"
        },
        {
          id: "Vesztes",
          label: "Vesztes szelvény",
          value: resultPromise.data.coupons.lost,
          color: "hsl(1, 70%, 50%)"
        },
        {
          id: "Játékban",
          label: "Még játékban",
          value: resultPromise.data.coupons.run,
          color: "#8790a7 "
        }
      ]);
      setDepexp([
        {
          id: "Nyeremény",
          label: "Nyeremény",
          value: resultPromise.data.depexp.deposit,
          color: "#1dc339"
        },
        {
          id: "Veszteség",
          label: "Veszteség",
          value: resultPromise.data.depexp.expense,
          color: "hsl(1, 70%, 50%)"
        }
      ]);
      let score = [];
      let match = [];
      let diffscore = [];
      resultPromise.data.scorepath.forEach(x=>{
        score.push(x.score);
        match.push(x.match)
        diffscore.push(x.diff)
      })
      setScorepath({
        score: score,
        match: match,
        diffscore: diffscore
      })
    };

    getuserstat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="content">
        <Row>
          <Col xs="12">
            {scorepath.score !== null && scorepath.match !== null ? <LineChart
              dataset={scorepath.score}
              xaxis={scorepath.match}
              addtooltipinfo={scorepath.diffscore}
              title="Pontod alakulása"
            /> : null}
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="12" md="6" lg="6">
            {piecoupons !== null ? (
              <PieChart data={piecoupons} title="Szelvények állapota" />
            ) : (
              ""
            )}
          </Col>
          <Col xs="12" sm="12" md="6" lg="6">
            {depexp !== null ? (
              <PieChart data={depexp} title="Nyeremény/veszteség" />
            ) : (
              ""
            )}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Statistics;
