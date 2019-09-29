import React, { useState, useEffect } from "react";
import sort from 'fast-sort';

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
  const [sortdesc_score, setsortdesc_score] = useState(true);

  useEffect(() => {
    const loadlist = async () => {
      const resultPromise = await getPlayers();
      sort(resultPromise.data).desc(u => u.score);
      setPlayers(resultPromise.data);
    };
    loadlist();
  }, []);

  const switchSort = (proper) => {
    if(!sortdesc_score){
      sort(players).desc(u => u[proper]);
    }else{
      sort(players).asc(u => u[proper]);
    }
    setsortdesc_score(!sortdesc_score)
  }

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Ranglista</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>#</th>
                      <th onClick={()=> {switchSort("name")}}>Név <i className="fa fa-fw fa-sort"></i></th>
                      <th className="text-center" onClick={()=> {switchSort("score")}}>Pont <i className="fa fa-fw fa-sort"></i></th>
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
                              src={require("assets/img/anime3.png")}
                            />
                          </td>
                          <td>{p.name}</td>
                          <td className="text-center">{p.score}</td>
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
