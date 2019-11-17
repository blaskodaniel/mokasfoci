import React, { useState, useEffect } from "react";
import sort from "fast-sort";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import routes from "../routes";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col
} from "reactstrap";
import { getPlayers } from "../_service/api-public-func";

const Toplist = () => {
  const playerlink = routes.filter(x => x.id === "userpage");
  const [players, setPlayers] = useState([]);
  const [sortdesc_score, setsortdesc_score] = useState(false);
  const [sortdesc_nettoscore, setsortdesc_nettoscore] = useState(false);
  const [sortdesc_name, setsortdesc_name] = useState(false);

  const medalSort = (list) => {
    list.forEach((x,y)=>{
      x.rate = (y+1)
    });
    console.log(list)
    return list
  }

  useEffect(() => {
    const loadlist = async () => {
      const resultPromise = await getPlayers();
      sort(resultPromise.data).desc(u => u.nettoscore);
      const extendedList = medalSort(resultPromise.data);
      setPlayers(extendedList);
    };
    loadlist();
  }, []);

  const switchSort = proper => {
    let sorted = players;
    switch (proper) {
      case "score":
        if (sortdesc_score) {
          sorted = sort(players).desc(u => parseInt(u.score));
        } else {
          sorted = sort(players).asc(u => parseInt(u.score));
        }
        setsortdesc_score(!sortdesc_score);
        break;
      case "nettoscore":
        if (sortdesc_nettoscore) {
          sorted = sort(players).desc(u => parseInt(u.nettoscore));
        } else {
          sorted = sort(players).asc(u => parseInt(u.nettoscore));
        }
        setsortdesc_nettoscore(!sortdesc_nettoscore);
        break;
      case "name":
        if (sortdesc_name) {
          sorted = sort(players).desc(u => u.name);
        } else {
          sorted = sort(players).asc(u => u.name);
        }
        setsortdesc_name(!sortdesc_name);
        break;
      default:
        break;
    }
    setPlayers(sorted)
  };

  return (
    <>
      <div className="content toplist">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Toplista</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th className="text-center">#</th>
                      <th className="text-center">Stat</th>
                      <th
                        onClick={() => {
                          switchSort("name");
                        }}
                      >
                        Név <i className="fa fa-fw fa-sort"></i>
                      </th>
                      <th
                        className="text-center"
                        onClick={() => {
                          switchSort("nettoscore");
                        }}
                      >
                        Pont <i className="fa fa-fw fa-sort"></i>
                      </th>
                      <th></th>
                      {/*<th
                        className="text-center"
                        onClick={() => {
                          switchSort("score");
                        }}
                      >
                        Bruttó pont <i className="fa fa-fw fa-sort"></i>
                      </th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {players.map((p, index) => {
                      return (
                        <tr key={p.id}>
                          <td className="text-center">
                            {p.rate}
                          </td>
                          <td className="text-center">
                            <Link to={playerlink[0].path+"/"+p.public_id}> <i className="tim-icons icon-chart-bar-32"></i></Link>
                          </td>
                          <td>
                            <img
                              className="photo"
                              alt="..."
                              src={"/avatars/"+p.avatar}
                            />{p.name}
                          </td>
                          <td className="text-center">
                            <NumberFormat
                              value={parseInt(p.nettoscore, 10)}
                              displayType={"text"}
                              thousandSeparator={true}
                              renderText={value => <b>{value}</b>}
                            />
                            <NumberFormat
                              value={parseInt(p.score, 10)}
                              displayType={"text"}
                              thousandSeparator={true}
                              renderText={value => <span className="brpoint">{value}</span>}
                            />
                          </td>
                          <td>
                            {p.rate === 1 ? <img
                              className="photo medal"
                              alt="..."
                              src={"/icons/cup.png"}
                            /> : p.rate === 2 ? <img
                            className="photo medal"
                            alt="..."
                            src={"/icons/silvermedal.png"}
                          /> : ""}
                          {p.rate === 3 ? <img
                              className="photo medal"
                              alt="..."
                              src={"/icons/bronze-medal.png"}
                            /> : ""}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Toplist;
