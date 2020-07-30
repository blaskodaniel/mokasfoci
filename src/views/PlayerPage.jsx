import React, { useState, useEffect } from "react";
import { userstatbyuserid, getuserinfo } from "../_service/api-func";
import { useTheme } from "@material-ui/core/styles";
import { Row, Col} from "reactstrap";
import withWidth from '@material-ui/core/withWidth';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import NumberFormat from "react-number-format";
import Avatar from "@material-ui/core/Avatar";
import LineChart from "../components/Charts/LineChart";
import SimpleWidget from "../components/Widgets/simple-widget";

/**
 * Player page component
 */
const PlayerPage = ({ match, history }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));
  const [mostwinlost, setmostwinlost] = useState(null);
  const [couponstat, setcouponstat] = useState(null);
  const [userskills, setuserskills] = useState(null);
  const [scorepath, setScorepath] = useState({ score: null, match: null });
  const [userinfo, setUserinfo] = useState(null);
  useEffect(() => {
    const getuserstat = async () => {
      const resultPromise = await userstatbyuserid(match.params.playerid);
      let score = [];
      let matchlist = [];
      let diffscore = [];
      let resp = resultPromise.data.scorepath;
      setuserskills(resultPromise.data.userskills)
      resp.sort((x,y)=> new Date(x.date) - new Date(y.date))
      resp.forEach(x => {
        score.push(x.score);
        matchlist.push(x.match);
        diffscore.push(x.diff);
      });
      setScorepath({
        score: score,
        match: matchlist,
        diffscore: diffscore
      });
      setmostwinlost(resultPromise.data.mostscores);
      setcouponstat(resultPromise.data.couponstat)
    };

    const loaduser = async () => {
      const resultprom = await getuserinfo(match.params.playerid);
      setUserinfo(resultprom.data.data);
    };

    loaduser();
    getuserstat();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Találati arány
  const succesrate = () => {
    const allcp = userskills.cp_win.length+userskills.cp_lost.length
    const rate = parseFloat(userskills.cp_win.length/allcp*100)//.toFixed(2)
    return `${rate.toFixed(2)} %`
  }

  // Részvételi mutató
  const participationrate = () => {
    const result = parseFloat((couponstat.allcp/couponstat.allfinishmatch))*100
    return `${result.toFixed(2)} %`;
  }

  // Jó tippek / eddigi mérkőzések aránya
  const succespercurrent = () => {
    const result = parseFloat((userskills.cp_win.length/couponstat.allfinishmatch))*100
    return `${result.toFixed(2)} %`;
  }

  if(scorepath.score !== null && scorepath.match !== null && userinfo !== null && mostwinlost !== null && couponstat !== null){
    return (
      <>
        <div className="content playerpage">
          <div className={isDesktop ? "windowstyle":""}>
          <span className="closebtn" style={{cursor: "pointer"}} onClick={history.goBack}><i className="tim-icons icon-simple-remove"></i></span>
          <Row className="avatarcontainer">
              <>
                <Col xs="12" className="d-flex jc-c">
                  <Avatar
                    className="player_avatar"
                    alt="player avatar"
                    src={"/avatars/" + userinfo.avatar}
                  />
                </Col>
                <Col xs="12" className="text-center playerinfo">
                  <h3 className="playername">{userinfo.name}</h3>
                  <NumberFormat
                    value={userinfo.nettoscore}
                    displayType={"text"}
                    thousandSeparator={true}
                    renderText={value => <span className="playerscore">{value}</span>}
                  />
                </Col>
              </>
          </Row>
          <Row className="summary">
            <Col lg="4" md="4" sm="4" xs="4" className="pr5">
              <SimpleWidget amount={mostwinlost.mostwin} text="Legnagyobb nyereménye" fontcolor="#37c153" />
            </Col>
            <Col lg="4" md="4" sm="4" xs="4" className="pl5 pr5">
              <SimpleWidget amount={mostwinlost.mostlost} text="Legnagyobb vesztesége" fontcolor="#e04040" />
            </Col>
            <Col lg="4" md="4" sm="4" xs="4" className="pl5">
              <SimpleWidget amount={couponstat.notbetcount} text="Kihagyott mérkőzések" fontcolor="#37c153" />
            </Col>
          </Row>
          <Row className="summary">
            <Col lg="6" md="6" sm="6" xs="6" className="pr5">
              <SimpleWidget amount={userinfo.favoriteteamname} imagepath={"/flags/" + userinfo.favoriteteamflag} text="Kedvenc csapata" fontcolor="#bec5bf" />
            </Col>
            {couponstat ? 
            <Col lg="6" md="6" sm="6" xs="6" className="pl5">
              <SimpleWidget amount={participationrate()} text="Részvételi mutatója" fontcolor="#bec5bf" />
            </Col>
            :null}
          </Row>
          <Row className="summary">
          {userskills && couponstat ? 
            <>
              <Col lg="6" md="6" sm="6" xs="12" className={!isDesktop ? "" : "pr5"}>
                <SimpleWidget amount={succesrate()} text="Nyertes szelvények / összes fogadás" fontcolor="#bec5bf" />
              </Col>
              <Col lg="6" md="6" sm="6" xs="12" className={!isDesktop ? "" : "pl5"}>
                <SimpleWidget amount={succespercurrent()} text="Nyertes szelvények / lejátszott meccsek" fontcolor="#bec5bf" />
              </Col>
            </>
            :null}
          </Row>
          <Row>
            <Col xs="12">
              {scorepath.score !== null &&
              scorepath.match !== null &&
              userinfo !== null ? (
                <LineChart
                  dataset={scorepath.score}
                  xaxis={scorepath.match}
                  addtooltipinfo={scorepath.diffscore}
                  title={"Pontjai alakulása"}
                />
              ) : null}
            </Col>
          </Row>
          </div>
        </div>
      </>
    );
  }else{
    return(<p>Adatok betöltése...</p>)
  }
  
};

export default withWidth()(PlayerPage);
