import React, {useContext,useState,useEffect} from "react";
import classNames from "classnames";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Button,
  ButtonGroup,
  Col
} from "reactstrap";
import { SharedContext } from "../context/SharedContect";
import { loadAllUser } from "../_service/api-adminfunc";

const AdminUsermanager = () => {
    const share = useContext(SharedContext);
    const [filter, setFilter] = useState("won");
    const [data, setData] = useState([]);
    
    useEffect(() => {
      const loadAlluser = async () => {
        const resultPromise = await loadAllUser();
        setData(resultPromise.data);
      };
      loadAlluser();
    }, [])

    return (
      <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <CardTitle tag="h2">Users</CardTitle>
                  </Col>
                  <Col sm="6">
                    <ButtonGroup
                      className="btn-group-toggle float-right"
                      data-toggle="buttons"
                    >
                      <Button
                        tag="label"
                        className={classNames("btn-simple", {
                          active: filter === "won"
                        })}
                        color="info"
                        id="0"
                        size="sm"
                        onClick={() => setFilter("won")}
                      >
                        <input
                          defaultChecked
                          className="d-none"
                          name="options"
                          type="radio"
                        />
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Nyertes szelvények
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-trophy" />
                        </span>
                      </Button>
                      <Button
                        color="info"
                        id="1"
                        size="sm"
                        tag="label"
                        className={classNames("btn-simple", {
                          active: filter === "lost"
                        })}
                        onClick={() => setFilter("lost")}
                      >
                        <input
                          className="d-none"
                          name="options"
                          type="radio"
                        />
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Vesztes szelvények
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-simple-remove" />
                        </span>
                      </Button>
                      <Button
                        color="info"
                        id="2"
                        size="sm"
                        tag="label"
                        className={classNames("btn-simple", {
                          active: filter === "all"
                        })}
                        onClick={() => setFilter("all")}
                      >
                        <input
                          className="d-none"
                          name="options"
                          type="radio"
                        />
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Összes
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-bullet-list-67" />
                        </span>
                      </Button>
                    </ButtonGroup>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter mybettable" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Username</th>
                      <th>Name</th>
                      <th>isActive</th>
                      <th>Role</th>
                      <th>Email</th>
                      <th>Password</th>
                      <th>Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map(x=>{
                      return (
                        <tr key={x._id}>
                          <td>{x.username}</td>
                          <td>{x.name}</td>
                          <td>{x.aktiv}</td>
                          <td>{x.role}</td>
                          <td>{x.email}</td>
                          <td>{x.password}</td>
                          <td>{x.score}</td>
                        </tr>
                      )
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
  
}

export default AdminUsermanager;
