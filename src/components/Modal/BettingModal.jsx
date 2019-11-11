import React, { useState, useContext } from "react";
import {
  Modal,
  ModalBody,
  ModalFooter,
  Card,
  CardBody,
  Form,
} from "reactstrap";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import NumberFormat from "react-number-format";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import MenuItem from "@material-ui/core/MenuItem";
import { AuthenticationContext } from "../../context/AuthenticationContext";
import { createCoupon, modifyCoupon } from "../../_service/api-func";
import { SharedContext } from "../../context/SharedContect";
import { AppConfig } from "../../application.config";

const BettModal = ({ isShowing, hide, match, mode, editcoupon }) => {
  const currentUser = useContext(AuthenticationContext);
  const sharedcontext = useContext(SharedContext);
  const [profildata, setProfildata] = useState({ amount: mode === "edit" ? editcoupon.bet : 1000 });
  const [bet, setBet] = useState({
    odds: editcoupon === null ? match.oddsDraw : editcoupon.outcome === "1" ? match.oddsAwin : editcoupon.outcome === "2" ? match.oddsBwin : match.oddsDraw,
    outcome: mode === "edit" ? editcoupon.outcome : "x",
    teamid: mode === "edit" ? editcoupon.userid : 0
  });
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
      outcome: bet.outcome,
      matchid: match._id
    };
    if(mode === "create"){
      try {
        const saveresult = await createCoupon(newcoupon);
        if (saveresult.data) {
          if (saveresult.status === 201 && saveresult.data.status) {
            sharedcontext.openNotify("Szelvényed sikeresen létrjött!", "success");
            currentUser.setUserinfo({
              ...currentUser.userinfo,
              score: currentUser.userinfo.score - profildata.amount
            });
            sharedcontext.setUsercoupons([
              ...sharedcontext.usercoupons, saveresult.data.coupon
            ])
            hide();
          }
        } else {
          if (saveresult.response.status !== 201) {
            if (saveresult.response.data.code === 2) {
              sharedcontext.openNotify(
                "Ezt a mérkőzést már lejátszották! Erre nem fogadhatsz",
                "danger"
              );
            } else if (saveresult.response.data.code === 1) {
              sharedcontext.openNotify(
                "Hiba történt a fogadás mentése során. (errcode: " +
                  saveresult.response.data.code +
                  ")",
                "danger"
              );
            } else if (saveresult.response.data.code === 3) {
              sharedcontext.openNotify(
                "Erre a mérkőzésre már fogadtál korábban! Egy mérkőzésre csak egyszer fogadhatsz",
                "danger"
              );
            } else {
              sharedcontext.openNotify(
                "A szelvényed mentése során nem várt hiba történt (code:" +
                  saveresult.response.data.code +
                  ")",
                "danger"
              );
            }
          }
        }
      } catch (e) {
        console.log("ERROR:", e);
        sharedcontext.openNotify("Hiba történt a fogadásod során", "danger");
      }
    }if(mode === "edit"){
      try{
        const saveresult = await modifyCoupon(editcoupon._id, newcoupon);
        if (saveresult.data.status) {
          sharedcontext.openNotify("Sikeres módosítás!", "success");
          currentUser.setUserinfo({
            ...currentUser.userinfo,
            score: (currentUser.userinfo.score + editcoupon.bet) - newcoupon.bet
          });
          let index = sharedcontext.usercoupons.indexOf(editcoupon);
          if (index !== -1) sharedcontext.usercoupons.splice(index, 1);
          editcoupon.bet = newcoupon.bet
          editcoupon.outcome = newcoupon.outcome
          editcoupon.odds = bet.odds
          sharedcontext.setUsercoupons([
            ...sharedcontext.usercoupons, editcoupon
          ])
          hide();
        }
      }catch(e){
        console.log("ERROR:", e);
        sharedcontext.openNotify("Hiba történt a fogadásod módosítása során", "danger");
      }
    }
    
  };

  const handleOdds = (a,b,c) => {
    setBet({ odds: b, outcome: a, teamid: c });
  };

  const betList = () => {
    let returnHTML = [];
    for (let i = AppConfig.minbet; i < AppConfig.maxbet + 1; i++) {
      if (i % 100 === 0) {
        returnHTML.push(
          <MenuItem key={i} className="white" value={i}>
            {i}
          </MenuItem>
        );
      }
    }
    return returnHTML;
  };

  return (
    <>
      <Modal
        isOpen={isShowing}
        fade={false}
        toggle={hide}
        backdrop={"static"}
        className="betmodal-content"
      >
        <Form inline onSubmit={handleBetSubmit}>
          <ModalBody>
            <Card>
              <CardBody>
                <Grid container spacing={0}>
                  <Grid item xs={12}>
                    <h4>{mode === "create" ? "Szelvény létrehozása":"Szelvény módosítása"}</h4>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider variant="middle" />
                  </Grid>
                  <Grid className="mt-2" item xs={12}>
                    <p className="text-center f17 matchname">
                      {match.teamA.name} - {match.teamB.name}
                    </p>
                  </Grid>
                  {currentUser.userinfo.teamid &&
                  currentUser.userinfo.teamid === match.teamB._id ? (
                    <Grid item xs={12}>
                      <span className="favoriteteam">kedvenc csapatod játszik</span>
                    </Grid>
                  ) : null}
                  <Grid item xs={12}>
                    <p>
                      {currentUser.userinfo.oddssuggest && !sharedcontext.settings.alwaysCalculateWithLatestOdds && mode === "edit" ? 
                        <span className="cutivemono">(szelvényeden: {editcoupon.odds})</span>
                        :
                        null}
                    </p>
                    <Grid item xs={12}>
                      <ButtonGroup fullWidth size="small" aria-label="">
                        <Button onClick={()=>handleOdds("1",match.oddsAwin,match.teamA._id)} className={bet.outcome === "1" ? "oddsselected":"oddsbtn"}>
                          1 - {match.oddsAwin}
                        </Button>
                        <Button onClick={()=>handleOdds("x",match.oddsDraw,0)} className={bet.outcome === "x" ? "oddsselected":"oddsbtn"}>
                          x - {match.oddsDraw}
                        </Button>
                        <Button onClick={()=>handleOdds("2",match.oddsBwin,match.teamB._id)} className={bet.outcome === "2" ? "oddsselected":"oddsbtn"}>
                          2 - {match.oddsBwin}
                        </Button>
                      </ButtonGroup>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} className="mt-2 df jc-c">
                    <TextField
                      id="amount"
                      name="amount"
                      variant="filled"
                      select
                      className="betTextField"
                      error={true}
                      value={profildata.amount}
                      onChange={handleInputChange}
                      margin="dense"
                      hiddenLabel
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">Tét</InputAdornment>
                        )
                      }}
                    >
                      {betList()}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} className="mt-3">
                    <h4 className="text-center">
                      Nyereményed:&nbsp;&nbsp;{""}
                      <NumberFormat
                        value={
                          Math.round(profildata.amount * bet.odds * 100) /
                                100 -
                              profildata.amount
                        }
                        displayType={"text"}
                        thousandSeparator={true}
                        renderText={value => <span>{value}</span>}
                      />
                      <span className="text-center doublescore">
                        {currentUser.userinfo.teamid === match.teamA._id ||
                        currentUser.userinfo.teamid === match.teamB._id ? (
                          <NumberFormat
                            value={
                              (Math.round(profildata.amount * bet.odds * 100) /
                                100 -
                                profildata.amount) *
                              2
                            }
                            displayType={"text"}
                            thousandSeparator={true}
                            renderText={value => <span> +x2 = {value}</span>}
                          />
                        ) : (
                          ""
                        )}
                      </span>
                    </h4>
                  </Grid>
                </Grid>
              </CardBody>
            </Card>
          </ModalBody>
          <ModalFooter>
            <Button variant="contained" size="small" onClick={hide}>
              Mégsem
            </Button>{" "}
            <Button
              variant="contained"
              size="small"
              color="primary"
              type="submit"
            >
              {mode === "create" ? "Fogadok":"Módosít"}
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
};

export default BettModal;
