import React, {useState,useEffect,useContext} from "react";
import Matchtable from "../components/Matchtable/Matchtable";
import withWidth from '@material-ui/core/withWidth';
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  CardBody
} from "reactstrap";
import { getMatchesByDay } from "../_service/api-public-func";
import { SharedContext } from "../context/SharedContect";

const AllMatches = (props) => {
    const [matchlist, setMatchlist] = useState([0]);
    const sharectx = useContext(SharedContext)
    const [matchlistReqprogress, setmatchlistReqprogress] = useState(true);
    
    useEffect(() => {
      const loadMatches = async () => {
        const start = moment(sharectx.settings.gamestart, "YYYY-MM-DD");
        const end = moment(sharectx.settings.gameend, "YYYY-MM-DD");
        const gameDayscount = moment.duration(end.diff(start)).asDays();
        const resultPromise = await getMatchesByDay(moment().format("YYYY-MM-DD"),gameDayscount);
        if (resultPromise.message !== "Network Error" && typeof resultPromise.data !== "undefined") {
          setMatchlist(resultPromise.data);
        }
        setmatchlistReqprogress(false);
      };
      loadMatches()
    }, [sharectx.settings.gamestart,sharectx.settings.gameend])

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
                <div className="content">
                  <Row>
                    <Col md="12">
                      <Card>
                        <CardBody>
                          <p>
                            Sajnos a közeljövőben nem lesznek mérkőzések
                          </p>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </div>
            }
          </Col>
        </Row>
        
      </div>
    </>
    );
  
}

export default withWidth()(AllMatches);
