import React, { useState, useEffect } from "react";

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

  const orderList = (list, asc) => {
    const returnlist = list.sort((x,y) => {
      if(x>y){
        return -1
      }else{
        return 0
      }
    })
  }

  useEffect(() => {
    const loadlist = async () => {
      const resultPromise = await getPlayers();
      //const orderedList = orderList("asc");
      setPlayers(resultPromise.data);
    };
    loadlist();
  }, []);

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
                      <th>Név</th>
                      <th className="text-center">Pont</th>
                    </tr>
                  </thead>
                  <tbody>
                    {players.map((p, index) => {
                      return (
                        <tr key={p.id}>
                          <td>{index+1}</td>
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
