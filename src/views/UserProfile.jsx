import React, { useState, useContext, useRef, useEffect } from "react";
import Notify from "react-notification-alert";
import moment from "moment";
import { AppConfig } from "../application.config";
import NumberFormat from "react-number-format";
import {
  loadProfile,
  saveProfile,
  sendissue,
  setavatar
} from "../_service/api-func";
import { getTeams, getGroups } from "../_service/api-public-func";
import { AuthenticationContext } from "../context/AuthenticationContext";
import useAvatarModal from "../hooks/useAvatarModal";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  UncontrolledDropdown,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";
import AvatarModal from "../components/Modal/AvatarModal";

/**
 * User profile component
 */
const UserProfile = () => {
  const notify = useRef({});
  const currentUser = useContext(AuthenticationContext);
  const [profildata, setProfildata] = useState({});
  const { avatarmodal_isShowing, avatarmodal_toggle } = useAvatarModal();
  const [comment, setComment] = useState("");
  const [teamsdata, setTeamsdata] = useState([]);
  const [groupsdata, setGroupsdata] = useState([]);
  const [groupwithteams, setGroupwithteams] = useState([]);

  useEffect(() => {
    console.log("AuthenticationContext: ", currentUser.userinfo);
    const loadUserProfile = async () => {
      const resultPromise = await loadProfile(currentUser.user.sub);
      setProfildata(resultPromise.data);
    };

    const loadTeams = async () => {
      const resultPromise = await getTeams();
      setTeamsdata(resultPromise.data);
    };

    const loadGroups = async () => {
      const resultPromise = await getGroups();
      setGroupsdata(resultPromise.data);
    };

    loadUserProfile();
    loadTeams();
    loadGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let _groupbyteam = [];
    teamsdata.forEach(team => {
      const _tgr = _groupbyteam.find(x => x._id === team.groupid._id);
      if (_tgr) {
        _tgr.teams.push(team);
      } else {
        _groupbyteam.push({
          _id: team.groupid._id,
          name: team.groupid.name,
          teams: [team]
        });
      }
    });
    setGroupwithteams(_groupbyteam);
  }, [teamsdata]);

  const openNotify = (msg, type) => {
    const option = {
      place: "tc",
      message: msg,
      type: type,
      autoDismiss: 3
    };
    notify.current.notificationAlert(option);
  };

  const handleProfilSubmit = async e => {
    e.preventDefault();
    console.log(profildata);
    try {
      const saveresult = await saveProfile(profildata);
      if (saveresult) {
        openNotify("Mentés sikeres!", "success");
        // Update favorite team id in context
        currentUser.setUserinfo({
          ...currentUser.userinfo,
          teamid: profildata.teamid,
          name: profildata.name
        });
      }
    } catch (e) {
      console.log("ERROR:", e);
      openNotify("Hiba történt a profil mentése során", "error");
    }
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setProfildata({ ...profildata, [name]: value });
  };

  const handleTextareaChange = e => {
    const { value } = e.target;
    setComment(value);
  };

  const sendIssue = async () => {
    try {
      const issresp = await sendissue(currentUser.user.sub, comment);
      if (issresp.status) {
        openNotify("Észrevételed elküldve", "success");
        setComment("");
      } else {
        throw new Error("Hiba a küldés során");
      }
    } catch (err) {
      openNotify("Hiba történt a küldés során", "error");
    }
  };

  const saveavatar = async avatarname => {
    const saveresp = await setavatar(avatarname);
    if (saveresp.status) {
      currentUser.setUserinfo({
        ...currentUser.userinfo,
        avatar: avatarname
      });
      setProfildata({ ...profildata, avatar: avatarname });
      avatarmodal_toggle();
      openNotify("Mentés sikeres", "success")
    }
  };

  return (
    <>
      <div className="content profile">
        <Row>
          <Col md="4">
            <Card className="card-user">
              <CardHeader>
                <UncontrolledDropdown className="fr zi1">
                  <DropdownToggle
                    caret
                    className="btn-icon"
                    color="link"
                    data-toggle="dropdown"
                    type="button"
                  >
                    <i className="tim-icons icon-settings-gear-63" />
                  </DropdownToggle>
                  <DropdownMenu aria-labelledby="dropdownMenuLink" right>
                    <DropdownItem
                      href="#pablo"
                      onClick={() => {avatarmodal_toggle()}}
                    >
                      Avatar cseréje
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </CardHeader>
              <CardBody>
                <CardText />
                <div className="author">
                  <div className="block block-one" />
                  <div className="block block-two" />
                  <div className="block block-three" />
                  <div className="block block-four" />
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    <img
                      alt="assets/img/default-avatar.png"
                      className="avatar"
                      src={"/avatars/" + profildata.avatar}
                    />
                    <h5 className="title f17">
                      {profildata.name ? profildata.name : profildata.username}
                    </h5>
                  </a>
                  <p className="description"></p>
                </div>
                <div className="card-description">
                  <ul className="list-inline widget-chart m-t-20 text-center">
                    <li className="widgetdesc">
                      <h4>
                        <NumberFormat
                          value={parseInt(currentUser.userinfo.nettoscore, 10)}
                          displayType={"text"}
                          thousandSeparator={true}
                          renderText={value => (
                            <span
                              effect="solid"
                              data-multiline="false"
                            >
                              <b>{value}</b>
                            </span>
                          )}
                        />
                      </h4>
                      <p className="text-muted m-b-0">Nettó pont</p>
                    </li>
                    <li className="widgetdesc">
                      <h4>
                        <b>{currentUser.userinfo.notbetcount}</b>
                      </h4>
                      <p className="text-muted m-b-0">Nem tippelt</p>
                    </li>
                    <li className="widgetdesc">
                      <h4>
                        <NumberFormat
                          value={parseInt(currentUser.userinfo.score, 10)}
                          displayType={"text"}
                          thousandSeparator={true}
                          renderText={value => (
                            <span
                              effect="solid"
                              data-multiline="false"
                            >
                              <b>{value}</b>
                            </span>
                          )}
                        />
                      </h4>
                      <p className="text-muted m-b-0">Bruttó pont</p>
                    </li>
                  </ul>
                </div>
              </CardBody>
              <CardFooter>
                {/* <div className="button-container">
                    <Button className="btn-icon btn-round" color="facebook">
                      <i className="fab fa-facebook" />
                    </Button>
                    <Button className="btn-icon btn-round" color="twitter">
                      <i className="fab fa-twitter" />
                    </Button>
                    <Button className="btn-icon btn-round" color="google">
                      <i className="fab fa-google-plus" />
                    </Button>
                  </div> */}
              </CardFooter>
            </Card>
          </Col>
          <Col md="8">
            <Form onSubmit={handleProfilSubmit}>
              <Card>
                <CardHeader>
                  <h5 className="title">Profilom</h5>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label>Nevem</label>
                        <Input
                          defaultValue={profildata.name}
                          onChange={handleInputChange}
                          name="name"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="6">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">Email címem</label>
                        <Input
                          defaultValue={profildata.email}
                          onChange={handleInputChange}
                          name="email"
                          disabled
                          type="email"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Kedvenc csapatom</label>
                        <Input
                          type="select"
                          disabled={
                            moment().isBefore(AppConfig.gamestart) ? "" : true
                          }
                          className="form-control"
                          value={profildata.teamid}
                          name="teamid"
                          onChange={handleInputChange}
                        >
                          {typeof profildata.teamid === "undefined" ? (
                            <option value="0">Kérlek válassz...</option>
                          ) : (
                            ""
                          )}
                          {teamsdata.map(team => {
                            return (
                              <option key={team._id} value={team._id}>
                                {team.name}
                              </option>
                            );
                          })}
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <Button className="btn-fill" color="primary" type="submit">
                    Mentés
                  </Button>
                </CardFooter>
              </Card>
            </Form>
            <Form onSubmit={handleProfilSubmit}>
              <Card>
                <CardHeader>
                  <h5 className="title">Csoportelsők és a bajnok</h5>
                </CardHeader>
                <CardBody>
                  <Row>
                  <Col md="12">
                    <FormGroup>
                        <label>Bajnok csapat tipp</label>
                        <Input
                          type="select"
                          disabled={
                            moment().isBefore(AppConfig.gamestart) ? "" : true
                          }
                          className="form-control"
                          value={profildata.winteamid}
                          name="winteamid"
                          onChange={handleInputChange}
                        >
                          {typeof profildata.winteamid === "undefined" ? (
                            <option value="0">Kérlek válassz...</option>
                          ) : (
                            ""
                          )}
                          {teamsdata.map(team => {
                            return (
                              <option key={team._id} value={team._id}>
                                {team.name}
                              </option>
                            );
                          })}
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row className="d-flex flex-row flex-wrap justify-content-start">
                    {groupwithteams.map(group => {
                      return (
                        <Col
                          key={group._id}
                          className="px-3"
                          style={{ minWidth: "225px" }}
                        >
                          <FormGroup>
                            <label>{group.name} csoport</label>
                            <select
                              className="form-control"
                              value={profildata[group.name]}
                              name={group.name}
                              disabled={
                                moment().isBefore(AppConfig.gamestart) ? "" : true
                              }
                              onChange={handleInputChange}
                            >
                              {typeof profildata[group.name] === "undefined" ? (
                                <option value="0">Kérlek válassz...</option>
                              ) : (
                                ""
                              )}
                              {group.teams.map(team => {
                                return (
                                  <option key={team._id} value={team._id}>
                                    {team.name}
                                  </option>
                                );
                              })}
                            </select>
                          </FormGroup>
                        </Col>
                      );
                    })}
                  </Row>
                </CardBody>
                {
                  moment().isBefore(AppConfig.gamestart) ? (<CardFooter>
                    <Button className="btn-fill"
                    color="primary" type="submit">
                      Mentés
                    </Button>
                  </CardFooter>) : null
                }
              </Card>
            </Form>
            <Card>
              <CardHeader>
                <h5 className="title">Visszajelzés</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Észrevétel, hiba</label>
                        <Input
                          cols="80"
                          placeholder="írd meg észrevételeidet..."
                          rows="4"
                          name="msg"
                          value={comment}
                          onChange={handleTextareaChange}
                          type="textarea"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
              <CardFooter>
                <Button
                  className="btn-fill"
                  color="primary"
                  type="button"
                  onClick={sendIssue}
                >
                  Küldés
                </Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
      <Notify ref={notify} />
      <AvatarModal
        isShowing={avatarmodal_isShowing}
        hide={avatarmodal_toggle}
        savefunc={avatarname => saveavatar(avatarname)}
      />
    </>
  );
};

export default UserProfile;
