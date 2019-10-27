import React, { useState, useContext, useEffect } from "react";
import moment from "moment";
import NumberFormat from "react-number-format";
import { loadTransactions } from "../_service/api-func";
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
import SimpleWidget from "../components/Widgets/simple-widget";

/**
 * Transactions component
 */
const Transactions = () => {
  const currentUser = useContext(AuthenticationContext);
  const [transaction, setTransaction] = useState([]);
  const [alldeposit, setAlldeposit] = useState(0);
  const [allexpense, setAllexpense] = useState(0);

  const summary = (data) => {
    let _deposit = 0; let _expense = 0;
    data.forEach((x)=>{
      if(x.type === 1){
        _deposit += parseInt(x.amount)
      }else if(x.type === 0){
        _expense += parseInt(x.amount)
      }
    })
    setAlldeposit(_deposit)
    setAllexpense(_expense)
  }

  useEffect(() => {
    const loadtrans = async () => {
      const resultPromise = await loadTransactions(currentUser.user.sub);
      resultPromise.data.sort((x, y) => new Date(y.date) - new Date(x.date))
      setTransaction(resultPromise.data);
      summary(resultPromise.data);
    };

    loadtrans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="content transactionlist">
        <Row className="summary">
          <Col lg="2" md="4" sm="4" xs="6">
            <SimpleWidget amount={alldeposit} text="Jóváírások" icon="fa fa-plus" fontcolor="#37c153" />
          </Col>
          <Col lg="2" md="4" sm="4" xs="6">
            <SimpleWidget amount={allexpense} text="Levonások" icon="fa fa-minus" fontcolor="#e04040" />
          </Col>
        </Row>
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
                      <th className="text-center">Pont</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transaction.length === 0 ? (
                      <tr>
                        <td colSpan="3">Nincsen levonásod/jóváírásod</td>
                      </tr>
                    ) : (
                      transaction.map((p, index) => {
                        return (
                          <tr key={p._id}>
                            <td>
                              {p.description} <br />
                              <p className="datetime">
                                {moment(p.date).format("MMM Do HH:mm")}
                              </p>
                            </td>
                            <td className="text-center">
                              <NumberFormat
                                value={parseInt(p.amount, 10)}
                                displayType={"text"}
                                thousandSeparator={true}
                                renderText={value =>
                                  p.type === 0 ? (
                                    <span className="lost">- {value}</span>
                                  ) : (
                                    <span className="win">+ {value}</span>
                                  )
                                }
                              />
                            </td>
                          </tr>
                        );
                      })
                    )}
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
