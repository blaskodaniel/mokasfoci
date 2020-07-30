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
import BestBox from "../components/News/BestBox";

const News = ({ title }) => {
  const [newsdata, setnewsdata] = useState([]);
  const [maxwinfav, setmaxwinfav] = useState([]);
  const [maxwin, setmaxwin] = useState([]);
  const [groups, setgroups] = useState([]);
  const currentUser = useContext(AuthenticationContext);

  useEffect(() => {
    const loadnews = async () => {
      const resultPromise = await news();
      let res = resultPromise.data;
      if(!res || !res.maxwin){
        return false
      }
      const __maxwinfav = res.maxwin.filter(x=>x.withfavorite)
      const __maxwin = res.maxwin.filter(x=>!x.withfavorite)
      setmaxwinfav(__maxwinfav)
      setmaxwin(__maxwin)
      setnewsdata(res);
    };

    const loadgroups = async () => {
      const resultPromise = await getGroups();
      let res = resultPromise.data;
      setgroups(res);
    };

    currentUser.userinforefresh()
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
    const isNews = newsdata.maxwin && newsdata.maxwin.length > 0 || newsdata.couponstatbyuser && newsdata.couponstatbyuser.bestwin && newsdata.couponstatbyuser.bestwin.count != 0
    if(isNews){
        return (
          <>
            <Card className="newscomponent">
              <CardHeader>
                <CardTitle tag="h4">A legek</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="bestboxcontainer">
                  <BestBox data={maxwinfav} single={true} title={"Legnagyobb nyeremény (kedvenc csapattal)"} />
                  <BestBox data={maxwin} single={true} title={"Legnagyobb nyeremény"} />
                  <BestBox data={newsdata.couponstatbyuser.bestwin} single={false} title={"Legtöbbször nyert"} />
                </div>
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
