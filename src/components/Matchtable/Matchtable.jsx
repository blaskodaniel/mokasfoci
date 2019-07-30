import React from "react";
import {
  Card,
  CardBody,
  Table
} from "reactstrap";

class Matchtable extends React.Component {

  render() {
    return (
      <Card>
        <CardBody>
          <Table className="tablesorter" responsive>
            <tbody>
              <tr className="theadrow">
                <td colSpan="2">Július 13.</td>
                <td className="text-center">1</td>
                <td className="text-center">X</td>
                <td className="text-center">2</td>
              </tr>
              <tr>
                <td>17:00</td>
                <td>Argentina - Lengyelország</td>
                <td className="text-center">1.3</td>
                <td className="text-center">2.1</td>
                <td className="text-center">3.1</td>
              </tr>
              <tr>
                <td>18:00</td>
                <td>Szerbia - Oroszország</td>
                <td className="text-center">2.1</td>
                <td className="text-center">2</td>
                <td className="text-center">3.3</td>
              </tr>
              <tr className="theadrow">
                <td colSpan="2">Július 14.</td>
                <td className="text-center">1</td>
                <td className="text-center">X</td>
                <td className="text-center">2</td>
              </tr>
              <tr>
                <td>17:00</td>
                <td>Argentina - Lengyelország</td>
                <td className="text-center">1.3</td>
                <td className="text-center">2.1</td>
                <td className="text-center">3.1</td>
              </tr>
            </tbody>
          </Table>
        </CardBody>
      </Card>
    );
  }
}

export default Matchtable;