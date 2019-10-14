import React, { useState, useContext, useEffect } from "react";
import Notify from "react-notification-alert";
import moment from "moment";
import { AppConfig } from "../application.config";
import NumberFormat from "react-number-format";
import {
  loadTransactions
} from "../_service/api-func";
import { AuthenticationContext } from "../context/AuthenticationContext";
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

/**
 * Transactions component
 */
const Transactions = () => {
  const currentUser = useContext(AuthenticationContext);
  const [transaction, setTransaction] = useState([]);

  useEffect(() => {
    const loadtrans = async () => {
      const resultPromise = await loadTransactions(currentUser.user.sub);
      setTransaction(resultPromise.data);
    };

    loadtrans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="content transactionlist">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Levonások / jóváírások</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Leírás</th>
                      <th
                        className="text-center"
                      >
                        Pont
                      </th>
                      <th
                        className="text-center"
                      >
                        Dátum
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {transaction.map((p, index) => {
                      return (
                        <tr key={p._id}>
                          <td>
                            {p.description}
                          </td>
                          <td className="text-center">
                            <NumberFormat
                              value={parseInt(p.amount, 10)}
                              displayType={"text"}
                              thousandSeparator={true}
                              renderText={value => <b>{p.type === 0 ? "-"+value : value}</b>}
                            />
                          </td>
                          <td className="text-center">
                            {p.date}
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

export default Transactions;
