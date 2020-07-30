import React, { useState, useEffect,useContext } from "react";
import { userstat, userstatbyuserid } from "../_service/api-func";
import Row from "reactstrap/lib/Row";
import Col from "reactstrap/lib/Col";
import PieChart from "../components/Charts/PieChart";
import LineChart from "../components/Charts/LineChart";
import SimpleWidget from '../components/Widgets/simple-widget';
import { AuthenticationContext } from '../context/AuthenticationContext';

const Statistics = () => {
  const [piecoupons, setPiecoupons] = useState(null);
  const [depexp, setDepexp] = useState(null);
  const currentUser = useContext(AuthenticationContext);
  const [stat, setstat] = useState(null)
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
      resultPromise.data.scorepath.sort((x,y)=> new Date(x.date) - new Date(y.date))
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

  useEffect(() => {
    const getuserstatplus = async () => {
      const result = await userstatbyuserid(currentUser.userinfo.publicid)
      setstat(result.data)
    }
    if(currentUser.userinfo.publicid){
      getuserstatplus()
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser.userinfo.publicid]);

  const succesrate = () => {
    const allcp = stat.userskills.cp_win.length+stat.userskills.cp_lost.length
    const rate = parseFloat(stat.userskills.cp_win.length/allcp*100)
    return `${rate.toFixed(2)} %`
  }

  // Részvételi mutató
  const participationrate = () => {
    const result = parseFloat((stat.couponstat.allcp/stat.couponstat.allfinishmatch))*100
    return `${result.toFixed(2)} %`;
  }

  // Jó tippek / eddigi mérkőzések aránya
  const succespercurrent = () => {
    const result = parseFloat((stat.userskills.cp_win.length/stat.couponstat.allfinishmatch))*100
    return `${result.toFixed(2)} %`;
  }

  return (
    <>
      <div className="content">
        <Row>
          <Col xs="12">
            {scorepath.score !== null && scorepath.match !== null ? 
            <LineChart
              dataset={scorepath.score}
              xaxis={scorepath.match}
              addtooltipinfo={scorepath.diffscore}
              title="Pontod alakulása"
            /> : <p>Nincsenek adatok</p>}
          </Col>
        </Row>
        <Row>
          <Col lg="4" md="4" sm="4" xs="4" className="pr5">
            {stat && stat.couponstat? 
              <SimpleWidget amount={stat.couponstat.allmatch} text="Összess mérkőzés" fontcolor="#37c153" /> 
              :
              <SimpleWidget amount={"Betöltés..."} text="Összess mérkőzés" fontcolor="#37c153" />
            }
          </Col>
          <Col lg="4" md="4" sm="4" xs="4" className="pl5 pr5">
            {stat && stat.couponstat? 
              <SimpleWidget amount={stat.couponstat.notbetcount} text="Kihagyott mérkőzéseid" fontcolor="#37c153" /> 
              :
              <SimpleWidget amount={"Betöltés..."} text="Kihagyott mérkőzéseid" fontcolor="#37c153" />
            }
          </Col>
          <Col lg="4" md="4" sm="4" xs="4" className="pl5">
            {stat && stat.userskills? 
              <SimpleWidget amount={participationrate()} text="Részvételi mutatód" fontcolor="#37c153" />
              :
              <SimpleWidget amount={"Betöltés..."} text="Részvételi mutatód" fontcolor="#37c153" />
            }
          </Col>
        </Row>
        <Row className="summary">
          {stat && stat.userskills && stat.couponstat ? 
            <>
              <Col lg="6" md="6" sm="6" xs="12">
                <SimpleWidget amount={succesrate()} text="Nyertes szelvények / összes fogadás" fontcolor="#bec5bf" /> 
              </Col>
              <Col lg="6" md="6" sm="6" xs="12">
                <SimpleWidget amount={succespercurrent()} text="Nyertes szelvények / lejátszott meccsek" fontcolor="#bec5bf" />
              </Col>
            </>
            :null}
          </Row>
        <Row>
          <Col xs="12" sm="12" md="6" lg="6">
            {piecoupons !== null ? (
              <PieChart data={piecoupons} title="Szelvényeid" />
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
