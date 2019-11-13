import React, { useState, useContext, useEffect } from "react";
import { userstatbyuserid } from "../_service/api-func";
import Row from "reactstrap/lib/Row";
import Col from "reactstrap/lib/Col";
import LineChart from "../components/Charts/LineChart";
/**
 * Player page component
 */
const PlayerPage = ({ match, history }) => {
  const [scorepath, setScorepath] = useState({ score: null, match: null });
  useEffect(() => {
    const getuserstat = async () => {
        console.log("fsffsfgsg:"+match.params.playerid)
      const resultPromise = await userstatbyuserid(match.params.playerid);
      let score = [];
      let matchlist = [];
      let diffscore = [];
      resultPromise.data.scorepath.forEach(x=>{
        score.push(x.score);
        matchlist.push(x.match)
        diffscore.push(x.diff)
      })
      setScorepath({
        score: score,
        match: matchlist,
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
            {scorepath.score !== null && scorepath.match !== null ? (
              <LineChart
                dataset={scorepath.score}
                xaxis={scorepath.match}
                addtooltipinfo={scorepath.diffscore}
                title="Statisztika"
              />
            ) : null}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default PlayerPage;
