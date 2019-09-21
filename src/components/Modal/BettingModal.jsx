import React, { useState, useContext } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  CardBody,
  Label,
  Form,
  Input,
  FormGroup
} from "reactstrap";
import { AuthenticationContext } from "../../context/AuthenticationContext";
import { createCoupon } from "../../_service/api-func";
import { SharedContext } from "../../context/SharedContect";

const BettModal = ({ isShowing, hide, match }) => {
  const currentUser = useContext(AuthenticationContext);
  const sharedcontext = useContext(SharedContext);
  const [profildata, setProfildata] = useState({ amount: 1000 });
  const [modalshowing, setModalshowing] = useState(isShowing);
  const [coupon, setCoupon] = useState({});
  const [bet, setBet] = useState({odds:match.oddsDraw, outcome:"x"});
  const handleInputChange = e => {
    const { name, value } = e.target;
    if (value < 10000) {
      setProfildata({ ...profildata, [name]: value });
    }
  };

  const handleBetSubmit = async e => {
    e.preventDefault();
    const newcoupon = {
      bet: profildata.amount,
      odds: bet.odds,
      result: Math.round(profildata.amount * bet.odds * 100) / 100,
      outcome: bet.outcome,
      matchid: match._id,
      teamA: match.teamA._id,
      teamB: match.teamB._id
    }
    setCoupon(newcoupon)
    console.log(newcoupon);
    try {
      const saveresult = await createCoupon(newcoupon);
      if(saveresult.data){
        if (saveresult.status === 201 && saveresult.data.status) {
          sharedcontext.openNotify("Szelvényedet létrehoztuk. Sok szerencsét!", "success");
          currentUser.setUserinfo({...currentUser.userinfo, score: (currentUser.userinfo.score-profildata.amount)})
          hide()
        }
      }else{
        if (saveresult.response.status !== 201) {
          if(saveresult.response.data.code === 2){
            sharedcontext.openNotify("Ezt a mérkőzést már lejátszották! Erre nem fogadhatsz", "danger");
          }else if(saveresult.response.data.code === 1){
            sharedcontext.openNotify("Hiba történt a fogadás mentése során. (errcode: "+saveresult.response.data.code+")", "danger");
          }else if(saveresult.response.data.code === 3){
            sharedcontext.openNotify("Erre a mérkőzésre már fogadtál korábban! Egy mérkőzésre csak egyszer fogadhatsz", "danger");
          }
        }
      }
    } catch (e) {
      console.log("ERROR:", e);
      sharedcontext.openNotify("Hiba történt a fogadásod során", "danger");
    }
  };

  const handleRadioChange = e => {
    const { dataset, value } = e.target;
    setBet({odds:value, outcome:dataset.outcome});
  };

  return (
    <>
      <Modal
        isOpen={modalshowing}
        fade={false}
        toggle={hide}
        backdrop={false}
        className="betmodal-content"
      >
        <Form onSubmit={handleBetSubmit}>
          <ModalHeader toggle={hide}>Fogadás a mérkőzésre</ModalHeader>
          <ModalBody>
            <Card>
              <CardBody>
                <h4 className="text-center">
                  Nyereményed: {Math.round(profildata.amount * bet.odds * 100) / 100}{" "}
                  pont
                </h4>
                <p className="text-center">
                  <strong>{currentUser.userinfo.score}</strong> pontod van
                </p>
                <div className="text-center">
                  <FormGroup check inline className="form-check-radio">
                    <Label className="form-check-label">
                      <Input
                        type="radio"
                        name="odds"
                        onChange={handleRadioChange}
                        id="oddsAwin"
                        data-outcome="1"
                        value={match.oddsAwin}
                      />
                      {match.teamA.name}
                      <span className="form-check-sign">
                        {" "}
                        ({match.oddsAwin})
                      </span>
                    </Label>
                  </FormGroup>
                  <FormGroup check inline className="form-check-radio">
                    <Label className="form-check-label">
                      <Input
                        type="radio"
                        name="odds"
                        onChange={handleRadioChange}
                        id="oddsDraw"
                        data-outcome="x"
                        value={match.oddsDraw}
                        defaultChecked
                      />
                      Döntetlen
                      <span className="form-check-sign">
                        {" "}
                        ({match.oddsDraw})
                      </span>
                    </Label>
                  </FormGroup>
                  <FormGroup check inline className="form-check-radio">
                    <Label className="form-check-label">
                      <Input
                        type="radio"
                        name="odds"
                        onChange={handleRadioChange}
                        id="oddsBwin"
                        data-outcome="2"
                        value={match.oddsBwin}
                      />
                      {match.teamB.name}
                      <span className="form-check-sign">
                        {" "}
                        ({match.oddsBwin})
                      </span>
                    </Label>
                  </FormGroup>
                  <FormGroup className="betpointpanel">
                    <Label for="amount">Feltett pont</Label>
                    <Input
                      type="number"
                      min="1000"
                      max="5000"
                      defaultValue={profildata.amount}
                      onChange={handleInputChange}
                      name="amount"
                      id="amount"
                    />
                  </FormGroup>
                </div>
              </CardBody>
            </Card>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={hide}>
              Mégsem
            </Button>{" "}
            <Button color="secondary" type="submit">
              Fogadok
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
};

export default BettModal;
