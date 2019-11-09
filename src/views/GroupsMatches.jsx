import React, { useState, useEffect } from "react";
import withWidth from "@material-ui/core/withWidth";
import MatchtableMobile from "../components/Matchtable/MatchtableMobile";
// reactstrap components
import { Row, Col, Card, CardBody } from "reactstrap";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { getmatchesbygroup } from "../_service/api-public-func";

const GroupsMatches = ({ match, history }) => {
  const [matches, setMatches] = useState([]);
  const [pagetitle, setPagetitle] = useState("");
  const loadlist = async () => {
    try {
      const resultPromise = await getmatchesbygroup(match.params.groupid);
      setMatches(resultPromise.data.matches);
      setPagetitle(resultPromise.data.groupname + " csoport mérkőzései");
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    loadlist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="content">
        <Row>
          <Col className="m-p-8" xs="12">
            {matches ? (
              <MatchtableMobile list={matches} title={pagetitle} />
            ) : null}
          </Col>
        </Row>
        <Row>
          <Col className="m-p-8" xs="12">
            <Card>
              <CardBody className="text-right">
                <span onClick={history.goBack}>
                  <ChevronLeftIcon />
                  Vissza
                </span>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default withWidth()(GroupsMatches);
