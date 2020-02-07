import React, { useState, useEffect, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import {
  Card,
  Row,
  Alert,
  Col,
  CardBody,
  CardHeader,
  CardTitle
} from "reactstrap";
import { news } from "../_service/api-func";
import { AuthenticationContext } from '../context/AuthenticationContext';
import { getGroups } from "../_service/api-public-func";

const News = ({ title }) => {
  const [newsdata, setnewsdata] = useState([]);
  const [groups, setgroups] = useState([]);
  const [isAlert, setisAlert] = useState(false);
  const currentUser = useContext(AuthenticationContext);

  useEffect(() => {
    const loadnews = async () => {
      const resultPromise = await news();
      let res = resultPromise.data;
      setnewsdata(res);
    };

    const loadgroups = async () => {
      const resultPromise = await getGroups();
      let res = resultPromise.data;
      setgroups(res);
    };

    loadnews();
    loadgroups()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkAlert = () => {
    var isok = false;
    if(!currentUser.userinfo.teamid){isok = true}
    if(!currentUser.userinfo.winteamid){isok = true}
    groups.forEach((group)=>{
      if(!currentUser.userinfo[group.name]){
        isok = true
      }
    })

    return isok
  }

  if(newsdata.length === 0){
    return null
  }else{
    if(newsdata.maxwin && newsdata.maxwin.length > 0 || 
      newsdata.couponstatbyuser && newsdata.couponstatbyuser.bestwin && newsdata.couponstatbyuser.bestwin.count != 0){
        return (
          <>
            <Card className="newscomponent">
              <CardHeader>
                <CardTitle tag="h4">A legek</CardTitle>
              </CardHeader>
              <CardBody>
                <Row>
                  {newsdata.maxwin && newsdata.maxwin.length > 0 ? 
                    <Col lg="6" xs="12">
                    <div className="container">
                      <Avatar
                        className="player_avatar avatar"
                        alt="player avatar"
                        src={`/avatars/${newsdata.maxwin ? newsdata.maxwin[0].avatar : "player.png"}`}
                      />
                      <div className="textcont">
                          <div className="title">Legnagyobb nyeremény</div>
                          <div className="name">{newsdata.maxwin ? newsdata.maxwin[0].name : "Loading..."}</div>
                          <div className="score">{newsdata.maxwin ? newsdata.maxwin[0].score+" pont" : "Loading..."}</div>
                      </div>
                    </div>
                    </Col> : null
                  }
                  {newsdata.couponstatbyuser && newsdata.couponstatbyuser.bestwin && newsdata.couponstatbyuser.bestwin.count != 0 ? 
                    <Col lg="6" xs="12">
                    <div className="container">
                      <Avatar
                        className="player_avatar avatar"
                        alt="player avatar"
                        src={`/avatars/${newsdata.couponstatbyuser ? newsdata.couponstatbyuser.bestwin.avatar : "player.png"}`}
                      />
                      <div className="textcont">
                          <div className="title">Legtöbbször nyert</div>
                          <div className="name">{newsdata.couponstatbyuser ? newsdata.couponstatbyuser.bestwin.name : "Loading..."}</div>
                          <div className="score">{newsdata.couponstatbyuser ? newsdata.couponstatbyuser.bestwin.count + " nyertes szelvény" : "Loading..."}</div>
                      </div>
                    </div>
                  </Col> : null
                  }
                  
                </Row>
              </CardBody>
            </Card>
          </>
        );
      }else{
        return (
          <div className="content">
                  <Row>
                    <Col md="12">
                      <Card>
                        <CardBody>
                          <div>
                            <h2>Üdv a játékban {currentUser.userinfo.name ? " "+currentUser.userinfo.name : ""}!</h2>
                            <div>
                              <p>Itt láthatod majd a legközelebbi mérkőzéseket és érdekes játékos statisztikákat. Még jelenleg nincsenek adatok.</p>
                            </div>
                            {checkAlert() ?
                            (<><p>Még a bajnokság kezdete előtt be kell állítanod pár fontos dologot. Kedvenc csapat, csőztes csapat, 
                              csoportgyőztesek.Mindezt a profilod alatt tudod beállítani. Siess! Nehogy lekéss mert ha már a bajnokság elkezdődik akkor
                              már nincs lehetőséged ezeket beállítani és sok plusz pontról maradsz le. :(</p>
                              <br/>
                            <h4>jelenleg a következők nincsenek beállítva a profilod alatt: </h4></>)
                            : null}
                            {currentUser.userinfo.teamid ? null : 
                              <Alert style={{backgroundColor: "#d02903"}}>
                                Kedvenc csapat kiválasztása
                              </Alert>
                            }
                            {currentUser.userinfo.winteamid ? null : 
                              <Alert style={{backgroundColor: "#d02903"}}>
                                Bajnok csapat megtippelése
                              </Alert>
                            }
                            {groups.map((group)=>{
                                if(!currentUser.userinfo[group.name]){
                                  return (
                                    <Alert style={{backgroundColor: "#d02903"}}>
                                        {group.name} csoport győztesének megtippelése
                                    </Alert>
                                  )
                                }
                                return null
                            })}
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </div>
        )
      }
    
  }
  
};

export default News;
