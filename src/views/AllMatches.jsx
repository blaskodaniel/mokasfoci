import React, {useState,useEffect} from "react";
import Matchtable from "../components/Matchtable/Matchtable";
import withWidth, { isWidthUp, isWidthDown } from '@material-ui/core/withWidth';
import moment from 'moment';
import {
  Row,
  Col
} from "reactstrap";
import { getMatches, getMatchesByDay } from "../_service/api-public-func";
import { AppConfig } from "../application.config";

const AllMatches = (props) => {
    const [matchlist, setMatchlist] = useState([0]);
    const [matchlistReqprogress, setmatchlistReqprogress] = useState(true);
    
    useEffect(() => {
      const loadMatches = async () => {
        const start = moment(AppConfig.gamestart, "YYYY-MM-DD");
        const end = moment(AppConfig.gameend, "YYYY-MM-DD");
        const gameDayscount = moment.duration(end.diff(start)).asDays();
        console.log(gameDayscount)
        const resultPromise = await getMatchesByDay(moment().format("YYYY-MM-DD"),gameDayscount);
        if (resultPromise.message !== "Network Error" && typeof resultPromise.data !== "undefined") {
          setMatchlist(resultPromise.data);
        }
        setmatchlistReqprogress(false);
      };
      loadMatches()
    }, [])

    return (
      <>
      <div className="content">
        <Row>
          <Col className="m-p-8" xs="12">
          {matchlistReqprogress ? 
              <p>Mérkőzések betöltése....</p> 
              : 
              matchlist[0] === 0 ? <p>Szerver nem válaszol. Kérlek próbálkozz később.</p> 
                : matchlist.length > 0 ?  <Matchtable list={matchlist} title="Hátralévő mérkőzések" /> :
                <p>Ma és holnap nem lesznek mérkőzések</p>
            }
          </Col>
        </Row>
        
      </div>
    </>
    );
  
}

export default withWidth()(AllMatches);
