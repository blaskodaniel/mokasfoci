import React, { useState, useEffect } from "react";
import sort from "fast-sort";
import NumberFormat from "react-number-format";
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
  const [players, setPlayers] = useState([]);
  const [sortdesc_score, setsortdesc_score] = useState(false);
  const [sortdesc_nettoscore, setsortdesc_nettoscore] = useState(false);
  const [sortdesc_name, setsortdesc_name] = useState(false);

  useEffect(() => {
    const loadlist = async () => {
      const resultPromise = await getPlayers();
      sort(resultPromise.data).desc(u => u.nettoscore);
      setPlayers(resultPromise.data);
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
      <div className="content">
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
                      <th>#</th>
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
                      <th
                        className="text-center"
                        onClick={() => {
                          switchSort("score");
                        }}
                      >
                        Bruttó pont <i className="fa fa-fw fa-sort"></i>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {players.map((p, index) => {
                      return (
                        <tr key={p.id}>
                          <td>
                            <img
                              className="photo"
                              alt="..."
                              src={process.env.PUBLIC_URL + "avatars/"+p.avatar}
                            />
                          </td>
                          <td>{p.name}</td>
                          <td className="text-center">
                            <NumberFormat
                              value={parseInt(p.nettoscore, 10)}
                              displayType={"text"}
                              thousandSeparator={true}
                              renderText={value => <b>{value}</b>}
                            />
                          </td>
                          <td className="text-center">
                            <NumberFormat
                              value={parseInt(p.score, 10)}
                              displayType={"text"}
                              thousandSeparator={true}
                              renderText={value => <b>{value}</b>}
                            />
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
