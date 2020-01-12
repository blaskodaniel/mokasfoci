import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import {
  Card,
  Row,
  Col,
  CardBody,
  CardHeader,
  CardTitle
} from "reactstrap";
import { news } from "../_service/api-func";

const News = ({ title }) => {
  const [newsdata, setnewsdata] = useState([]);
  useEffect(() => {
    const loadnews = async () => {
      const resultPromise = await news();
      let res = resultPromise.data;
      setnewsdata(res);
    };

    loadnews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        return null
      }
    
  }
  
};

export default News;
